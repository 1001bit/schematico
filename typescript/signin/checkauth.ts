import * as refresh from "../refresh/refresh.js";

export function init() {
	refresh
		.refreshTokens()
		.then((res: Response) => {
			if (res.ok) {
				window.location.replace("/");
			}
		})
		.catch();
}
