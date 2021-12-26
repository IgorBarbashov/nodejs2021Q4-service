import { IColumn, IColumnResponse } from '../columns/column.interfaces';

export interface IBoard {
    id: string;
    title: string;
    columns: IColumn[];
}

export interface IBoardWithoutId {
    title: string;
    columns: IColumn[];
}

export interface IBoardToRepository {
    title: string;
    columns: string[];
}

export interface IBoardFromRepository {
    id: string;
    title: string;
    columns: string[];
}

export interface IBoardResponse {
    id: string[];
    title: string;
    columns: IColumnResponse[];
}

export type IBoardBD = Map<string, IBoardFromRepository>;
