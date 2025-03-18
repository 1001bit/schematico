"use strict";
const newProjButton = document.getElementById("new-project");
const projectsDiv = document.getElementById("projects");
function postNewProject() {
    return fetch("/api/project/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
newProjButton.addEventListener("click", () => {
    refreshIfUnauth(postNewProject).then((res) => {
        if (res.status === 401) {
            window.location.href = "/signin";
        }
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
            });
        }
    });
});
function handleProjectsData(data) {
    console.log(data);
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
        headers: {
            "Content-Type": "application/json",
        },
    });
}
function refreshBefore(fetchFunc) {
    return refreshTokens().then((res) => {
        if (!(res.ok || res.status === 401)) {
            return res;
        }
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
