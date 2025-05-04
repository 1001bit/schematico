export enum TileType {
  Or = "or",
  And = "and",
  Not = "not",
  Input = "input",
  Bulb = "bulb",
}

export enum ToolType {
  Drag = "drag",
  Erase = "erase",

  Wire = "wire",
  Or = "or",
  And = "and",
  Not = "not",
  Input = "input",
  Bulb = "bulb",
}

export interface TileInterface {
  type: TileType;
  connections: Record<string, boolean>;
}

export type TileMapType = Record<string, TileInterface>;
