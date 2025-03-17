function refreshTokens(): Promise<Response> {
	return fetch("/api/user/refresh", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

function refreshIfUnauth(
	fetchFunc: () => Promise<Response>
): Promise<Response> {
	return fetchFunc().then((res) => {
		if (res.status === 401) {
			return refreshTokens().then((res) => {
				if (!res.ok) {
					return res;
				}
				return fetchFunc();
			});
		}
		return res;
	});
}
