import * as elem from "./elems.js";
import * as refresh from "../refresh/refresh.js";

function postNewProject(): Promise<Response> {
	return fetch("/api/project/new", {
		method: "POST",
	});
}

export function init() {
	elem.newProjButton.addEventListener("click", () => {
		refresh.refreshIfUnauth(postNewProject).then((res) => {
			if (res.status === 401) {
				window.location.href = "/signin";
			} else if (res.ok) {
				res.json().then((data) => {
					console.log(data);
				});
			}
		});
	});
}
