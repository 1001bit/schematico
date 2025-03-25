import * as refresh from "../refresh/refresh.js";
export function init() {
    refresh
        .refreshTokens()
        .then((res) => {
        if (res.ok) {
            window.location.replace("/");
        }
    })
        .catch();
}
