import { isDev } from "../utils/isDev";
import { useLoaderData } from "react-router";
import { fetchHomeProjects, HomeProjectsData } from "../api/homeProjects";
import Login from "./Login";
import Home from "./Home";

async function loaderDev(): Promise<HomeProjectsData> {
  return {
    authorized: true,
    projectsListData: {
      projects: [
        { id: "1", title: "Project 1" },
        { id: "2", title: "Project 2" },
        { id: "3", title: "Project 3" },
        { id: "4", title: "Project 4" },
      ],
    },
  };
}

export async function loader(): Promise<HomeProjectsData> {
  return isDev ? loaderDev() : fetchHomeProjects();
}

export default function Index() {
  const data = useLoaderData() as HomeProjectsData;

  return data.authorized ? (
    <Home projects={data.projectsListData.projects} />
  ) : (
    <Login />
  );
}
