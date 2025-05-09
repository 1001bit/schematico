import { useCallback, useRef } from "react";
import { TileMapType, TileType } from "../tilemap";
import vector2, { vector2ToStr } from "../vector2";

function useMapPlayer(
  map: TileMapType,
  mouseTile: vector2,
  stateUpdateCallback: () => void
) {
  const activeTiles = useRef<Set<string>>(new Set());

  const clear = () => {
    activeTiles.current.clear();
  };

  const onMouseDown = useCallback(() => {
    const mouseTileStr = vector2ToStr(mouseTile);
    const pointingTile = map[mouseTileStr];
    if (!pointingTile) return;

    if (pointingTile.type === TileType.Input) {
      activeTiles.current.has(mouseTileStr)
        ? activeTiles.current.delete(mouseTileStr)
        : activeTiles.current.add(mouseTileStr);
      stateUpdateCallback();
    }
  }, [mouseTile]);

  return {
    onMouseDown,
    activeTiles: activeTiles.current,
    clear,
  };
}

export default useMapPlayer;
