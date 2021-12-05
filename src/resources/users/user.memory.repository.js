const { REPOSITORY_ERROR_MESSAGES } = require('../../constants');

class UsersRepository {
  constructor() {
    this.users = new Map();
  }

  getAll() {
    return new Promise((resolve) => { // aka async request to db
      setTimeout(() => {
        resolve(this.users);
      }, 300);
    });
  }

  getById(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve(this.users.get(key));
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`));
        }
      }, 300);
    });
  }

  add(key, value) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.EXISTS}${key}`));
        } else {
          this.users.set(key, value);
          resolve(value);
        }
      }, 300);
    });
  }
  
  update(key, value) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.users.set(key, value);
          resolve(value);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`));
        }
        resolve();
      }, 300);
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.users.delete(key);
          resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`));
        }
        resolve();
      }, 300);
    });
  }

  _isItemExists(key) {
    return this.users.has(key);
  }
}

const usersRepository = new UsersRepository();

module.exports = {
  usersRepository
};
