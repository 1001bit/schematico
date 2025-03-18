function postNewProject(): Promise<Response> {
	return fetch("/api/project/new", {
		method: "POST",
	});
}

newProjButton.addEventListener("click", () => {
	refreshIfUnauth(postNewProject).then((res) => {
		if (res.status === 401) {
			window.location.href = "/signin";
		} else if (res.ok) {
			res.json().then((data) => {
				console.log(data);
			});
		}
	});
});
