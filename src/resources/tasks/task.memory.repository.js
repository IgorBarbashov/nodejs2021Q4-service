const { REPOSITORY_ERROR_MESSAGES } = require('../../constants');

class TasksRepository {
  constructor() {
    this.tasks = new Map();
  }

  getAll() {
    return new Promise((resolve) => { // aka async request to db
      setTimeout(() => {
        resolve(this.tasks);
      }, 300);
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
      }, 300);
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
      }, 300);
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
      }, 300);
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
      }, 300);
    });
  }

  _isItemExists(key) {
    return this.tasks.has(key);
  }
}

const tasksRepository = new TasksRepository();

module.exports = {
  tasksRepository
};
