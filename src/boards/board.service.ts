import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board,  } from './board.model';
import { IBoard } from './board.interfaces';

@Injectable()
export class BoardsService {

    constructor(@InjectModel(Board) private boardRepository: typeof Board) {}

    async getAllBoards() {
        const boards = await this.boardRepository.findAll();
        return boards;
    }

    async getById(id: string) {
        const board = await this.boardRepository.findByPk(id);
        return board;
    }

    async createBoard(dto: IBoard) {
        const boardRepo = Board.toRepository(dto);
        const board = await this.boardRepository.create(boardRepo);
        return board;
    }

    async updateBoard(id: string, dto: IBoard) {
        const boardRepo = Board.toRepository(dto);
        const board = await this.boardRepository.update({ ...boardRepo }, { where: { id }, returning: true });
        return board;
    }
    
    async deleteBoard(id: string) {
        return await this.boardRepository.destroy({ where: { id } });
    }
}
