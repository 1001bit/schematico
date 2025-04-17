export enum TileType {
  Or = 1,
  And = 2,
  Not = 3,
}

export interface TileInterface {
  type: TileType;
  connections: Record<string, boolean>;
}

export type TileMapType = Record<string, TileInterface>;

export interface ProjectInterface {
  id: string;
  title: string;
  map: TileMapType;
}
