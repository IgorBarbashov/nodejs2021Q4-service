import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './task.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {};

    @Get()
    getAll() {
        return this.taskService.getAllTasks();
    }

    @Post()
    create(@Body() taskDto: CreateTaskDto) {
        return this.taskService.createTask(taskDto);
    };
}
