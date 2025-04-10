import { Application } from "@pixi/react";
import { Rect } from "./Rect";
import { Grid } from "./Grid";
import { useEffect, useState } from "react";

export function Game() {
  const [ww, setWw] = useState(window.innerWidth);
  const [wh, setWh] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWw(window.innerWidth);
      setWh(window.innerHeight);
    });
  }, []);

  return (
    <Application
      backgroundColor={0x000000}
      resizeTo={window}
      className="fixed left-0 top-0"
    >
      <Rect></Rect>
      <Grid w={ww} h={wh} tile={25}></Grid>
    </Application>
  );
}
