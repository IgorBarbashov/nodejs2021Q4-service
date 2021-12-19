import { v4 as uuidv4 } from 'uuid';
import { IColumn, IColumnRepository, IColumnResponse } from './column.interfaces';

export class Column implements IColumn {
  id;

  title;

  order;
  
  /**
   * Initialize Column entity fields and generate id for entity in uuid format
   * 
   * @param param0 - Initial object accorded interface IColumnRepository
   */
  constructor({
    title = 'COLUMN',
    order = 0
  }: IColumnRepository) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }

  /**
   * Prepare Column entity for response to client
   * 
   * @param column - Column entity object
   * @returns Column entity object without id field
   */
  static toResponse(column: IColumn): IColumnResponse {
    const { title, order } = column;
    return { title, order };
  }

  /**
   * Prepare Column entity object for send to Repository layer to save in DB
   * 
   * @param column - Column entity object
   * @returns Column entity object without id field
   */
  static toRepository(column: IColumn): IColumnRepository {
    const { title, order } = column;
    return { title, order };
  }
}
