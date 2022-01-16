import { createConnection } from 'typeorm';
import connectionConfig  from './common/ormconfig';
import { winstonLogger } from './logger';
import { LOGGING_LEVELS } from './constants/index';

/**
 * Set a connection to DB
 * 
 * @throws Error if connection can't be setted
 * 
 */
export const dbConnection = async (): Promise<void> => {
  try {
    await createConnection(connectionConfig);
    winstonLogger.log(LOGGING_LEVELS.NAME.info, `Data Base is connected`);
  } catch (e) {
    throw new Error(`Error Data Base connection: ${e}`);
  }
};
