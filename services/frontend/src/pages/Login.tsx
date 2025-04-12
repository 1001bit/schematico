import { useState } from "react";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import { submitLogin } from "../api/login";
import { useNavigate } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";

export default function Login() {
  const title = useTitle();
  title.setTitle("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [msg, setMsg] = useState("who are you?");

  const navigate = useNavigate();

  async function submit(type: "login" | "register") {
    if (username.length < 1) {
      setUsernameErr(true);
      return;
    }
    if (password.length < 1) {
      setPasswordErr(true);
      return;
    }

    const msg = await submitLogin(type, username, password);
    if (msg.length === 0) {
      navigate("/");
    } else {
      setMsg(msg);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-10/12 gap-4">
      <h3>{msg}</h3>
      <div className="w-60 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <TextInput
            placeholder="username"
            length={32}
            onChange={(t) => {
              setUsernameErr(false);
              setUsername(t);
            }}
            error={usernameErr}
          ></TextInput>
          <TextInput
            placeholder="********"
            length={72}
            password
            onChange={(t) => {
              setPasswordErr(false);
              setPassword(t);
            }}
            error={passwordErr}
          ></TextInput>
        </div>
        <div className="flex justify-between gap-2">
          <Button onClick={() => submit("login")} className="w-full bg-black">
            log in
          </Button>
          <Button
            onClick={() => submit("register")}
            className="w-full bg-black"
          >
            register
          </Button>
        </div>
      </div>
    </div>
  );
}
