import { v4 as uuidv4 } from 'uuid';
import { IUser, IUserRepository, IUserResponse } from './user.interfaces';

export class User implements IUser {
  id;

  name;

  login;

  password;

  /**
   * Initialize User entity fields and generate id for entity in uuid format
   * 
   * @param Object - Initial object accorded interface IUserRepository
   */
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }: IUserRepository) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
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
