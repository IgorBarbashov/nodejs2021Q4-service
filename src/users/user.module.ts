import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User } from "./user.model";
import { Task } from '../tasks/task.model';
import { TasksService } from '../tasks/task.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TasksService],
  imports: [
    SequelizeModule.forFeature([User, Task])
  ]
})
export class UsersModule {}
