enum ServerResponse {
	Ok,
	Unauth,
	Error,
}

function postNewProject(): Promise<[ServerResponse, string]> {
	return fetch("/api/project/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (res.ok) {
			return res.json().then((data) => {
				return [ServerResponse.Ok, data.id];
			});
		} else if (res.status === 401) {
			return [ServerResponse.Unauth, ""];
		}
		return [ServerResponse.Error, ""];
	});
}

function refreshTokens(): Promise<ServerResponse> {
	return fetch("/api/user/refresh", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		if (res.ok) {
			return ServerResponse.Ok;
		} else if (res.status === 401) {
			return ServerResponse.Unauth;
		}
		return ServerResponse.Error;
	});
}

newProjButton.addEventListener("click", () => {
	postNewProject().then((res) => {
		if (res[0] === ServerResponse.Ok) {
			console.log(res[1]);
			return;
		}
		if (res[0] == ServerResponse.Error) {
			console.log("Error creating project");
			return;
		}
		refreshTokens().then((res) => {
			if (res !== ServerResponse.Ok) {
				return;
			}
			postNewProject().then((res) => {
				if (res[0] !== ServerResponse.Ok) {
					console.log("Error creating project");
					return;
				}
				console.log(res[1]);
			});
		});
	});
});
