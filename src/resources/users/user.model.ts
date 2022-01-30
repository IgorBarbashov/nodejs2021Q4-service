import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { ITask } from '../tasks/task.interfaces';
import { IUser, IUserRepository, IUserResponse } from './user.interfaces';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: 'USER' })
  name: string;

  @Column('varchar', { length: 255, default: 'user' })
  login: string;

  @Column('varchar', { length: 255, default: 'P@55w0rd' })
  password: string;

  // @Column('simple-array', { default: null, nullable: true, select: false })
  // @OneToMany(() => Task, task => task.userId)
  tasks?: ITask[] | null;

  /**
   * Initialize User entity fields and generate id for entity in uuid format
   * 
   * @param Object - Initial object accorded interface IUserRepository
   */
  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd', tasks = null }: Omit<IUser, 'id'> =
    { name: 'USER', login: 'user', password: 'P@55w0rd', tasks: null })
  {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = bcryptjs.hashSync(password);
    this.tasks = tasks;
  }

  /**
   * Prepare User entity for response to client
   * 
   * @param user - User entity object
   * @returns User entity object without changes
   */
  static toResponse(user: IUser): IUserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }

  /**
   * Prepare User entity object for send to Repository layer to save in DB
   * 
   * @param user - User entity object
   * @returns User entity object without id field
   */
  static toRepository(user: IUser): IUserRepository {
    const { name, login, password } = user;
    return { name, login, password };
  }
}
