import { Body, Param, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {};

    @Get()
    async getAll() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.userService.getById(id);
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
        return await this.userService.deleteUser(id);
    };
}
