import { v4 as uuidv4 } from 'uuid';

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export class User implements IUser {
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static toRepository(user) {
    const { name, login, password } = user;
    return { name, login, password };
  }
}
