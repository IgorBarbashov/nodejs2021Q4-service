import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { IColumn, IColumnBD } from './column.interfaces';

class ColumnsRepository {
  /**
   * In-memory DB fo Column entities
   */
  columns: IColumnBD;

  /**
   * Initialize data structure for save Column entities in In-memory DB
   */
  constructor() {
    this.columns = new Map();
  }

  /**
   * Read from DB collection of all Column entities
   * 
   * @returns Collection of all Column entities
   */
  getAll(): Promise<IColumnBD> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.columns);
      }, 100);
    });
  }

  /**
   * Read from DB Column entity with requested id
   * 
   * @param key - Id of requested Column entity
   * @returns Requested column entity
   */
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

  /**
   * Add to DB new Column
   * 
   * @param key - Id of new Column entity
   * @param value - New Column entity
   * @returns Added Column entity
   */
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
  
  /**
   * Delete from DB Column with requested if
   * 
   * @param key - Id of Column entity that should be deleted
   */
  delete(key: string): Promise<IColumn> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._isItemExists(key)) {
          this.columns.delete(key);
          Promise.resolve();
        } else {
          reject(new Error(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.NOT_FOUND}${key}`));
        }
      }, 100);
    });
  }

  /**
   * Check if Column entity with requested id exists in DB
   * 
   * @param key - Id for check
   * @returns True - if entity with requested Id is exists in DB, false - if not
   */
  _isItemExists(key: string): boolean {
    return this.columns.has(key);
  }
}

export const columnsRepository = new ColumnsRepository();
