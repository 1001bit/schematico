async function deleteServerProject(id: string) {
  const res = await fetch("/api/project/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  if (!res.ok) {
    throw new Error("Error deleting a project");
  }
}

export default deleteServerProject;
