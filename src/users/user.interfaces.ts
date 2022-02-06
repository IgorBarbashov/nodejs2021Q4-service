import { ITask } from "../tasks/task.interfaces";

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  tasks?: ITask[] | null;
}

export type IUserResponse = Omit<IUser, 'password'>;
