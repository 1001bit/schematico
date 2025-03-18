"use strict";
const newProjButton = document.getElementById("new-project");
const projectsDiv = document.getElementById("projects");
const sampleProjectElem = document.getElementsByClassName("project sample")[0];
function postNewProject() {
    return fetch("/api/project/new", {
        method: "POST",
    });
}
newProjButton.addEventListener("click", () => {
    refreshIfUnauth(postNewProject).then((res) => {
        if (res.status === 401) {
            window.location.href = "/signin";
        }
        else if (res.ok) {
            res.json().then((data) => {
                console.log(data);
            });
        }
    });
});
function renderProjectsList(projects) {
    for (const project of projects) {
        const newProjectElem = sampleProjectElem.cloneNode(true);
        newProjectElem.classList.remove("sample");
        const titleElem = newProjectElem.getElementsByClassName("project-title")[0];
        const projectEditElem = newProjectElem.getElementsByClassName("project-edit")[0];
        titleElem.textContent = project.title;
        projectEditElem.href = `/project/${project.id}`;
        projectsDiv.appendChild(newProjectElem);
    }
}
function handleProjectsData(data) {
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
function refreshTokens() {
    return fetch("/api/user/refresh", {
        method: "POST",
    });
}
function refreshBefore(fetchFunc) {
    return refreshTokens().then((_res) => {
        return fetchFunc();
    });
}
function refreshIfUnauth(fetchFunc) {
    return fetchFunc().then((res) => {
        if (res.status === 401) {
            return refreshBefore(fetchFunc);
        }
        return res;
    });
}
