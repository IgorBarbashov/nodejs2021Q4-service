import { Board } from './board.model';
import { boardsRepository } from './board.memory.repository';
import { ColumnsService } from '../columns/column.service';
import { TasksService } from '../tasks/tasks.service';
import { IBoard } from './board.interfaces';
import { IColumn } from '../columns/column.interfaces';

export class BoardsService {
    /**
     * Map collection of Column Ids to collection of Column entities
     * 
     * @param columnsIds - Collection of Column Ids that should be mapped
     * @returns Promise that will resolve with Collection of Column entities or rejected if error was occurred
     */
    static async _columnsIdToObject(columnsIds: string[]): Promise<IColumn[]> {
        const columnsPromises = columnsIds.map(ColumnsService.getById);
        const columns = await Promise.all(columnsPromises);
        return columns;
    }

    /**
     * Send to Repository layer request to get collection of all Board entities
     * 
     * @returns Promise that will resolve with Collection of all Board entities or rejected if error was occurred
     */
    static async getAll(): Promise<IBoard[]> {
        const boards = [ ...(await boardsRepository.getAll()).values() ];
        const boardsPromises = boards.map(async board => {
            const columns = board.columns ? await this._columnsIdToObject(board.columns) : [];
            return { ...board, columns };
        });
        const mappedBoards = await Promise.all(boardsPromises);
        return mappedBoards;
    }

    /**
     * Send to Repository layer request to get Board entity by id
     * 
     * @param id - Id of requested entity
     * @returns Promise that will resolve with requested Board entity or rejected if error was occurred
     */
    static async getById(id: string): Promise<IBoard> {
        const board = await boardsRepository.getById(id);
        const columns = board.columns ? await this._columnsIdToObject(board.columns) : [];
        return { ...board, columns };
    }

    /**
     * Send to Repository layer request to create new Board entity and related Columns
     * 
     * @param body - Object from Router layer that described Board entity and related Columns accorded IBoard interface
     * @returns Promise that will resolve with created Board entity or rejected if error was occurred
     */
    static async create(body: IBoard): Promise<IBoard> {
        const bodyToRepository = Board.toRepository(body);
        const columnsPromises = bodyToRepository.columns
            ? bodyToRepository.columns.map(ColumnsService.create)
            : [];
        const columns = await Promise.all(columnsPromises);
        const board = new Board({ ...bodyToRepository, columns });
        const mappedColumns = columns.map(el => el.id);

        const addedBoard = await boardsRepository.add(board.id, { ...board, columns: mappedColumns });
        return { ...addedBoard, columns };
    };

    /**
     * Send to Repository layer request to update Board entity
     * 
     * @param id - Id of the entity that should be updated
     * @param body - Object from Router layer that described Board entity accorded IBoard interface
     * @returns Promise that will resolve with updated Board entity or rejected if error was occurred
     */
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

    /**
     * Send to Repository layer request to delete Board entity by id and related Task entities
     * 
     * @param id - Id of the entity that should be deleted
     * @returns Promise that will resolve if entity was deleted or rejected if error was occurred
     */
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
