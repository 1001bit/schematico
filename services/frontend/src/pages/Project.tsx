import { useLoaderData } from "react-router";
import { fetchProjectInfo, ProjectInfo } from "../api/projectInfo";
import { useTitle } from "../hooks/title/TitleContext";
import { isDev } from "../utils/isDev";
import { useEffect } from "react";
import { Game } from "../Game/Game";
import Button from "../components/Button/Button";

async function loaderDev(): Promise<ProjectInfo> {
  return {
    title: "dummy project",
    role: "owner",
    found: true,
  };
}

export async function loader({ params }: any): Promise<ProjectInfo> {
  return isDev ? loaderDev() : await fetchProjectInfo(params.projectId);
}

export default function Project() {
  const title = useTitle();
  const data = useLoaderData() as ProjectInfo;

  useEffect(() => {
    title.setTitle(data.title);
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
