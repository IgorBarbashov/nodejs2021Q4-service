import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ITask, ITaskRepository } from './task.interfaces';

@Entity({ name: 'tasks' })
export class Task implements ITask {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255, default: 'TASK' })
    title: string;

    @Column('integer', { default: 0 })
    order: number;

    @Column('varchar', { length: 255, default: 'Default task' })
    description: string;

    @Column('varchar', { length: 36, default: null, nullable: true })
    // @ManyToOne(() => User, user => user.tasks)
    userId: string | null;

    @Column('varchar', { length: 36, default: null, nullable: true })
    boardId: string | null;

    @Column('varchar', { length: 36, default: null, nullable: true })
    columnId: string | null;

  /**
   * Initialize Task entity fields and generate id for entity in uuid format
   * 
   * @param Object - Initial object accorded interface ITaskRepository
   */
  constructor({ title = 'TASK', order = 0, description = 'Default task', userId = null, boardId = null, columnId = null }: ITaskRepository =
    { title: 'TASK', order: 0, description: 'Default task', userId: null, boardId: null, columnId: null}
  ) {
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
