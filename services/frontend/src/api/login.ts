export async function submitLogin(
  type: "login" | "register",
  username: string,
  password: string
): Promise<string> {
  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type,
      username: username,
      password: password,
    }),
  });

  if (res.ok) {
    return "";
  }

  try {
    const json = await res.json();
    return json.message;
  } catch {
    return "unknown error";
  }
}
