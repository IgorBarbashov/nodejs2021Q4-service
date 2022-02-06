import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './board.service';

@Controller('boards')
export class BoardsController {

    constructor(private boardService: BoardsService) {};

    @Get()
    async getAll() {
        return await this.boardService.getAllBoards();
    }

    @Post()
    async create(@Body() boardDto: CreateBoardDto) {
        return await this.boardService.createBoard(boardDto);
    };
}
