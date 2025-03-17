function postNewProject(): Promise<Response> {
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
