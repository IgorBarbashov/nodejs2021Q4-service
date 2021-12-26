import { v4 as uuidv4 } from 'uuid';
import { ITask, ITaskRepository } from './task.interfaces';

export class Task implements ITask {
    id;

    title;

    order;

    description;

    userId;

    boardId;

    columnId;

  /**
   * Initialize Task entity fields and generate id for entity in uuid format
   * 
   * @param Object - Initial object accorded interface ITaskRepository
   */
  constructor({
    title = 'TASK',
    order = 0,
    description = 'Default task',
    userId = null,
    boardId = null,
    columnId = null
  }: ITaskRepository) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Prepare Task entity for response to client
   * 
   * @param task - Task entity object
   * @returns Task entity object without changes
   */
  static toResponse(task: ITask): ITask {
    return task;
  }

  /**
   * Prepare Task entity object for send to Repository layer to save in DB
   * 
   * @param task - Task entity object
   * @returns Task entity object without id field
   */
  static toRepository(task: ITask): ITaskRepository {
    const { title, order, description, userId, boardId, columnId } = task;
    return { title, order, description, userId, boardId, columnId };
  }
}
