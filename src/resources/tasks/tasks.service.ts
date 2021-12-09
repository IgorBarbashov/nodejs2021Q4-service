import { Task } from './task.model';
import { tasksRepository } from './task.memory.repository';

export class TasksService {
    static async getAll() {
        const tasks = [ ...(await tasksRepository.getAll()).values() ];
        return tasks;
    }

    static async getById(id) {
        const task = await tasksRepository.getById(id);
        return task;
    }

    static async create(boardId, body) {
        const bodyToRepository = Task.toRepository(body);
        const task = new Task({ ...bodyToRepository, boardId });
        const addedTask = await tasksRepository.add(task.id, task);
        return addedTask;
    };

    static async update(id, body) {
        const bodyToRepository = Task.toRepository(body);
        const task = { ...bodyToRepository, id };
        const updatedTask = await tasksRepository.update(id, task);
        return updatedTask;
    }

    static async delete(id) {
        await tasksRepository.delete(id);
    }

    static async unassignUser(userId) {
        await tasksRepository.unassignUser(userId);
    }
};
