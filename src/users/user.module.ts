import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User } from "./user.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User])
  ]
})
export class UsersModule {}
