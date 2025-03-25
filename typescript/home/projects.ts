import * as elem from "./elems.js";
import * as refresh from "../refresh/refresh.js";

interface ListProject {
	id: string;
	title: string;
}
interface Data {
	projects: ListProject[];
}

function renderProjectsList(projects: ListProject[]) {
	for (const project of projects) {
		const newProjectElem = elem.sampleProject.cloneNode(
			true
		) as HTMLDivElement;
		newProjectElem.classList.remove("sample");

		const titleElem = newProjectElem.getElementsByClassName(
			"project-title"
		)[0] as HTMLAnchorElement;
		const projectEditElem = newProjectElem.getElementsByClassName(
			"project-edit"
		)[0] as HTMLAnchorElement;

		titleElem.textContent = project.title;
		projectEditElem.href = `/project/${project.id}`;

		elem.projectsDiv.appendChild(newProjectElem);
	}
}

function handleProjectsData(data: Data) {
	if ("projects" in data) {
		renderProjectsList(data.projects);
	}
}

export function init() {
	refresh
		.refreshIfUnauth(() => fetch("/api/project/mylist"))
		.then((res: Response) => {
			if (!res.ok) {
				return;
			}

			res.json().then((data: Data) => {
				handleProjectsData(data);
			});
		});
}
