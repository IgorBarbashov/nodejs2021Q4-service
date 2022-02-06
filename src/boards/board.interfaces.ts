export interface IBoard {
    id: string;
    title: string;
    columns: Record<string, unknown>;
}

export type IBoardWithoutId = Omit<IBoard, 'id'>

export type IBoardToRepository = IBoardWithoutId;

export type IBoardFromRepository = IBoard;

export type IBoardResponse = IBoard;
