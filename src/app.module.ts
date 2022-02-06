import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/user.model";
import { UsersModule } from './users/user.module';
import { Task } from "./tasks/task.model";
import { TasksModule } from './tasks/task.module';
import { Board } from "./boards/board.model";
import { BoardsModule } from './boards/board.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
         }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Task, Board],
            autoLoadModels: true
        }),
        UsersModule,
        TasksModule,
        BoardsModule
    ]
})
export class AppModule {}
