import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { IUser, IUserBD } from './user.interfaces';

class UsersRepository {
  users: IUserBD;

  constructor() {
    this.users = new Map();
  }

  getAll(): Promise<IUserBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 100);
    });
  }

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

  _isItemExists(key: string): boolean {
    return this.users.has(key);
  }
}

export const usersRepository = new UsersRepository();
