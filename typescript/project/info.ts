const getLastItem = (path: string) => path.substring(path.lastIndexOf("/") + 1);

interface ProjectInfoResp {
	title: string;
	role: "owner" | "editor" | "viewer";
}

function setTitle(title: string) {
	titleElem.textContent = title;
	window.document.title = title;
}

function handleProjectResp(resp: ProjectInfoResp) {
	setTitle(resp.title);
}

refreshBefore(() => {
	return fetch("/api/project/info/" + getLastItem(window.location.pathname));
}).then((res) => {
	if (res.status === 404) {
		titleElem.textContent = "Project not found";
		titleElem.style.color = "var(--err)";
		return;
	} else if (!res.ok) {
		titleElem.textContent = "Error";
		titleElem.style.color = "var(--err)";
		return;
	}

	res.json().then((data) => {
		handleProjectResp(data);
	});
});
