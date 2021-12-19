import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { IUser, IUserBD } from './user.interfaces';

class UsersRepository {
  /**
   * In-memory DB of User entities
   */
  users: IUserBD;

  /**
   * Initialize data structure for save User entities in In-memory DB
   */
  constructor() {
    this.users = new Map();
  }

  /**
   * Read from DB collection of all User entities
   * 
   * @returns Promise that will resolve with Collection of all User entities
   */
  getAll(): Promise<IUserBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 100);
    });
  }

  /**
   * Read from DB User entity with requested id
   * 
   * @param key - Id of requested User entity
   * @returns  Promise that will resolve with requested User entity or rejected if error was occurred or entity wasn't found
   */
  getById(key: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve(this.users.get(key) as IUser);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  /**
   * Add to DB new User entity
   * 
   * @param key - Id of new User entity
   * @param value - New User entity
   * @returns Promise that will resolve with added User entity or rejected if error was occurred or entity with requested id already exists
   */
  add(key: string, value: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.EXISTS}${key}`));
        } else {
          this.users.set(key, value);
          resolve(value);
        }
      }, 100);
    });
  }
  
  /**
   * Update existed User entity in DB
   * 
   * @param key - Id of User entity to update
   * @param value - User entity to update
   * @returns Promise that will resolve with updated User entity or rejected if error was occurred or entity wasn't found
   */
  update(key: string, value: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.users.set(key, value);
          resolve(value);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }
  
  /**
   * Delete from DB User entity with requested id
   * 
   * @param key - Id of User entity that should be deleted
   * @returns  Promise that will resolve or rejected if error was occurred or entity wasn't found
   */
  delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.users.delete(key);
          resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  /**
   * Check if User entity with requested id is exists in DB
   * 
   * @param key - Id for check
   * @returns True - if entity with requested id is exists in DB, false - if not
   */
  _isItemExists(key: string): boolean {
    return this.users.has(key);
  }
}

export const usersRepository = new UsersRepository();
