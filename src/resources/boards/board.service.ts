import { Board } from './board.model';
import { boardsRepository } from './board.memory.repository';
import { ColumnsService } from '../columns/column.service';
import { TasksService } from '../tasks/tasks.service';
import { IBoard } from './board.interfaces';
import { IColumn } from '../columns/column.interfaces';

export class BoardsService {
    static async _columnsIdToObject(columnsIds: string[]): Promise<IColumn[]> {
        const columnsPromises = columnsIds.map(ColumnsService.getById);
        const columns = await Promise.all(columnsPromises);
        return columns;
    }

    static async getAll(): Promise<IBoard[]> {
        const boards = [ ...(await boardsRepository.getAll()).values() ];
        const boardsPromises = boards.map(async board => {
            const columns = board.columns ? await this._columnsIdToObject(board.columns) : [];
            return { ...board, columns };
        });
        const mappedBoards = await Promise.all(boardsPromises);
        return mappedBoards;
    }

    static async getById(id: string): Promise<IBoard> {
        const board = await boardsRepository.getById(id);
        const columns = board.columns ? await this._columnsIdToObject(board.columns) : [];
        return { ...board, columns };
    }

    static async create(body: IBoard): Promise<IBoard> {
        const bodyToRepository = Board.toRepository(body);
        const columnsPromises = bodyToRepository.columns
            ? bodyToRepository.columns.map(ColumnsService.create)
            : [];
        const columns = await Promise.all(columnsPromises);
        
        // const mappedColumns = columns.map(el => el.id);
        // const board = new Board({ ...bodyToRepository, columns: mappedColumns });

        const board = new Board({ ...bodyToRepository, columns });
        const mappedColumns = columns.map(el => el.id);

        const addedBoard = await boardsRepository.add(board.id, { ...board, columns: mappedColumns });
        return { ...addedBoard, columns };
    };

    static async update(id: string, body: IBoard): Promise<IBoard> {
        const bodyToRepository = Board.toRepository(body);
        const columnsPromises = bodyToRepository.columns
            ? bodyToRepository.columns.map(ColumnsService.create)
            : [];
        const columns = await Promise.all(columnsPromises);
        const mappedColumns = columns.map(el => el.id);
        await boardsRepository.update(id, { ...bodyToRepository, id, columns: mappedColumns });
        return { ...bodyToRepository, id, columns };
    }

    static async delete(id: string): Promise<void> {
        await boardsRepository.delete(id);
        const tasks = await TasksService.getAll();
        const tasksPromises: Promise<void>[] = [];
        tasks.forEach(task => {
            if (task.boardId === id) {
                tasksPromises.push(TasksService.delete(task.id));
            }
        });
        await Promise.all(tasksPromises);
    }
};
