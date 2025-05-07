import { useMemo, useRef } from "react";
import { TileMapType } from "../tilemap";
import vector2, { vector2ToStr } from "../vector2";

function useMapPlayer(initMap: TileMapType, mouseTile: vector2) {
  const map = useRef(initMap);
  const pointingTile = useMemo(() => {
    return map.current[vector2ToStr(mouseTile)];
  }, [mouseTile]);

  const setMap = (newMap: TileMapType) => {
    map.current = newMap;
  };

  return {
    pointingTile,
    setMap,
  };
}

export default useMapPlayer;
