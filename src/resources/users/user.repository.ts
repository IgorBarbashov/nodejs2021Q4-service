import { getRepository } from 'typeorm';
import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { EntityNotFoundError, EntityExistsError } from '../../errors/customErrors';
import { IUser } from './user.interfaces';
import { User } from './user.model';

/**
 * Read from DB collection of all User entities
 * 
 * @returns Promise that will resolve with Collection of all User entities
 */
export const getAllUsers = async(): Promise<IUser[]> => {
  const userRepository = getRepository(User);
  return await userRepository.find();
};

/**
 * Read from DB User entity with requested id
 * 
 * @param key - Id of requested User entity
 * @returns  Promise that will resolve with requested User entity or rejected if error was occurred or entity wasn't found
 */
export const getUserById = async (key: string): Promise<IUser> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(key);
  if (!user) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`);
  }
  return user;
};

/**
 * Add to DB new User entity
 * 
 * @param key - Id of new User entity
 * @param value - New User entity
 * @returns Promise that will resolve with added User entity or rejected if error was occurred or entity with requested id already exists
 */
export const addUser = async (key: string, value: IUser): Promise<IUser> => {
  const userRepository = getRepository(User);
  const createdUser = userRepository.create(value);
  const savedUser = await userRepository.save(createdUser);
  if (!savedUser) {
    throw new EntityExistsError(`${REPOSITORY_ERROR_MESSAGES.USERS.EXISTS}${key}`);
  }
  return savedUser;
};

/**
 * Update existed User entity in DB
 * 
 * @param key - Id of User entity to update
 * @param value - User entity to update
 * @returns Promise that will resolve with updated User entity or rejected if error was occurred or entity wasn't found
 */
export const updateUser = async (key: string, value: IUser): Promise<IUser> => {
  const userRepository = getRepository(User);
  const userForUpdate = await userRepository.findOne(key);
  if (!userForUpdate) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`);
  }
  await userRepository.update(key, value);
  return await userRepository.findOne(key) as IUser;
};
  
/**
 * Delete from DB User entity with requested id
 * 
 * @param key - Id of User entity that should be deleted
 * @returns  Promise that will resolve or rejected if error was occurred or entity wasn't found
 */
export const deleteUser = async (key: string): Promise<void> => {
  const userRepository = getRepository(User);
  const { affected } = await userRepository.delete(key);
  if (!affected) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.USERS.NOT_FOUND}${key}`);
  }
};
