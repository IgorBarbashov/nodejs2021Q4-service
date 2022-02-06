import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './board.service';

@Controller('boards')
export class BoardsController {

    constructor(private boardService: BoardsService) {};

    @Get()
    getAll() {
        return this.boardService.getAllBoards();
    }

    @Post()
    create(@Body() boardDto: CreateBoardDto) {
        return this.boardService.createBoard(boardDto);
    };
}
