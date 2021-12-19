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

  static toResponse(task: ITask): ITask {
    return task;
  }

  static toRepository(task: ITask): ITaskRepository {
    const { title, order, description, userId, boardId, columnId } = task;
    return { title, order, description, userId, boardId, columnId };
  }
}
