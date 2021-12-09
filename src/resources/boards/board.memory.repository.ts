import { REPOSITORY_ERROR_MESSAGES } from '../../constants';

class BoardsRepository {
  constructor() {
    this.boards = new Map();
  }

  getAll() {
    return new Promise((resolve) => { // aka async request to db
      setTimeout(() => {
        resolve(this.boards);
      }, 100);
    });
  }

  getById(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve(this.boards.get(key));
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  add(key, value) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.BOARDS.EXISTS}${key}`));
        } else {
          this.boards.set(key, value);
          resolve(value);
        }
      }, 100);
    });
  }
  
  update(key, value) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.boards.set(key, value);
          resolve(value);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
        resolve();
      }, 100);
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.boards.delete(key);
          resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
        resolve();
      }, 100);
    });
  }

  _isItemExists(key) {
    return this.boards.has(key);
  }
}

export const boardsRepository = new BoardsRepository();
