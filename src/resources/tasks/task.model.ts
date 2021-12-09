import { v4 as uuidv4 } from 'uuid';

export class Task {
  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 0,
    description = 'Default task',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    return task;
  }

  static toRepository(task) {
    const { title, order, description, userId, boardId, columnId } = task;
    return { title, order, description, userId, boardId, columnId };
  }
}
