import { Body, Param, Controller, Get, Post, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { BoardsService } from './board.service';
import { IBoard } from './board.interfaces';
import { LoginGuard } from '../login/login.guard';

@Controller('boards')
@UseGuards(LoginGuard)
export class BoardsController {

    constructor(private boardService: BoardsService) {};

    @Get()
    async getAll() {
        return await this.boardService.getAllBoards();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const board = await this.boardService.getById(id);
        if (board === null) {
            throw new NotFoundException(`Board not found, id ${id}`);
        } else {
            return board;
        }
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
        const deletedCount = await this.boardService.deleteBoard(id);

        if (deletedCount === 0) {
            throw new NotFoundException(`Board not found, id ${id}`);
        } else {
            return deletedCount;
        }
    };
}
