import { useCallback, useEffect, useRef } from "react";
import { TileMapType } from "../tilemap";
import vector2 from "../vector2";
import placeWire from "./wire";
import { ToolbarItem, ToolType } from "../Toolbar/Toolbar";
import { mapTilesEdit, mapTilesErase } from "./tiles";

function useMapEditor(
  map: TileMapType,
  mouseTile: vector2,
  currItem: ToolbarItem,
  updateCallback: (newWire?: [vector2, vector2]) => void
) {
  const newWire = useRef<[vector2, vector2] | undefined>(undefined);
  const mouseDown = useRef(false);

  const onMouseDown = useCallback(() => {
    mouseDown.current = true;

    if (currItem.item === "tool") {
      if (currItem.type === ToolType.Erase) {
        mapTilesErase(map, mouseTile);
        updateCallback();
      } else if (currItem.type === ToolType.Wire) {
        if (!newWire.current) {
          newWire.current = [mouseTile, mouseTile];
        }
        newWire.current[1] = mouseTile;
        updateCallback(newWire.current);
      }
    } else {
      mapTilesEdit(map, mouseTile, currItem.type);
      updateCallback();
    }
  }, [currItem, mouseTile]);

  useEffect(() => {
    if (mouseDown.current) {
      onMouseDown();
    }
  }, [mouseTile]);

  const onMouseUp = useCallback(() => {
    mouseDown.current = false;

    if (newWire.current) {
      const [start, end] = newWire.current;
      placeWire(map, start, end);
      newWire.current = undefined;

      updateCallback();
    }
  }, [currItem, mouseTile]);

  return {
    onMouseDown,
    onMouseUp,
  };
}

export default useMapEditor;
