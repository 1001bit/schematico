"use strict";
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const signinButton = document.getElementById("signin");
const createButton = document.getElementById("create");
const messageElem = document.getElementById("message");
setRemoveBorderColorOnEdit(usernameInput);
setRemoveBorderColorOnEdit(passwordInput);
signinButton.addEventListener("click", () => {
    validateAndSubmit("signin", usernameInput.value, passwordInput.value);
});
createButton.addEventListener("click", () => {
    validateAndSubmit("create", usernameInput.value, passwordInput.value);
});
function validateUsername(username) {
    if (username.length > 32) {
        return "username too long";
    }
    if (username.length < 1) {
        return "username field empty";
    }
    return "";
}
function setMessage(msg) {
    messageElem.textContent = msg;
}
function validatePassword(password) {
    if (password.length > 32) {
        return "password too long";
    }
    if (password.length < 8) {
        return "password too short";
    }
    return "";
}
function submit(type, username, password) {
    return fetch("/api/signin", {
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
        setBorderColor(usernameInput, "err");
        setMessage(msg);
        return;
    }
    msg = validatePassword(password);
    if (msg !== "") {
        setBorderColor(passwordInput, "err");
        setMessage(msg);
        return;
    }
    submit(type, username, password).then((msg) => {
        if (msg !== "") {
            setBorderColor(passwordInput, "err");
            setBorderColor(usernameInput, "err");
            setMessage(msg);
            return;
        }
        window.location.href = "/";
    });
}
function setRemoveBorderColorOnEdit(input) {
    input.addEventListener("input", () => {
        input.style.removeProperty("border-color");
    });
}
function setBorderColor(input, colorVar) {
    input.style.setProperty("border-color", `var(--${colorVar})`);
}
