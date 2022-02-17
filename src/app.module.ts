import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/user.model";
import { UsersModule } from './users/user.module';
import { Task } from "./tasks/task.model";
import { TasksModule } from './tasks/task.module';
import { Board } from "./boards/board.model";
import { BoardsModule } from './boards/board.module';
import { LoginModule } from './login/login.module';
import {
    POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER,
    POSTGRES_PASSWORD, POSTGRES_DB
} from './common/config';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
         }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: POSTGRES_HOST,
            port: Number(POSTGRES_PORT),
            username: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_DB,
            models: [User, Task, Board],
            autoLoadModels: true
        }),
        TasksModule,
        LoginModule,
        UsersModule,
        BoardsModule
    ]
})
export class AppModule {}
