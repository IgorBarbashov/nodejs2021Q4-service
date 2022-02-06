import { Model, DataType, Table, Column } from "sequelize-typescript";
import { IBoard, IBoardToRepository } from './board.interfaces';

@Table({tableName: 'boards'})
export class Board extends Model<Board, IBoard> {

    @Column({type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    title: string;

    @Column({type: DataType.ARRAY(DataType.JSON), unique: false, allowNull: true})
    columns: Record<string, unknown>;

    static toResponse(board: IBoard): IBoard {
        const { id, title, columns } = board;
        return { id, title, columns };
    }

    static toRepository(board: IBoard): IBoardToRepository {
        const { title, columns } = board;
        return { title, columns };
    }
}
