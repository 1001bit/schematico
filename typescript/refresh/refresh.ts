function refreshTokens(): Promise<Response> {
	return fetch("/api/user/refresh", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

function refreshBefore(fetchFunc: () => Promise<Response>): Promise<Response> {
	return refreshTokens().then((res) => {
		if (!(res.ok || res.status === 401)) {
			return res;
		}
		return fetchFunc();
	});
}

function refreshIfUnauth(
	fetchFunc: () => Promise<Response>
): Promise<Response> {
	return fetchFunc().then((res) => {
		if (res.status === 401) {
			return refreshBefore(fetchFunc);
		}
		return res;
	});
}
