import { extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";

extend({ Graphics, Container });

export function Rect() {
  return (
    <pixiGraphics
      draw={(g: Graphics) => {
        g.clear();
        g.setFillStyle({ color: "red" });
        g.rect(100, 100, 100, 100);
        g.fill();
      }}
    />
  );
}
