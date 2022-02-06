import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.model';

@Injectable()
export class BoardsService {

    constructor(@InjectModel(Board) private boardRepository: typeof Board) {}

    async getAllBoards() {
        const boards = await this.boardRepository.findAll();
        return boards;
    }

    async createBoard(dto: CreateBoardDto) {
        const board = await this.boardRepository.create(dto);
        return board;
    }
}
