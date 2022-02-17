import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board,  } from './board.model';
import { IBoard } from './board.interfaces';
import { TasksService } from '../tasks/task.service';

@Injectable()
export class BoardsService {

    constructor(
        @InjectModel(Board) private boardRepository: typeof Board,
        private taskService: TasksService
    ) {}

    async getAllBoards() {
        const boards = await this.boardRepository.findAll();
        return boards.map(Board.toResponse);
    }

    async getById(id: string) {
        const board = await this.boardRepository.findByPk(id);
        return board ? Board.toResponse(board) : board;
    }

    async createBoard(dto: IBoard) {
        const boardRepo = Board.toRepository(dto);
        const board = await this.boardRepository.create(boardRepo);
        return Board.toResponse(board);
    }

    async updateBoard(id: string, dto: IBoard) {
        const boardRepo = Board.toRepository(dto);
        const board = await this.boardRepository.update({ ...boardRepo }, { where: { id }, returning: true });
        return Board.toResponse(board[1][0]);
    }
    
    async deleteBoard(id: string) {
        await this.taskService.deleteByBoardId(id);
        return await this.boardRepository.destroy({ where: { id } });
    }
}
