import { v4 as uuidv4 } from 'uuid';
import { IColumn, IColumnRepository, IColumnResponse } from './column.interfaces';

export class Column implements IColumn {
  id;

  title;

  order;
  
  constructor({
    title = 'COLUMN',
    order = 0
  }: IColumnRepository) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }

  static toResponse(column: IColumn): IColumnResponse {
    const { title, order } = column;
    return { title, order };
  }

  static toRepository(column: IColumn): IColumnRepository {
    const { title, order } = column;
    return { title, order };
  }
}
