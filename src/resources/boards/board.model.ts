import { v4 as uuidv4 } from 'uuid';
import { IBoard, IBoardWithoutId } from './board.interfaces';

export class Board implements IBoard {
  id;

  title;

  columns;

  /**
   * Initialize Board entity fields and generate id for entity in uuid format
   * 
   * @param Object - Initial object accorded interface IBoardWithoutId
   */
  constructor({
    title = 'BOARD',
    columns = []
  }: IBoardWithoutId) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }

  /**
   * Prepare Board entity for response to client
   * 
   * @param board - Board entity object
   * @returns Board entity object without changes
   */
  static toResponse(board: IBoard): IBoard {
    return board;
  }

  /**
   * Prepare Board entity object for send to Repository layer to save in DB
   * 
   * @param board - Board entity object
   * @returns Board entity object without id field
   */
  static toRepository(board: IBoard): IBoardWithoutId {
    const { title, columns } = board;
    return { title, columns };
  }
}
