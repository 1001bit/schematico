import { refreshIfUnauthorized } from "./refresh";

interface NewProjectResponse {
  id: string;
}

interface NewProjectPromise {
  id: string;
  authorized: boolean;
}

export async function postNewProject(): Promise<NewProjectPromise> {
  const res = await refreshIfUnauthorized(() =>
    fetch("/api/project/new", {
      method: "POST",
    })
  );

  if (res.status === 401) {
    return {
      id: "",
      authorized: false,
    };
  } else if (!res.ok) {
    throw new Error("Failed to create new project");
  }
  const data = (await res.json()) as NewProjectResponse;
  return {
    id: data.id,
    authorized: true,
  };
}
