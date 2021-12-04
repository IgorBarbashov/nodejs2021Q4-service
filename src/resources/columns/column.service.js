const { Column } = require('./column.model');
const { columnsRepository } = require('./column.memory.repository');

class ColumnsService {
    static async create(body) {
        // TODO - validation
        const bodyToRepository = Column.toRepository(body);
        const column = new Column(bodyToRepository);
        const addedColumn = await columnsRepository.add(column.id, column);
        return addedColumn;
    };

    static async delete(id) {
        // TODO - validation
        await columnsRepository.delete(id);
    }
};

module.exports = {
    ColumnsService
};
