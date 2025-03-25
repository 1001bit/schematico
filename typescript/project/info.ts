import * as elem from "./elems.js";
import * as refresh from "../refresh/refresh.js";

const getLastItem = (path: string) => path.substring(path.lastIndexOf("/") + 1);

interface ProjectInfoResp {
	title: string;
	role: "owner" | "editor" | "viewer";
}

function setTitle(title: string) {
	elem.title.textContent = title;
	window.document.title = title;
}

function handleProjectResp(resp: ProjectInfoResp) {
	setTitle(resp.title);
}

export function init() {
	refresh
		.refreshBefore(() => {
			return fetch(
				"/api/project/info/" + getLastItem(window.location.pathname)
			);
		})
		.then((res: Response) => {
			if (res.status === 404) {
				setTitle("Project not found");
				elem.title.style.color = "var(--err)";
				return;
			} else if (!res.ok) {
				setTitle("Error");
				elem.title.style.color = "var(--err)";
				return;
			}

			res.json().then((data) => {
				handleProjectResp(data);
			});
		});
}
