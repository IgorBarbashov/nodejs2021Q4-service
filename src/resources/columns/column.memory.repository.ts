import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { IColumn, IColumnBD } from './column.interfaces';

class ColumnsRepository {
  columns: IColumnBD;

  constructor() {
    this.columns = new Map();
  }

  getAll(): Promise<IColumnBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.columns);
      }, 100);
    });
  }

  getById(key: string): Promise<IColumn> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          resolve(this.columns.get(key) as IColumn);
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  add(key: string, value: IColumn): Promise<IColumn> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.EXISTS}${key}`));
        } else {
          this.columns.set(key, value);
          resolve(value);
        }
      }, 100);
    });
  }
  
  delete(key: string): Promise<IColumn> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.columns.delete(key);
          Promise.resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.NOT_FOUND}${key}`));
        }
        Promise.resolve();
      }, 100);
    });
  }

  _isItemExists(key: string): boolean {
    return this.columns.has(key);
  }
}

export const columnsRepository = new ColumnsRepository();
