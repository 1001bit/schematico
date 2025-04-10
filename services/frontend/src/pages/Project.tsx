import { useLoaderData } from "react-router";
import { fetchProjectInfo, ProjectInfo } from "../api/projectInfo";
import { useTitle } from "../hooks/title/TitleContext";
import { isDev } from "../utils/isDev";
import Toolbar from "../components/Toolbar/Toolbar";

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
  const data = useLoaderData() as ProjectInfo;

  const title = useTitle();
  title.setTitle(data.title);

  return (
    <div className="w-full h-full flex">
      <div className="flex justify-between w-full fixed left-0 bottom-0 px-2 py-1 items-end">
        <a>
          <h3>settings</h3>
        </a>
        <Toolbar onSelect={(_t) => {}}></Toolbar>
        <a>
          <h3>play</h3>
        </a>
      </div>
    </div>
  );
}
