import { Body, Param, Controller, Get, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { TasksService } from './task.service';
import { ITask } from './task.interfaces';

@Controller('')
export class TasksController {

    constructor(private taskService: TasksService) {};

    @Get('boards/:boardId/tasks')
    async getAll() {
        return await this.taskService.getAllTasks();
    }

    @Get('boards/:boardId/tasks/:id')
    async getById(@Param('id') id: string) {
        const task = await this.taskService.getById(id);
        if (task === null) {
            throw new NotFoundException(`Task not found, id ${id}`);
        } else {
            return task;
        }
    }

    @Post('boards/:boardId/tasks')
    async create(@Param('boardId') boardId: string, @Body() taskDto: ITask) {
        return await this.taskService.createTask(boardId, taskDto);
    };

    @Put('boards/:boardId/tasks/:id')
    async update(
        @Param('boardId') boardId: string,
        @Param('id') id: string,
        @Body() taskDto: ITask
    ) {
        return await this.taskService.updateTask(boardId, id, taskDto);
    };
    
    @Delete('boards/:boardId/tasks/:id')
    async delete(@Param('id') id: string) {
        const deletedCount = await this.taskService.deleteTask(id);
        if (deletedCount === 0) {
            throw new NotFoundException(`Task not found, id ${id}`);
        } else {
            return deletedCount;
        }
    };
}
