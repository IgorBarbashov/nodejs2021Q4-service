import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './task.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {};

    @Get()
    async getAll() {
        return await this.taskService.getAllTasks();
    }

    @Post()
    async create(@Body() taskDto: CreateTaskDto) {
        return await this.taskService.createTask(taskDto);
    };
}
