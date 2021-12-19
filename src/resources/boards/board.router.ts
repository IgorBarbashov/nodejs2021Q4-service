import Router from 'koa-router';
import { StatusCodes } from 'http-status-codes';
import { Board } from './board.model';
import { Column } from '../columns/column.model';
import { BoardsService } from './board.service';

export const boardsRouter = new Router({ prefix: '/boards' })

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
    try {
        const { id } = ctx.params;
        const board = await BoardsService.getById(id);
        const boardToResponse = Board.toResponse(board);
        ctx.body = {
            ...boardToResponse,
            columns: boardToResponse.columns ? boardToResponse.columns.map(Column.toResponse) : []
        }
    } catch {
        ctx.status = StatusCodes.NOT_FOUND;
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

boardsRouter.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const board = await BoardsService.update(id, body);
    const boardToResponse = Board.toResponse(board);
    ctx.body = {
        ...boardToResponse,
        columns: boardToResponse.columns ? boardToResponse.columns.map(Column.toResponse) : []
    }
});

boardsRouter.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        await BoardsService.delete(id);
        ctx.status = StatusCodes.NO_CONTENT;
    } catch {
        ctx.status = StatusCodes.NOT_FOUND;
    }
});
