import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { Board } from "./board.model";

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    SequelizeModule.forFeature([Board])
  ]
})
export class BoardsModule {}
