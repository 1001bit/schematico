function handleProjectsData(data: any) {
	console.log(data);
}

refreshIfUnauth(() => fetch("/api/project/mylist")).then((res) => {
	if (!res.ok) {
		return;
	}

	res.json().then((data) => {
		handleProjectsData(data);
	});
});
