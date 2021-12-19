import { Context } from 'koa'

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

export interface IUserResponseContext extends Context {
  body: IUserResponse
}

export interface IAllUserResponseContext extends Context {
  body: IUserResponse[]
}

export interface IRequestUserContext extends Context {
  body: IUserRepository[]
}