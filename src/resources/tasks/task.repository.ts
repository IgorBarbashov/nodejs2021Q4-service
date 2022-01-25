import { getRepository } from 'typeorm';
import { REPOSITORY_ERROR_MESSAGES } from '../../constants';
import { EntityNotFoundError, EntityExistsError } from '../../errors/customErrors';
import { ITask } from './task.interfaces';
import { Task } from './task.model';

/**
 * Read from DB collection of all Task entities
 * 
 * @returns Promise that will resolve with Collection of all Task entities
 */
export const getAllTasks = async (): Promise<ITask[]> => {
  const taskRepository = getRepository(Task);
  return await taskRepository.find();
};

/**
 * Read from DB Task entity with requested id
 * 
 * @param key - Id of requested Task entity
 * @returns  Promise that will resolve with requested Task entity or rejected if error was occurred or entity wasn't found
 */
export const getTaskById = async (key: string): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(key);
  if (!task) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`);
  }
  return task;
};

/**
 * Add to DB new Task entity
 * 
 * @param key - Id of new Task entity
 * @param value - New Task entity
 * @returns Promise that will resolve with added Task entity or rejected if error was occurred or entity with requested id already exists
 */
export const addTask = async (key: string, value: ITask): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  // const createdTask = taskRepository.create(value);
  // const savedTask = await taskRepository.save(createdTask);
  const savedTask = await taskRepository.save(value);
  if (!savedTask) {
    throw new EntityExistsError(`${REPOSITORY_ERROR_MESSAGES.TASKS.EXISTS}${key}`);
  }
  return savedTask;
};

/**
 * Update existed Task entity in DB
 * 
 * @param key - Id of Task entity to update
 * @param value - Task entity to update
 * @returns Promise that will resolve with updated Task entity or rejected if error was occurred or entity wasn't found
 */
export const updateTask = async (key: string, value: ITask): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  const taskForUpdate = await taskRepository.findOne(key);
  if (!taskForUpdate) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`);
  }
  await taskRepository.update(key, value);
  return await taskRepository.findOne(key) as ITask;
};

/**
 * Reset user in exists Task
 * 
 * @param key - Id of Task entity to update
 * @returns Promise that will resolve with updated Task entity or rejected if error was occurred or entity wasn't found
 */
export const resetUser = async (key: string): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  const taskForUpdate = await taskRepository.findOne(key);
  if (!taskForUpdate) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`);
  }
  await taskRepository.update(key, { ...taskRepository, userId: null });
  return await taskRepository.findOne(key) as ITask;
};

/**
 * Delete from DB Task entity with requested id
 * 
 * @param key - Id of Task entity that should be deleted
 * @returns Promise that will resolve or rejected if error was occurred or entity wasn't found
 */
export const deleteTask = async (key: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  const { affected } = await taskRepository.delete(key);
  if (!affected) {
    throw new EntityNotFoundError(`${REPOSITORY_ERROR_MESSAGES.TASKS.NOT_FOUND}${key}`);
  }
};

/**
 * Set in Task entities, that related to defined User, field userId to null
 * 
 * @param userId - Id of defined User
 * @returns Promise that will resolve or rejected if error was occurred
 */
export const unassignUserFromTask = async (userId: string): Promise<void> => {
  const taskRepository = getRepository(Task);

  await taskRepository
    .createQueryBuilder('tasks')
    .select('title')
    .where('task.userId = :userId', { userId })
    .getMany();
};
