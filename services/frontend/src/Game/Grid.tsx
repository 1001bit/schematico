import { extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";

extend({ Graphics, Container });

interface GridProps {
  tile: number;
  w: number;
  h: number;
}

export function Grid(props: GridProps) {
  return (
    <pixiGraphics
      draw={(g: Graphics) => {
        g.clear();
        for (let i = 0; i < props.w; i++) {
          g.moveTo(i * props.tile, 0).lineTo(i * props.tile, props.h);
        }
        for (let i = 0; i < props.h; i++) {
          g.moveTo(0, i * props.tile).lineTo(props.w, i * props.tile);
        }

        // Stroke all lines in white with pixel-perfect width
        g.stroke({ color: 0xffffff, pixelLine: true, alpha: 0.15 });
      }}
    />
  );
}
