export interface vector2 {
  x: number;
  y: number;
}

export function vector2ToStr(v: vector2) {
  return `${v.x},${v.y}`;
}

export function strToVector2(str: string) {
  return {
    x: Number(str.split(",")[0]),
    y: Number(str.split(",")[1]),
  } as vector2;
}

export function vector2Compare(v1: vector2, v2: vector2) {
  return v1.x === v2.x && v1.y === v2.y;
}
