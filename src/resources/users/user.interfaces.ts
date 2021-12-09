export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface IUserRepository {
  name: string;
  login: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  login: string;
}

export type IUserBD = Map<string, IUser>;
