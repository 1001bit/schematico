import * as input from "../input/input.js";
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const signinButton = document.getElementById("signin");
const createButton = document.getElementById("create");
const messageElem = document.getElementById("message");
export function init() {
    input.setRemoveBorderColorOnEdit(usernameInput);
    input.setRemoveBorderColorOnEdit(passwordInput);
    signinButton.addEventListener("click", () => {
        validateAndSubmit("signin", usernameInput.value, passwordInput.value);
    });
    createButton.addEventListener("click", () => {
        validateAndSubmit("create", usernameInput.value, passwordInput.value);
    });
}
function validateUsername(username) {
    if (username.length == 0) {
        return "username field empty";
    }
    return "";
}
function validatePassword(password) {
    if (password.length == 0) {
        return "password field empty";
    }
    return "";
}
function setErrorMessage(msg) {
    messageElem.style.color = "var(--err)";
    messageElem.textContent = msg;
    setTimeout(resetMessageColor, 1000);
}
function resetMessageColor() {
    messageElem.style.color = "";
}
function submit(type, username, password) {
    return fetch("/api/user/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: type,
            username: username,
            password: password,
        }),
    }).then((res) => {
        if (res.ok) {
            return "";
        }
        return res
            .json()
            .then((json) => {
            return json.message;
        })
            .catch(() => {
            return "unknown error";
        });
    });
}
function validateAndSubmit(type, username, password) {
    let msg = validateUsername(username);
    if (msg !== "") {
        input.setBorderColor(usernameInput, "err");
        setErrorMessage(msg);
        return;
    }
    msg = validatePassword(password);
    if (msg !== "") {
        input.setBorderColor(passwordInput, "err");
        setErrorMessage(msg);
        return;
    }
    submit(type, username, password).then((msg) => {
        if (msg !== "") {
            setErrorMessage(msg);
            return;
        }
        window.location.href = "/";
    });
}
