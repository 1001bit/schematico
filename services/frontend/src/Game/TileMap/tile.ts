export enum TileTypeColors {
  Or = "#ff0000",
  And = "#00ffff",
  Not = "#ffff00",
}

export class Tile {
  type: TileTypeColors;
  state: boolean;
  connections: { x: number; y: number }[];
  constructor(type: TileTypeColors, connections: { x: number; y: number }[]) {
    this.type = type;
    this.state = false;
    this.connections = connections;
  }
}
