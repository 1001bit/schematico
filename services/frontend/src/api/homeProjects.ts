import { ProjectListData } from "../components/ProjectList/ProjectList";
import { refreshIfUnauthorized } from "./refresh";

export async function fetchHomeProjects(): Promise<ProjectListData> {
  const res = await refreshIfUnauthorized(() => fetch("/api/project/mylist"));
  if (res.status === 401) {
    return {
      projects: [],
    } as ProjectListData;
  } else if (!res.ok) {
    throw new Response("Failed to fetch projects", { status: res.status });
  }
  return await res.json();
}
