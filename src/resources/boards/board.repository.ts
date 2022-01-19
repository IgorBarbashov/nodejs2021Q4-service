import { getRepository } from 'typeorm';
import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { EntityNotFoundError, EntityExistsError } from '../../errors/customErrors';
import { IBoard } from './board.interfaces';
import { Board } from './board.model';

/**
 * Read from DB collection of all Board entities
 * 
 * @returns Promise that will resolve with Collection of all Board entities
 */
export const getAllBoards = async (): Promise<IBoard[]> => {
  const boardRepository = getRepository(Board);
  return await boardRepository.find();
};

/**
 * Read from DB Board entity with requested id
 * 
 * @param key - Id of requested Board entity
 * @returns  Promise that will resolve with requested Board entity or rejected if error was occurred or entity wasn't found
 */
export const getBoardById = async (key: string): Promise<IBoard> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(key);
  if (!board) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`);
  }
  return board;
};

/**
 * Add to DB new Board entity
 * 
 * @param key - Id of new Board entity
 * @param value - New Board entity
 * @returns Promise that will resolve with added Board entity or rejected if error was occurred or entity with requested id already exists
 */
export const addBoard = async (key: string, value: IBoard): Promise<IBoard> => {
  const boardRepository = getRepository(Board);
  const createdBoard = boardRepository.create(value);
  const savedBoard = await boardRepository.save(createdBoard);
  if (!savedBoard) {
    throw new EntityExistsError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.EXISTS}${key}`);
  }
  return savedBoard;
};

/**
 * Update existed Board entity in DB
 * 
 * @param key - Id of Board entity to update
 * @param value - Board entity to update
 * @returns Promise that will resolve with updated Board entity or rejected if error was occurred or entity wasn't found
 */
export const updateBoard = async (key: string, value: IBoard): Promise<IBoard> => {
  const boardRepository = getRepository(Board);
  const boardForUpdate = await boardRepository.findOne(key);
  if (!boardForUpdate) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`);
  }
  await boardRepository.update(key, value);
  return await boardRepository.findOne(key) as IBoard;
};

/**
 * Delete from DB Board entity with requested id
 * 
 * @param key - Id of Board entity that should be deleted
 * @returns  Promise that will resolve or rejected if error was occurred or entity wasn't found
 */
export const deleteBoard = async (key: string): Promise<void> => {
  const boardRepository = getRepository(Board);
  const { affected } = await boardRepository.delete(key);
  if (!affected) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.BOARDS.NOT_FOUND}${key}`);
  }
};
