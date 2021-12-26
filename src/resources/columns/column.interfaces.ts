export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IColumnRepository {
  title: string;
  order: number;
}

export interface IColumnResponse {
  title: string;
  order: number;
}

export type IColumnBD = Map<string, IColumn>;
