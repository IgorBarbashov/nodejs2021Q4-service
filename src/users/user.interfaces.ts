export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type IUserResponse = Omit<IUser, 'password'>;

export type IUserRepository = Omit<IUser, 'id'>;
