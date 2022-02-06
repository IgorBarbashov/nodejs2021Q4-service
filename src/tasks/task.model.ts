import { Model, DataType, Table, Column } from "sequelize-typescript";
import { ITask, ITaskRepository } from './task.interfaces';

@Table({tableName: 'tasks'})
export class Task extends Model<Task, ITask> {

    @Column({type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    title: string;

    @Column({type: DataType.INTEGER, unique: false, defaultValue: 0, allowNull: false})
    order: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    description: string;

    @Column({type: DataType.UUID, unique: false, allowNull: true})
    userId: string | null;

    @Column({type: DataType.UUID, unique: false, allowNull: true})
    boardId: string | null;

    @Column({type: DataType.UUID, unique: false, allowNull: true})
    columnId: string | null;

    static toResponse(task: ITask): ITask {
        const { id, title, order, description, userId, boardId, columnId } = task;
        return { id, title, order, description, userId, boardId, columnId };
    }

    static toRepository(board: ITask): ITaskRepository {
        const { title, order, description, userId, boardId, columnId } = board;
        return { title, order, description, userId, boardId, columnId };
    }
}
