import { useCallback, useRef } from "react";
import { TileMapType, TileType } from "../tilemap";
import vector2, { vector2ToStr } from "../vector2";
import useTicker from "./ticker";

function getNewState(
  type: TileType,
  inputs: number,
  activeInputs: number
): boolean {
  switch (type) {
    case TileType.Input:
      return false;
    case TileType.And:
      return activeInputs >= 1 && inputs === activeInputs;
    case TileType.Bulb:
      return activeInputs >= 1;
    case TileType.Not:
      return activeInputs === 0;
    case TileType.Or:
      return activeInputs >= 1;
  }
}

interface TileState {
  state: boolean;
  inputs: number;
  activeInputs: number;
}

function useMapPlayer(
  map: TileMapType,
  mouseTile: vector2,
  stateUpdateCallback: () => void
) {
  const tilesStates = useRef<Map<string, TileState>>(new Map());
  const deltaActiveInputs = useRef<Map<string, number>>(new Map());

  const tick = useCallback(() => {
    const newDeltaActiveInputs = new Map();
    for (const [posStr, delta] of deltaActiveInputs.current) {
      const tile = map[posStr];
      const tileState = tilesStates.current.get(posStr);
      if (!tile || !tileState || tile.type === TileType.Input) continue;

      tileState.activeInputs += delta;

      const newState = getNewState(
        tile.type,
        tileState.inputs,
        tileState.activeInputs
      );
      if (newState === tileState.state) continue;

      for (const [wireEndStr, _] of Object.entries(tile.connections)) {
        const newDelta = newDeltaActiveInputs.get(wireEndStr) || 0;
        newDeltaActiveInputs.set(wireEndStr, newDelta + (newState ? 1 : -1));
      }

      tileState.state = newState;
    }
    deltaActiveInputs.current = newDeltaActiveInputs;

    stateUpdateCallback();
  }, []);
  const tps = 10;
  const ticker = useTicker(tick, 1000 / tps);

  const inputSwitch = useCallback((posStr: string) => {
    const tile = map[posStr];
    const tileState = tilesStates.current.get(posStr);
    if (!tile || !tileState || tile.type !== TileType.Input) return;

    const newState = !tileState.state;
    for (const [wireEndStr, _] of Object.entries(tile.connections)) {
      const newDelta = deltaActiveInputs.current.get(wireEndStr) || 0;
      deltaActiveInputs.current.set(wireEndStr, newDelta + (newState ? 1 : -1));
    }

    tileState.state = newState;

    stateUpdateCallback();
  }, []);

  const init = useCallback(() => {
    // init maps
    clear();
    for (const [posStr, _tile] of Object.entries(map)) {
      tilesStates.current.set(posStr, {
        state: false,
        inputs: 0,
        activeInputs: 0,
      } as TileState);
      deltaActiveInputs.current.set(posStr, 0);
    }

    // init tilesInputs
    for (const [_posStr, tile] of Object.entries(map)) {
      for (const [endPosStr, _endTile] of Object.entries(tile.connections)) {
        const tileState = tilesStates.current.get(endPosStr);
        if (!tileState) continue;
        tileState.inputs += 1;
      }
    }
  }, []);

  const clear = useCallback(() => {
    deltaActiveInputs.current.clear();
    tilesStates.current.clear();
  }, []);

  const start = useCallback(() => {
    init();
    ticker.start();
  }, []);

  const stop = useCallback(() => {
    clear();
    ticker.stop();
  }, []);

  const onMouseDown = useCallback(() => {
    const mouseTileStr = vector2ToStr(mouseTile);
    const pointingTile = map[mouseTileStr];
    if (!pointingTile) return;

    if (pointingTile.type === TileType.Input) {
      inputSwitch(mouseTileStr);
    }
  }, [mouseTile]);

  const getState = useCallback((posStr: string) => {
    const tileState = tilesStates.current.get(posStr);
    return tileState && tileState.state;
  }, []);

  return {
    onMouseDown,
    getState,
    start,
    stop,
  };
}

export default useMapPlayer;
