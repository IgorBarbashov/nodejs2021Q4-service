import Router from 'koa-router';
import { StatusCodes } from 'http-status-codes';
import { Board } from './board.model';
import { Column } from '../columns/column.model';
import { BoardsService } from './board.service';

/**
 * Create Route to manage Board entities
 */
export const boardsRouter = new Router({ prefix: '/boards' })

/**
 * Register Route to request collection of all Board entity
 */
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

/**
 * Register Route to request Board entity by id
 */
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

/**
 * Register Route to create new Board entity
 */
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

/**
 * Register Route to update existed Board entity
 */
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

/**
 * Register Route to delete existed Board entity
 */
boardsRouter.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        await BoardsService.delete(id);
        ctx.status = StatusCodes.NO_CONTENT;
    } catch {
        ctx.status = StatusCodes.NOT_FOUND;
    }
});
