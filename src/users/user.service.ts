import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users.map(User.toResponse);
    }

    async getById(id: string) {
        const user = await this.userRepository.findByPk(id);
        return User.toResponse(user);
    }

    async createUser(dto: CreateUserDto) {
        const userRepo = User.toRepository(dto);
        const user = await this.userRepository.create(userRepo);
        return User.toResponse(user);
    }

    async updateUser(id: string, dto: CreateUserDto) {
        const userRepo = User.toRepository(dto);
        const user = await this.userRepository.update({ ...userRepo }, { where: { id }, returning: true });
        return [user[0], user[1].map(User.toResponse)];
    }

    async deleteUser(id: string) {
        return await this.userRepository.destroy({ where: { id } });
    }
}
