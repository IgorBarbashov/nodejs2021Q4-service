import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {};

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    };
}
