import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { TasksService } from '../tasks/task.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private taskService: TasksService
    ) {}

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users.map(User.toResponse);
    }

    async getById(id: string) {
        const user = await this.userRepository.findByPk(id);
        return user ? User.toResponse(user) : user;
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
        await this.taskService.unAssignUser(id);
        return await this.userRepository.destroy({ where: { id } });
    }

    async getFullDataByLogin(login: string) {
        return await this.userRepository.findOne({ where: { login } });
    }

    async onModuleInit(): Promise<void> {
        try {
            const isAdminExists = await this.getFullDataByLogin('admin');
            if (isAdminExists === null) {
                await this.userRepository.create(
                    User.toRepository({
                        id: '',
                        login: 'admin',
                        name: 'admin',
                        password: 'admin'
                }));
            }
        } catch (e) {
            console.log(e);
        }
    }
}
