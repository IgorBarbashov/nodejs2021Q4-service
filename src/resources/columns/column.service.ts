import { Column } from './column.model';
import { columnsRepository } from './column.memory.repository';

export class ColumnsService {
    static async getAll() {
        const columns = [ ...(await columnsRepository.getAll()).values() ];
        return columns;
    }

    static async getById(id) {
        const column = await columnsRepository.getById(id);
        return column;
    }

    static async create(body) {
        const bodyToRepository = Column.toRepository(body);
        const column = new Column(bodyToRepository);
        const addedColumn = await columnsRepository.add(column.id, column);
        return addedColumn;
    };

    static async delete(id) {
        await columnsRepository.delete(id);
    }
};
