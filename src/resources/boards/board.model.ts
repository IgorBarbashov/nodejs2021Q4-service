import { v4 as uuidv4 } from 'uuid';

export class Board {
  constructor({
    id = uuidv4(),
    title = 'BOARD',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return board;
  }

  static toRepository(board) {
    const { title, columns } = board;
    return { title, columns };
  }
}
