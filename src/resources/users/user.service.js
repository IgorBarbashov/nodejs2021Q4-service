const { User } = require('./user.model');
const { userRepository } = require('./user.memory.repository');

class UsersService {
    static async getAll() {
        // TODO - validation
        const users = await userRepository.getAll();
        return users;
    }

    static async getById(id) {
        // TODO - validation
        const user = await userRepository.getById(id);
        return user;
    }

    static async create(body) {
        // TODO - validation
        const bodyToRepository = User.toRepository(body);
        const user = new User(bodyToRepository);
        const addedUser = await userRepository.add(user.id, user);
        return addedUser;
    };

    static async update(id, user) {
        // TODO - validation
        const updatedUser = await userRepository.update(id, user);
        return updatedUser;
    }

    static async delete(id) {
        // TODO - validation
        await userRepository.delete(id);
    }
};

module.exports = {
    UsersService
};
