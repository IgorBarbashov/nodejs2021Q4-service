import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { Task } from "./task.model";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Task])
  ]
})
export class TasksModule {}
