import { Task } from './task.model';
import { getAllTasks, getTaskById, addTask, updateTask, deleteTask, unassignUserFromTask } from './task.repository';
import { ITask } from './task.interfaces';

export class TasksService {
    /**
     * Send to Repository layer request to get collection of all Task entities
     * 
     * @returns Promise that will resolve with Collection of all Task entities or rejected if error was occurred
     */
    static async getAll(): Promise<ITask[]> {
        const tasks = await getAllTasks();
        return tasks;
    }

    /**
     * Send to Repository layer request to get Task entity by id
     * 
     * @param id - Id of requested entity
     * @returns Promise that will resolve with requested Task entity or rejected if error was occurred
     */
    static async getById(id: string): Promise<ITask> {
        const task = await getTaskById(id);
        return task;
    }

    /**
     * Send to Repository layer request to create new Task entity
     * 
     * @param body - Object from Router layer that described Task entity accorded ITask interface
     * @returns Promise that will resolve with created Task entity or rejected if error was occurred
     */
    static async create(boardId: string, body: ITask): Promise<ITask> {
        const bodyToRepository = Task.toRepository(body);
        const task = new Task({ ...bodyToRepository, boardId });
        const addedTask = await addTask(task.id, task);
        return addedTask;
    };

    /**
     * Send to Repository layer request to update Task entity
     * 
     * @param id - Id of the entity that should be updated
     * @param body - Object from Router layer that described Task entity accorded ITask interface
     * @returns Promise that will resolve with updated Task entity or rejected if error was occurred
     */
    static async update(id: string, body: ITask): Promise<ITask> {
        const bodyToRepository = Task.toRepository(body);
        const task = { ...bodyToRepository, id };
        const updatedTask = await updateTask(id, task);
        return updatedTask;
    }

    /**
     * Send to Repository layer request to delete Task entity by id
     * 
     * @param id - Id of the entity that should be deleted
     * @returns Promise that will resolve if entity was deleted or rejected if error was occurred
     */
    static async delete(id: string): Promise<void> {
        await deleteTask(id);
    }

    /**
     * Send to Repository layer request to set in Task entities, that related to defined User, field userId to null
     * 
     * @param userId - Id of defined User
     * @returns Promise that will resolve or rejected if error was occurred
     */
    static async unassignUser(userId: string): Promise<void> {
        await unassignUserFromTask(userId);
    }
};
