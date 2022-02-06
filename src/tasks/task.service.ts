import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { ITask } from './task.interfaces';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

    async getAllTasks() {
        const tasks = await this.taskRepository.findAll();
        return tasks;
    }

    async getById(id: string) {
        const task = await this.taskRepository.findByPk(id);
        return task;
    }

    async createTask(dto: ITask) {
        const taskRepo = Task.toRepository(dto);
        const task = await this.taskRepository.create(taskRepo);
        return task;
    }

    async updateTask(id: string, dto: ITask) {
        const taskRepo = Task.toRepository(dto);
        const task = await this.taskRepository.update({ ...taskRepo }, { where: { id }, returning: true });
        return task;
    }
    
    async deleteTask(id: string) {
        return await this.taskRepository.destroy({ where: { id } });
    }
}
