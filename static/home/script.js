"use strict";
const newProjButton = document.getElementById("new-project");
var ServerResponse;
(function (ServerResponse) {
    ServerResponse[ServerResponse["Ok"] = 0] = "Ok";
    ServerResponse[ServerResponse["Unauth"] = 1] = "Unauth";
    ServerResponse[ServerResponse["Error"] = 2] = "Error";
})(ServerResponse || (ServerResponse = {}));
function postNewProject() {
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
        }
        else if (res.status === 401) {
            return [ServerResponse.Unauth, ""];
        }
        return [ServerResponse.Error, ""];
    });
}
function refreshTokens() {
    return fetch("/api/user/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            return ServerResponse.Ok;
        }
        else if (res.status === 401) {
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
