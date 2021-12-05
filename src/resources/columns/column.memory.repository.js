const { REPOSITORY_ERROR_MESSAGES } = require('../../constants');

class ColumnsRepository {
  constructor() {
    this.columns = new Map();
  }

  getAll() {
    return new Promise((resolve) => { // aka async request to db
      setTimeout(() => {
        resolve(this.columns);
      }, 300);
    });
  }

  getById(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve(this.columns.get(key));
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.NOT_FOUND}${key}`));
        }
      }, 300);
    });
  }

  add(key, value) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.EXISTS}${key}`));
        } else {
          this.columns.set(key, value);
          resolve(value);
        }
      }, 300);
    });
  }
  
  delete(key) {
    return new Promise((resolve, reject) => { // aka async request to db
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.columns.delete(key);
          resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.NOT_FOUND}${key}`));
        }
        resolve();
      }, 300);
    });
  }

  _isItemExists(key) {
    return this.columns.has(key);
  }
}

const columnsRepository = new ColumnsRepository();

module.exports = {
  columnsRepository
};
