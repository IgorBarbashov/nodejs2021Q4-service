import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { ITask, ITaskBD } from './task.interfaces';

class TasksRepository {
  tasks: ITaskBD;

  constructor() {
    this.tasks = new Map();
  }

  getAll(): Promise<ITaskBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tasks);
      }, 100);
    });
  }

  getById(key: string): Promise<ITask> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve(this.tasks.get(key) as ITask);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  add(key: string, value: ITask): Promise<ITask> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.TASKS.EXISTS}${key}`));
        } else {
          this.tasks.set(key, value);
          resolve(value);
        }
      }, 100);
    });
  }
  
  update(key: string, value: ITask): Promise<ITask> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.tasks.set(key, value);
          resolve(value);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.tasks.delete(key);
          resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  unassignUser(userId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.tasks.forEach((value, key, map) => {
          if (value.userId === userId) {
            map.set(key, { ...value, userId: null });
          }
        });
        resolve();
      }, 100);
    });
  }

  _isItemExists(key: string): boolean {
    return this.tasks.has(key);
  }
}

export const tasksRepository = new TasksRepository();
