import { getRepository } from 'typeorm';
import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { EntityNotFoundError, EntityExistsError } from '../../errors/customErrors';
import { IColumn } from './column.interfaces';
import { Column } from './column.model';

/**
 * Read from DB collection of all Column entities
 * 
 * @returns Promise that will resolve with Collection of all Column entities
 */
export const getAllColumns = async (): Promise<IColumn[]> => {
  const columnRepository = getRepository(Column);
  return await columnRepository.find();
}

/**
 * Read from DB Column entity with requested id
 * 
 * @param key - Id of requested Column entity
 * @returns Promise that will resolve with requested Column entity or rejected if error was occurred or entity wasn't found
 */
export const getColumnById = async (key: string): Promise<IColumn> => {
  const columnRepository = getRepository(Column);
  const column = await columnRepository.findOne(key);
  if (!column) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.NOT_FOUND}${key}`);
  }
  return column;
};

/**
 * Add to DB new Column entity
 * 
 * @param key - Id of new Column entity
 * @param value - New Column entity
 * @returns Promise that will resolve with added Column entity or rejected if error was occurred or entity with requested id already exists
 */
export const addColumn = async (key: string, value: IColumn): Promise<IColumn> => {
    const columnRepository = getRepository(Column);
    const createdColumn = columnRepository.create(value);
    const savedColumn = await columnRepository.save(createdColumn);
    if (!savedColumn) {
      throw new EntityExistsError(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.EXISTS}${key}`);
    }
    return savedColumn;
};

/**
 * Delete from DB Column entity with requested id
 * 
 * @param key - Id of Column entity that should be deleted
 * @returns Promise that will resolve or rejected if error was occurred
 */
export const deleteColumn = async (key: string): Promise<void> => {
  const columnRepository = getRepository(Column);
  const { affected } = await columnRepository.delete(key);
  if (!affected) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.COLUMNS.NOT_FOUND}${key}`);
  }
};
