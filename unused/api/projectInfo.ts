import { refreshTokens } from "./refresh";

export interface ProjectInfo {
  found: boolean;
  title: string;
  role: "owner" | "editor" | "viewer";
}

export async function fetchProjectInfo(id: string): Promise<ProjectInfo> {
  const refreshRes = await refreshTokens();
  if (refreshRes.status === 401) {
    // it's ok
  } else if (!refreshRes.ok) {
    throw new Error("Failed to refresh tokens");
  }

  const res = await fetch("/api/project/info/" + id);
  if (res.status === 404) {
    return {
      found: false,
      title: "",
      role: "viewer",
    };
  } else if (!res.ok) {
    throw new Error("Failed to fetch project info");
  }

  const data: ProjectInfo = await res.json();
  data.found = true;
  return data;
}
