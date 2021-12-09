import { User } from './user.model';
import { usersRepository } from './user.memory.repository';
import { TasksService } from '../tasks/tasks.service';

export class UsersService {
    static async getAll() {
        const users = [ ...(await usersRepository.getAll()).values() ];
        return users;
    }

    static async getById(id) {
        const user = await usersRepository.getById(id);
        return user;
    }

    static async create(body) {
        const bodyToRepository = User.toRepository(body);
        const user = new User(bodyToRepository);
        const addedUser = await usersRepository.add(user.id, user);
        return addedUser;
    };

    static async update(id, body) {
        const bodyToRepository = User.toRepository(body);
        const user = { ...bodyToRepository, id };
        const updatedUser = await usersRepository.update(id, user);
        return updatedUser;
    }

    static async delete(id) {
        await usersRepository.delete(id);
        await TasksService.unassignUser(id);
    }
};
