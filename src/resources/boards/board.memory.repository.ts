import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { IBoardFromRepository, IBoardBD } from './board.interfaces';

class BoardsRepository {
  boards: IBoardBD;

  constructor() {
    this.boards = new Map();
  }

  getAll(): Promise<IBoardBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.boards);
      }, 100);
    });
  }

  getById(key: string): Promise<IBoardFromRepository> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve((this.boards.get(key) as IBoardFromRepository));
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  add(key: string, value: IBoardFromRepository): Promise<IBoardFromRepository> {
    return new Promise((resolve, reject) => {
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
  
  update(key: string, value: IBoardFromRepository): Promise<IBoardFromRepository> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.boards.set(key, value);
          resolve(value);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.boards.delete(key);
          resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  _isItemExists(key: string): boolean {
    return this.boards.has(key);
  }
}

export const boardsRepository = new BoardsRepository();
