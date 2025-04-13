export enum TileType {
  Or = 1,
  And = 2,
  Not = 3,
}

export interface TileInterface {
  type: TileType;
  connections: { x: number; y: number }[];
}

export type TileMapType = Record<string, TileInterface>;

export interface ProjectInterface {
  title: string;
  map: TileMapType;
}
