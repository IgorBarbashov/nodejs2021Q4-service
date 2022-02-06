import { Model, DataType, Table, Column } from "sequelize-typescript";
import { ITask } from './task.interfaces';

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
}