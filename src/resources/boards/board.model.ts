const { v4: uuidv4 } = require('uuid');

class Board {
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

module.exports = {
  Board
};
