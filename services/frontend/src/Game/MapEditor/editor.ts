import { useCallback, useEffect, useRef } from "react";
import { TileMapType } from "../tilemap";
import vector2 from "../vector2";
import placeWire from "./wire";
import { ToolbarItem, ToolType } from "../Toolbar/Toolbar";
import { mapTilesEdit, mapTilesErase } from "./tiles";

function useMapEditor(
  initMap: TileMapType,
  mouseTile: vector2,
  currItem: ToolbarItem,
  canEdit: boolean,
  updateCallback: (map?: TileMapType, newWire?: [vector2, vector2]) => void
) {
  const map = useRef(initMap);
  const newWire = useRef<[vector2, vector2] | undefined>(undefined);
  const mouseDown = useRef(false);

  const onMouseDown = useCallback(() => {
    if (!canEdit) return;
    mouseDown.current = true;

    if (currItem.item === "tool") {
      if (currItem.type === ToolType.Erase) {
        mapTilesErase(map.current, mouseTile);
        updateCallback(map.current);
      } else if (currItem.type === ToolType.Wire) {
        if (!newWire.current) {
          newWire.current = [mouseTile, mouseTile];
        }
        newWire.current[1] = mouseTile;
        updateCallback(undefined, newWire.current);
      }
    } else {
      mapTilesEdit(map.current, mouseTile, currItem.type);
      updateCallback(map.current);
    }
  }, [currItem, mouseTile]);

  useEffect(() => {
    if (mouseDown.current) {
      onMouseDown();
    }
  }, [mouseTile]);

  const onMouseUp = useCallback(() => {
    if (!canEdit) return;

    mouseDown.current = false;

    if (newWire.current) {
      const [start, end] = newWire.current;
      placeWire(map.current, start, end);
      newWire.current = undefined;

      updateCallback(map.current, undefined);
    }
  }, [currItem, mouseTile]);

  return {
    onMouseDown,
    onMouseUp,
  };
}

export default useMapEditor;
