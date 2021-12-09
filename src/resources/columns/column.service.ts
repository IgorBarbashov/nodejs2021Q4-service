import { Column } from './column.model';
import { columnsRepository } from './column.memory.repository';
import { IColumn } from './column.interfaces';

export class ColumnsService {
    static async getAll(): Promise<IColumn[]> {
        const columns = [ ...(await columnsRepository.getAll()).values() ];
        return columns;
    }

    static async getById(id: string): Promise<IColumn> {
        const column = await columnsRepository.getById(id);
        return column;
    }

    static async create(body: IColumn): Promise<IColumn> {
        const bodyToRepository = Column.toRepository(body);
        const column = new Column(bodyToRepository);
        const addedColumn = await columnsRepository.add(column.id, column);
        return addedColumn;
    };

    static async delete(id: string): Promise<void> {
        await columnsRepository.delete(id);
    }
};
