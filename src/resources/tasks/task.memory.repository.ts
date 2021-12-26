import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { ITask, ITaskBD } from './task.interfaces';

class TasksRepository {
  /**
   * In-memory DB of Task entities
   */
  tasks: ITaskBD;

  /**
   * Initialize data structure for save Task entities in In-memory DB
   */
  constructor() {
    this.tasks = new Map();
  }

  /**
   * Read from DB collection of all Task entities
   * 
   * @returns Promise that will resolve with Collection of all Task entities
   */
  getAll(): Promise<ITaskBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tasks);
      }, 100);
    });
  }

  /**
   * Read from DB Task entity with requested id
   * 
   * @param key - Id of requested Task entity
   * @returns  Promise that will resolve with requested Task entity or rejected if error was occurred or entity wasn't found
   */
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

  /**
   * Add to DB new Task entity
   * 
   * @param key - Id of new Task entity
   * @param value - New Task entity
   * @returns Promise that will resolve with added Task entity or rejected if error was occurred or entity with requested id already exists
   */
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
  
  /**
   * Update existed Task entity in DB
   * 
   * @param key - Id of Task entity to update
   * @param value - Task entity to update
   * @returns Promise that will resolve with updated Task entity or rejected if error was occurred or entity wasn't found
   */
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

  /**
   * Delete from DB Task entity with requested id
   * 
   * @param key - Id of Task entity that should be deleted
   * @returns Promise that will resolve or rejected if error was occurred or entity wasn't found
   */
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

  /**
   * Set in Task entities, that related to defined User, field userId to null
   * 
   * @param userId - Id of defined User
   * @returns Promise that will resolve or rejected if error was occurred
   */
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

  /**
   * Check if Task entity with requested id is exists in DB
   * 
   * @param key - Id for check
   * @returns True - if entity with requested id is exists in DB, false - if not
   */
  _isItemExists(key: string): boolean {
    return this.tasks.has(key);
  }
}

export const tasksRepository = new TasksRepository();
