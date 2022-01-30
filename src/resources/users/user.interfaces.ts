import { ITask } from "../tasks/task.interfaces";

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  tasks?: ITask[] | null;
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
  tasks?: ITask[] | null;
}

export type IUserBD = Map<string, IUser>;
