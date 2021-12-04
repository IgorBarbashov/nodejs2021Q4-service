const { User } = require('./user.model');
const { usersRepository } = require('./user.memory.repository');

class UsersService {
    static async getAll() {
        // TODO - validation
        const users = await usersRepository.getAll();
        return users;
    }

    static async getById(id) {
        // TODO - validation
        const user = await usersRepository.getById(id);
        return user;
    }

    static async create(body) {
        // TODO - validation
        const bodyToRepository = User.toRepository(body);
        const user = new User(bodyToRepository);
        const addedUser = await usersRepository.add(user.id, user);
        return addedUser;
    };

    static async update(id, user) {
        // TODO - validation
        const updatedUser = await usersRepository.update(id, user);
        return updatedUser;
    }

    static async delete(id) {
        // TODO - validation
        await usersRepository.delete(id);
    }
};

module.exports = {
    UsersService
};
