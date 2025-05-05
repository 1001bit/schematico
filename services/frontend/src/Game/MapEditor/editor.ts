import { useCallback, useEffect, useRef } from "react";
import { TileMapType } from "../tilemap";
import vector2 from "../vector2";
import placeWire from "./wire";
import mapTilesEdit from "./tiles";
import { ToolType } from "../Toolbar/Toolbar";

function useMapEditor(
  initMap: TileMapType,
  mouseTile: vector2,
  currTool: ToolType,
  canEdit: boolean,
  updateCallback: (map?: TileMapType, newWire?: [vector2, vector2]) => void
) {
  const map = useRef(initMap);
  const newWire = useRef<[vector2, vector2] | undefined>(undefined);
  const mouseDown = useRef(false);

  useEffect(() => {
    if (!canEdit) return;

    if (mouseDown.current) {
      mapTilesEdit(map.current, mouseTile, currTool);
      if (newWire.current) {
        newWire.current[1] = mouseTile;
      }
      updateCallback(map.current, newWire.current);
    }
  }, [mouseTile]);

  const onMouseDown = useCallback(() => {
    if (!canEdit) return;

    mouseDown.current = true;

    if (currTool === ToolType.Wire) {
      newWire.current = [mouseTile, mouseTile];
      updateCallback(undefined, newWire.current);
    } else {
      mapTilesEdit(map.current, mouseTile, currTool);
      updateCallback(map.current, undefined);
    }
  }, [currTool, mouseTile]);

  const onMouseUp = useCallback(() => {
    if (!canEdit) return;

    mouseDown.current = false;

    if (newWire.current) {
      const [start, end] = newWire.current;
      placeWire(map.current, start, end);
      newWire.current = undefined;

      updateCallback(map.current, undefined);
    }
  }, [currTool, mouseTile]);

  return {
    onMouseDown,
    onMouseUp,
  };
}

export default useMapEditor;
