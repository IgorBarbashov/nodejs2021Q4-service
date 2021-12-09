import { User } from './user.model';
import { usersRepository } from './user.memory.repository';
import { TasksService } from '../tasks/tasks.service';
import { IUser, IUserResponse } from './user.interfaces';

export class UsersService {
    static async getAll(): Promise<IUserResponse[]> {
        const users = [ ...(await usersRepository.getAll()).values() ];
        return users.map(User.toResponse);
    }

    static async getById(id: string): Promise<IUserResponse> {
        const user = await usersRepository.getById(id);
        return User.toResponse(user);
    }

    static async create(body: IUser): Promise<IUserResponse> {
        const bodyToRepository = User.toRepository(body);
        const user = new User(bodyToRepository);
        const addedUser = await usersRepository.add(user.id, user);
        return User.toResponse(addedUser);
    };

    static async update(id: string, body: IUser): Promise<IUserResponse> {
        const bodyToRepository = User.toRepository(body);
        const user = { ...bodyToRepository, id };
        const updatedUser = await usersRepository.update(id, user);
        return User.toResponse(updatedUser);
    }

    static async delete(id: string): Promise<void> {
        await usersRepository.delete(id);
        await TasksService.unassignUser(id);
    }
};
