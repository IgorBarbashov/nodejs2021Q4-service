import { ITask } from '../../tasks/task.interfaces';

export class CreateUserDto {

    readonly id: string;

    readonly name: string;

    readonly login: string;

    readonly password: string;

    readonly tasks?: ITask[] | null;
}
