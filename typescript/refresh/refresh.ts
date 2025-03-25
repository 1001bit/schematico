export function refreshTokens(): Promise<Response> {
	return fetch("/api/user/refresh", {
		method: "POST",
	});
}

export function refreshBefore(
	fetchFunc: () => Promise<Response>
): Promise<Response> {
	return refreshTokens().then((_res) => {
		return fetchFunc();
	});
}

export function refreshIfUnauth(
	fetchFunc: () => Promise<Response>
): Promise<Response> {
	return fetchFunc().then((res) => {
		if (res.status === 401) {
			return refreshBefore(fetchFunc);
		}
		return res;
	});
}
