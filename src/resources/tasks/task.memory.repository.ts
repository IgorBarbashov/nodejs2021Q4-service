import { REPOSITORY_ERROR_MESSAGES } from '../../constants';

class TasksRepository {
  constructor() {
    this.tasks = new Map();
  }

  getAll() {
    return new Promise((resolve) => { // aka async request to db
      setTimeout(() => {
        resolve(this.tasks);
      }, 100);
    });
  }

  getById(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve(this.tasks.get(key));
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  add(key, value) {
    return new Promise((resolve, reject) => { // aka async request to db
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
  
  update(key, value) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.tasks.set(key, value);
          resolve(value);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`));
        }
        resolve();
      }, 100);
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.tasks.delete(key);
          resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`));
        }
        resolve();
      }, 100);
    });
  }

  unassignUser(userId) {
    return new Promise((resolve) => { // aka async request to db
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

  _isItemExists(key) {
    return this.tasks.has(key);
  }
}

export const tasksRepository = new TasksRepository();
