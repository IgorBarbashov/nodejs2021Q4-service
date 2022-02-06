import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

    async getAllTasks() {
        const tasks = await this.taskRepository.findAll();
        return tasks;
    }

    async createTask(dto: CreateTaskDto) {
        const task = await this.taskRepository.create(dto);
        return task;
    }
}
