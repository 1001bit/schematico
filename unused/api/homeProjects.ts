import { ProjectListData } from "../components/ProjectList/ProjectList";
import { refreshIfUnauthorized } from "./refresh";

export interface HomeProjectsData {
  projectsListData: ProjectListData;
  authorized: boolean;
}

export async function fetchHomeProjects(): Promise<HomeProjectsData> {
  const res = await refreshIfUnauthorized(() => fetch("/api/project/mylist"));
  if (res.status === 401) {
    return {
      authorized: false,
      projectsListData: {
        projects: [],
      },
    };
  } else if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  const json = await res.json();
  return {
    authorized: true,
    projectsListData: json as ProjectListData,
  };
}
