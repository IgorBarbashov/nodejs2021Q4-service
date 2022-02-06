import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { TasksService } from './task.service';
import { ITask } from './task.interfaces';

@Controller('boards/:boardId/tasks')
export class TasksController {

    constructor(private taskService: TasksService) {};

    @Get()
    async getAll() {
        return await this.taskService.getAllTasks();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.taskService.getById(id);
    }

    @Post()
    async create(@Body() taskDto: ITask) {
        return await this.taskService.createTask(taskDto);
    };

    @Put(':id')
    async update(@Param('id') id: string, @Body() taskDto: ITask) {
        return await this.taskService.updateTask(id, taskDto);
    };
    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.taskService.deleteTask(id);
    };
}
