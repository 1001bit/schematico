import { useLoaderData } from "react-router";
import { fetchHomeProjects } from "../api/homeProjects";
import ProjectList, {
  ProjectListData,
} from "../components/ProjectList/ProjectList";

async function loaderDev(): Promise<ProjectListData> {
  return {
    projects: [
      { id: "1", title: "Project 1" },
      { id: "2", title: "Project 2" },
      { id: "3", title: "Project 3" },
      { id: "4", title: "Project 4" },
    ],
  };
}

export async function loader(): Promise<ProjectListData> {
  if (import.meta.env.MODE === "development") {
    return loaderDev();
  }

  return await fetchHomeProjects();
}

export default function Home() {
  const data = useLoaderData() as ProjectListData;

  return (
    <div className="flex flex-col gap-4">
      <h3>Projects:</h3>
      <ProjectList projects={data.projects} />
      <p>
        <a>new project</a>
      </p>
    </div>
  );
}
