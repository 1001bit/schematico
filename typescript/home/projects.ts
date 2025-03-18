interface ListProject {
	id: string;
	title: string;
}

function renderProjectsList(projects: ListProject[]) {
	for (const project of projects) {
		const newProjectElem = sampleProjectElem.cloneNode(
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

		projectsDiv.appendChild(newProjectElem);
	}
}

function handleProjectsData(data: any) {
	if ("projects" in data) {
		renderProjectsList(data.projects);
	}
}

refreshIfUnauth(() => fetch("/api/project/mylist")).then((res) => {
	if (!res.ok) {
		return;
	}

	res.json().then((data) => {
		handleProjectsData(data);
	});
});
