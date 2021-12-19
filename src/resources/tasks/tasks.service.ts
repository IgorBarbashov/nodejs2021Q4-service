import { Task } from './task.model';
import { tasksRepository } from './task.memory.repository';
import { ITask } from './task.interfaces';

export class TasksService {
    static async getAll(): Promise<ITask[]> {
        const tasks = [ ...(await tasksRepository.getAll()).values() ];
        return tasks;
    }

    static async getById(id: string): Promise<ITask> {
        const task = await tasksRepository.getById(id);
        return task;
    }

    static async create(boardId: string, body: ITask): Promise<ITask> {
        const bodyToRepository = Task.toRepository(body);
        const task = new Task({ ...bodyToRepository, boardId });
        const addedTask = await tasksRepository.add(task.id, task);
        return addedTask;
    };

    static async update(id: string, body: ITask): Promise<ITask> {
        const bodyToRepository = Task.toRepository(body);
        const task = { ...bodyToRepository, id };
        const updatedTask = await tasksRepository.update(id, task);
        return updatedTask;
    }

    static async delete(id: string): Promise<void> {
        await tasksRepository.delete(id);
    }

    static async unassignUser(userId: string): Promise<void> {
        await tasksRepository.unassignUser(userId);
    }
};
