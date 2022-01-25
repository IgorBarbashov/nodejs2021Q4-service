import { ConnectionOptions } from 'typeorm';
import { User } from '../resources/users/user.model';
import { Board } from '../resources/boards/board.model';
import { Column } from '../resources/columns/column.model';
import { Task } from '../resources/tasks/task.model';

import {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} from "./config";

export default {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    logging: false,
    entities: [User, Board, Column, Task],
    synchronize: false,
    dropSchema: false,
    migrations: ['./src/migrations/**/*.ts'],
    migrationsRun: true,
    cli: {
      migrationsDir: 'src/migrations'
    }
} as ConnectionOptions;
