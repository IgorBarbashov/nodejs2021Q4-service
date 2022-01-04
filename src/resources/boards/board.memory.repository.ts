import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { EntityNotFoundError, EntityExistsError } from '../../errors/customErrors';
import { IBoardFromRepository, IBoardBD } from './board.interfaces';

class BoardsRepository {
  /**
   * In-memory DB of Board entities
   */
  boards: IBoardBD;

  /**
   * Initialize data structure for save Board entities in In-memory DB
   */
  constructor() {
    this.boards = new Map();
  }

  /**
   * Read from DB collection of all Board entities
   * 
   * @returns Promise that will resolve with Collection of all Board entities
   */
  getAll(): Promise<IBoardBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.boards);
      }, 100);
    });
  }

  /**
   * Read from DB Board entity with requested id
   * 
   * @param key - Id of requested Board entity
   * @returns  Promise that will resolve with requested Board entity or rejected if error was occurred or entity wasn't found
   */
  getById(key: string): Promise<IBoardFromRepository> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve((this.boards.get(key) as IBoardFromRepository));
        } else {
          reject(new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  /**
   * Add to DB new Board entity
   * 
   * @param key - Id of new Board entity
   * @param value - New Board entity
   * @returns Promise that will resolve with added Board entity or rejected if error was occurred or entity with requested id already exists
   */
  add(key: string, value: IBoardFromRepository): Promise<IBoardFromRepository> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          reject(new EntityExistsError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.EXISTS}${key}`));
        } else {
          this.boards.set(key, value);
          resolve(value);
        }
      }, 100);
    });
  }
  
  /**
   * Update existed Board entity in DB
   * 
   * @param key - Id of Board entity to update
   * @param value - Board entity to update
   * @returns Promise that will resolve with updated Board entity or rejected if error was occurred or entity wasn't found
   */
  update(key: string, value: IBoardFromRepository): Promise<IBoardFromRepository> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.boards.set(key, value);
          resolve(value);
        } else {
          reject(new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  /**
   * Delete from DB Board entity with requested id
   * 
   * @param key - Id of Board entity that should be deleted
   * @returns  Promise that will resolve or rejected if error was occurred or entity wasn't found
   */
  delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.boards.delete(key);
          resolve();
        } else {
          reject(new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  /**
   * Check if Board entity with requested id is exists in DB
   * 
   * @param key - Id for check
   * @returns True - if entity with requested id is exists in DB, false - if not
   */
  _isItemExists(key: string): boolean {
    return this.boards.has(key);
  }
}

export const boardsRepository = new BoardsRepository();
