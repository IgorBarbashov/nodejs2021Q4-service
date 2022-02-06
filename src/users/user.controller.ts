import { Body, Param, Controller, Get, Post, Delete, Put, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { LoginGuard } from '../login/login.guard';

@Controller('users')
@UseGuards(LoginGuard)
export class UsersController {

    constructor(private userService: UsersService) {};

    @Get()
    async getAll() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const user = await this.userService.getById(id);
        if (user === null) {
            throw new NotFoundException(`User not found, id ${id}`);
        } else {
            return user;
        }
    }

    @Post()
    async create(@Body() userDto: CreateUserDto) {
        return await this.userService.createUser(userDto);
    };

    @Put(':id')
    async update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
        return await this.userService.updateUser(id, userDto);
    };
    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedCount = await await this.userService.deleteUser(id);

        if (deletedCount === 0) {
            throw new NotFoundException(`User not found, id ${id}`);
        } else {
            return deletedCount;
        }
    };
}
