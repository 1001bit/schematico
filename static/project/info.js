import * as elem from "./elems.js";
import * as refresh from "../refresh/refresh.js";
const getLastItem = (path) => path.substring(path.lastIndexOf("/") + 1);
function setTitle(title) {
    elem.title.textContent = title;
    window.document.title = title;
}
function handleProjectResp(resp) {
    setTitle(resp.title);
}
export function init() {
    refresh
        .refreshBefore(() => {
        return fetch("/api/project/info/" + getLastItem(window.location.pathname));
    })
        .then((res) => {
        if (res.status === 404) {
            setTitle("Project not found");
            elem.title.style.color = "var(--err)";
            return;
        }
        else if (!res.ok) {
            setTitle("Error");
            elem.title.style.color = "var(--err)";
            return;
        }
        res.json().then((data) => {
            handleProjectResp(data);
        });
    });
}
