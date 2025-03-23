"use strict";
const titleElem = document.getElementById("title");
const getLastItem = (path) => path.substring(path.lastIndexOf("/") + 1);
function handleProjectResp(resp) {
    titleElem.textContent = resp.title;
    window.document.title = resp.title;
}
refreshBefore(() => {
    return fetch("/api/project/info/" + getLastItem(window.location.pathname));
}).then((res) => {
    if (res.status === 404) {
        titleElem.textContent = "Project not found";
        titleElem.style.color = "var(--err)";
        return;
    }
    else if (!res.ok) {
        titleElem.textContent = "Error";
        titleElem.style.color = "var(--err)";
        return;
    }
    res.json().then((data) => {
        handleProjectResp(data);
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
