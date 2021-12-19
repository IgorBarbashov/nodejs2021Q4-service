import { v4 as uuidv4 } from 'uuid';
import { IUser, IUserRepository, IUserResponse } from './user.interfaces';

export class User implements IUser {
  id;

  name;

  login;

  password;

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

  static toResponse(user: IUser): IUserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static toRepository(user: IUser): IUserRepository {
    const { name, login, password } = user;
    return { name, login, password };
  }
}
