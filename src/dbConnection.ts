import { createConnection } from 'typeorm';
import connectionConfig  from './common/ormconfig';
import { winstonLogger } from './logger';
import { LOGGING_LEVELS } from './constants/index';
import { UsersService } from './resources/users/user.service';

/**
 * Set a connection to DB
 * 
 * @throws Error if connection can't be setted
 * 
 */
export const dbConnection = async (): Promise<void> => {
  try {
    await createConnection(connectionConfig);
    await UsersService.createDefaultUser();
    winstonLogger.log(LOGGING_LEVELS.NAME.info, `Data Base is connected`);
  } catch (e) {
    throw new Error(`Error Data Base connection: ${e}`);
  }
};
