import { Column } from './column.model';
import { columnsRepository } from './column.memory.repository';
import { IColumn } from './column.interfaces';

export class ColumnsService {
    /**
     * Send to Repository layer request to get collection of all Column entities
     * 
     * @returns Promise that will resolve with Collection of all Column entities or rejected if error was occurred
     */    
    static async getAll(): Promise<IColumn[]> {
        const columns = [ ...(await columnsRepository.getAll()).values() ];
        return columns;
    }

    /**
     * Send to Repository layer request to get Column entity by id
     * 
     * @param id - Id of requested entity
     * @returns Promise that will resolve with requested Column entity or rejected if error was occurred
     */
    static async getById(id: string): Promise<IColumn> {
        const column = await columnsRepository.getById(id);
        return column;
    }

    /**
     * Send to Repository layer request to create new Column entity
     * 
     * @param body - New object from Router layer that described Column entity accorded IColumn interface
     * @returns Promise that will resolve with created Column entity or rejected if error was occurred
     */    
    static async create(body: IColumn): Promise<IColumn> {
        const bodyToRepository = Column.toRepository(body);
        const column = new Column(bodyToRepository);
        const addedColumn = await columnsRepository.add(column.id, column);
        return addedColumn;
    };

    /**
     * Send to Repository layer request to delete Column entity by id
     * 
     * @param id - Id of the entity that should be deleted
     * @returns Promise that will resolve if entity was deleted or rejected if error was occurred
     */
    static async delete(id: string): Promise<void> {
        await columnsRepository.delete(id);
    }
};
