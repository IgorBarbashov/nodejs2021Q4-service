import { ConnectionOptions } from 'typeorm';
import {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} from "./config";

export const connectionConfig: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    logging: false,
    synchronize: false
};
