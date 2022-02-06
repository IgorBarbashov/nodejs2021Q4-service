import { Model, DataType, Table, Column } from "sequelize-typescript";
import { IUser, IUserResponse } from './user.interfaces';

@Table({tableName: 'users'})
export class User extends Model<User, IUser> {

    @Column({type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    static toResponse(user: IUser): IUserResponse {
        const { id, name, login } = user;
        return { id, name, login };
      }
}
