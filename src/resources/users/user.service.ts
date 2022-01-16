import { User } from './user.model';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from './user.repository';
import { IUser, IUserResponse } from './user.interfaces';

export class UsersService {
    /**
     * Send to Repository layer request to get collection of all User entities
     * 
     * @returns Promise that will resolve with Collection of all User entities or rejected if error was occurred
     */
    static async getAll(): Promise<IUserResponse[]> {
        const users = await getAllUsers();
        return users.map(User.toResponse);
    }

    /**
     * Send to Repository layer request to get User entity by id
     * 
     * @param id - Id of requested entity
     * @returns Promise that will resolve with requested User entity or rejected if error was occurred
     */
    static async getById(id: string): Promise<IUserResponse> {
        const user = await getUserById(id);
        return User.toResponse(user);
    }

    /**
     * Send to Repository layer request to create new User entity
     * 
     * @param body - Object from Router layer that described User entity accorded IUser interface
     * @returns Promise that will resolve with created User entity or rejected if error was occurred
     */
    static async create(body: IUser): Promise<IUserResponse> {
        const bodyToRepository = User.toRepository(body);
        const user = new User(bodyToRepository);
        const addedUser = await addUser(user.id, user);
        return User.toResponse(addedUser);
    };

    /**
     * Send to Repository layer request to update User entity
     * 
     * @param id - Id of the entity that should be updated
     * @param body - Object from Router layer that described User entity accorded IUser interface
     * @returns Promise that will resolve with updated User entity or rejected if error was occurred
     */
    static async update(id: string, body: IUser): Promise<IUserResponse> {
        const bodyToRepository = User.toRepository(body);
        const user = { ...bodyToRepository, id };
        const updatedUser = await updateUser(id, user);
        return User.toResponse(updatedUser);
    }

    /**
     * Send to Repository layer request to delete User entity by id and update related Task entities by set for it userId field to null
     * 
     * @param id - Id of the entity that should be deleted
     * @returns Promise that will resolve if entity was deleted or rejected if error was occurred
     */
    static async delete(id: string): Promise<void> {
        await deleteUser(id);
    }
};
