refreshTokens()
	.then((res) => {
		if (res.ok) {
			window.location.replace("/");
		}
	})
	.catch();
