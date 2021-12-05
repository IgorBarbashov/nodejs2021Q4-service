const Router = require('@koa/router');
const { StatusCodes } = require('http-status-codes');
const { Board } = require('./board.model');
const { Column } = require('../columns/column.model');
const { BoardsService } = require('./board.service');

const boardsRouter = new Router({ prefix: '/boards' })

boardsRouter.get('/', async (ctx) => {
    const boards = await BoardsService.getAll();
    const boardsToResponse = boards.map(board => {
        const boardToResponse = Board.toResponse(board);
        return {
            ...boardToResponse,
            columns: boardToResponse.columns ? boardToResponse.columns.map(Column.toResponse) : []
        }
    })
    ctx.body = boardsToResponse;
});

boardsRouter.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    const board = await BoardsService.getById(id);
    const boardToResponse = Board.toResponse(board);
    ctx.body = {
        ...boardToResponse,
        columns: boardToResponse.columns ? boardToResponse.columns.map(Column.toResponse) : []
    }
});

boardsRouter.post('/', async (ctx) => {
    const { body } = ctx.request;
    const board = await BoardsService.create(body);
    const boardToResponse = Board.toResponse(board);
    ctx.status = StatusCodes.CREATED;
    ctx.body = {
        ...boardToResponse,
        columns: boardToResponse.columns ? boardToResponse.columns.map(Column.toResponse) : []
    }
});

// boardsRouter.put('/:id', async (ctx) => {
//     const { id } = ctx.params;
//     const { body } = ctx.request;
//     const user = await BoardsService.update(id, body);
//     ctx.body = Board.toResponse(user);
// });

// boardsRouter.delete('/:id', async (ctx) => {
//     const { id } = ctx.params;
//     await BoardsService.delete(id);
//     ctx.status = StatusCodes.NO_CONTENT;
// });

module.exports = {
    boardsRouter
};
