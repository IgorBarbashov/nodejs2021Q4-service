import { v4 as uuidv4 } from 'uuid';

export class Column {
  constructor({
    id = uuidv4(),
    title = 'COLUMN',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { title, order } = column;
    return { title, order };
  }

  static toRepository(column) {
    const { title, order } = column;
    return { title, order };
  }
}
