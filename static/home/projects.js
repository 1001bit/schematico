import * as elem from "./elems.js";
import * as refresh from "../refresh/refresh.js";
function renderProjectsList(projects) {
    for (const project of projects) {
        const newProjectElem = elem.sampleProject.cloneNode(true);
        newProjectElem.classList.remove("sample");
        const titleElem = newProjectElem.getElementsByClassName("project-title")[0];
        const projectEditElem = newProjectElem.getElementsByClassName("project-edit")[0];
        titleElem.textContent = project.title;
        projectEditElem.href = `/project/${project.id}`;
        elem.projectsDiv.appendChild(newProjectElem);
    }
}
function handleProjectsData(data) {
    if ("projects" in data) {
        renderProjectsList(data.projects);
    }
}
export function init() {
    refresh
        .refreshIfUnauth(() => fetch("/api/project/mylist"))
        .then((res) => {
        if (!res.ok) {
            return;
        }
        res.json().then((data) => {
            handleProjectsData(data);
        });
    });
}
