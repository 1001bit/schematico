import { useCallback, useRef } from "react";
import { TileMapType, TileType } from "../tilemap";
import vector2, { vector2ToStr } from "../vector2";
import useTicker from "./ticker";

function getNewState(
  type: TileType,
  conns: number,
  activeConns: number
): boolean {
  switch (type) {
    case TileType.Input:
      return false;
    case TileType.And:
      return activeConns >= 1 && conns === activeConns;
    case TileType.Bulb:
      return activeConns >= 1;
    case TileType.Not:
      return activeConns === 0;
    case TileType.Or:
      return activeConns >= 1;
  }
}

function useMapPlayer(
  map: TileMapType,
  mouseTile: vector2,
  stateUpdateCallback: () => void
) {
  const tilesState = useRef<Map<string, boolean>>(new Map());
  const tilesInputs = useRef<Map<string, [number, number]>>(new Map());
  const toActivateQueue = useRef<Map<string, number>>(new Map());

  function tick() {
    const newActivateQueue = new Map();
    for (const [posStr, newActiveConns] of toActivateQueue.current) {
      const tile = map[posStr];
      if (!tile || tile.type === TileType.Input) continue;

      let [conns, activeConns] = tilesInputs.current.get(posStr) || [0, 0];
      activeConns += newActiveConns;
      tilesInputs.current.set(posStr, [conns, activeConns]);

      const newState = getNewState(tile.type, conns, activeConns);
      if (newState === tilesState.current.get(posStr)) continue;

      for (const [wireEndStr, _] of Object.entries(tile.connections)) {
        const newActivates = newActivateQueue.get(wireEndStr) || 0;
        newActivateQueue.set(wireEndStr, newActivates + (newState ? 1 : -1));
      }

      tilesState.current.set(posStr, newState);
    }
    toActivateQueue.current = newActivateQueue;

    stateUpdateCallback();
  }
  const tps = 10;
  const ticker = useTicker(tick, 1000 / tps);

  function inputSwitch(posStr: string) {
    const tile = map[posStr];
    if (!tile || tile.type !== TileType.Input) return;
    const newState = !tilesState.current.get(posStr) || false;
    tilesState.current.set(posStr, newState);

    for (const [wireEndStr, _] of Object.entries(tile.connections)) {
      const currCount = toActivateQueue.current.get(wireEndStr) || 0;
      toActivateQueue.current.set(wireEndStr, currCount + (newState ? 1 : -1));
    }

    stateUpdateCallback();
  }

  function init() {
    // init maps
    clear();
    for (const [posStr, _tile] of Object.entries(map)) {
      tilesState.current.set(posStr, false);
      toActivateQueue.current.set(posStr, 0);
      tilesInputs.current.set(posStr, [0, 0]);
    }

    // init tilesInputs
    for (const [_posStr, tile] of Object.entries(map)) {
      for (const [endPosStr, _endTile] of Object.entries(tile.connections)) {
        const [conns, activeConns] = tilesInputs.current.get(endPosStr) || [
          0, 0,
        ];
        tilesInputs.current.set(endPosStr, [conns + 1, activeConns]);
      }
    }
  }

  function clear() {
    tilesState.current.clear();
    tilesInputs.current.clear();
    toActivateQueue.current.clear();
  }

  const start = () => {
    init();
    ticker.start();
  };

  const stop = () => {
    clear();
    ticker.stop();
  };

  const onMouseDown = useCallback(() => {
    const mouseTileStr = vector2ToStr(mouseTile);
    const pointingTile = map[mouseTileStr];
    if (!pointingTile) return;

    if (pointingTile.type === TileType.Input) {
      inputSwitch(mouseTileStr);
    }
  }, [mouseTile]);

  return {
    onMouseDown,
    activeTiles: tilesState.current,
    start,
    stop,
  };
}

export default useMapPlayer;
