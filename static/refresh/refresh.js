export function refreshTokens() {
    return fetch("/api/user/refresh", {
        method: "POST",
    });
}
export function refreshBefore(fetchFunc) {
    return refreshTokens().then((_res) => {
        return fetchFunc();
    });
}
export function refreshIfUnauth(fetchFunc) {
    return fetchFunc().then((res) => {
        if (res.status === 401) {
            return refreshBefore(fetchFunc);
        }
        return res;
    });
}
