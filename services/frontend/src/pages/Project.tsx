import { useLoaderData } from "react-router";
import { fetchProjectInfo, ProjectInfo } from "../api/projectInfo";
import { useTitle } from "../hooks/title/TitleContext";
import { isDev } from "../utils/isDev";
import Toolbar, { ToolType } from "../components/Toolbar/Toolbar";
import { useEffect, useState } from "react";
import { Game } from "../Game/Game";

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
  const [tool, setTool] = useState<ToolType>(ToolType.Drag);

  function handleSelectTool(t: ToolType) {
    setTool(t);
  }

  useEffect(() => {
    title.setTitle(data.title);
  }, []);

  return (
    <>
      <Game tool={tool}></Game>
      <div className="flex justify-between w-full fixed left-0 bottom-0 px-2 py-1 z-10 items-end">
        <a>
          <h3>settings</h3>
        </a>
        <Toolbar onSelect={(t) => handleSelectTool(t)}></Toolbar>
        <a>
          <h3>play</h3>
        </a>
      </div>
    </>
  );
}
