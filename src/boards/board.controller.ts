import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { BoardsService } from './board.service';
import { IBoard } from './board.interfaces';

@Controller('boards')
export class BoardsController {

    constructor(private boardService: BoardsService) {};

    @Get()
    async getAll() {
        return await this.boardService.getAllBoards();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.boardService.getById(id);
    }

    @Post()
    async create(@Body() boardDto: IBoard) {
        return await this.boardService.createBoard(boardDto);
    };

    @Put(':id')
    async update(@Param('id') id: string, @Body() boardDto: IBoard) {
        return await this.boardService.updateBoard(id, boardDto);
    };
    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.boardService.deleteBoard(id);
    };
}
