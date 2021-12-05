const { Board } = require('./board.model');
const { boardsRepository } = require('./board.memory.repository');
const { ColumnsService } = require('../columns/column.service');

class BoardsService {
    static async _columnsIdToObject(columnsIds) {
        const columnsPromises = columnsIds.map(ColumnsService.getById);
        const columns = await Promise.all(columnsPromises);
        return columns;
    }

    static async getAll() {
        const boards = [ ...(await boardsRepository.getAll()).values() ];
        const boardsPromises = boards.map(async board => {
            const columns = board.columns ? await BoardsService._columnsIdToObject(board.columns) : [];
            return { ...board, columns };
        });
        const mappedBoards = await Promise.all(boardsPromises);
        return mappedBoards;
    }

    static async getById(id) {
        const board = await boardsRepository.getById(id);
        const columns = board.columns ? await BoardsService._columnsIdToObject(board.columns) : [];
        return { ...board, columns };
    }

    static async create(body) {
        const bodyToRepository = Board.toRepository(body);
        const columnsPromises = bodyToRepository.columns
            ? bodyToRepository.columns.map(ColumnsService.create)
            : [];
        const columns = await Promise.all(columnsPromises);
        const mappedColumns = columns.map(el => el.id);
        const board = new Board({ ...bodyToRepository, columns: mappedColumns });
        const addedBoard = await boardsRepository.add(board.id, board);
        return { ...addedBoard, columns };
    };

    // static async update(id, user) {
                                // const bodyToRepository = Board.toRepository(body);
                                // const user = new Board(bodyToRepository);
                                // const updatedUser = await boardsRepository.update(id, user);
                                // return updatedUser;
    //     const updatedBoard = await boardsRepository.update(id, user);
    //     return updatedBoard;
    // }

    // static async delete(id) {
    //     await boardsRepository.delete(id);
    // }
};

module.exports = {
    BoardsService
};
