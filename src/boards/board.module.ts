import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { Board } from "./board.model";
import { Task } from '../tasks/task.model';
import { TasksService } from '../tasks/task.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, TasksService],
  imports: [
    SequelizeModule.forFeature([Board, Task]),
  ]
})
export class BoardsModule {}
