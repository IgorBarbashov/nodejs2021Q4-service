import { v4 as uuidv4 } from 'uuid';
import { IBoard, IBoardWithoutId } from './board.interfaces';

export class Board implements IBoard {
  id;

  title;

  columns;
  
  constructor({
    title = 'BOARD',
    columns = []
  }: IBoardWithoutId) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard): IBoard {
    return board;
  }

  static toRepository(board: IBoard): IBoardWithoutId {
    const { title, columns } = board;
    return { title, columns };
  }
}
