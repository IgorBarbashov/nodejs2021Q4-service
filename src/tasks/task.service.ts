import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { ITask } from './task.interfaces';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

    async getAllTasks() {
        const tasks = await this.taskRepository.findAll();
        return tasks.map(Task.toResponse);
    }

    async getById(id: string) {
        const task = await this.taskRepository.findByPk(id);
        return task ? Task.toResponse(task) : task;
    }

    async createTask(boardId: string, dto: ITask) {
        const taskRepo = Task.toRepository({ ...dto, boardId });
        const task = await this.taskRepository.create(taskRepo);
        return Task.toResponse(task);
    }

    async updateTask(boardId: string, id: string, dto: ITask) {
        const taskRepo = Task.toRepository({ ...dto, boardId });
        const task = await this.taskRepository.update({ ...taskRepo }, { where: { id }, returning: true });
        return Task.toResponse(task[1][0]);
    }
    
    async deleteTask(id: string) {
        return await this.taskRepository.destroy({ where: { id } });
    }

    async deleteByBoardId(id: string) {
        await this.taskRepository.destroy({ where: { boardId: id } });
    }

    async unAssignUser(id: string) {
        await this.taskRepository.update({ userId: null }, { where: { userId: id } });
    }
}
