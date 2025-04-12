import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";
import { useEffect } from "react";
import { Game } from "../Game/Game";
import Button from "../components/Button/Button";

export async function loader({ params }: any): Promise<void> {
  params;
  // TODO
}

export default function Project() {
  const title = useTitle();
  const data = useLoaderData();

  useEffect(() => {
    // TODO
    title.setTitle("title");
  }, []);

  return (
    <>
      <Game></Game>
      <div className="flex justify-between w-full fixed left-0 bottom-0 px-3 py-2 items-end">
        <Button onClick={() => {}}>settings</Button>
        <Button onClick={() => {}}>play</Button>
      </div>
    </>
  );
}
