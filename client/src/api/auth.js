export const login = async (email, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to login");

  return response.json();
};

export const register = async (email, password, username) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to register");

  return response.json();
};

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to logout");

  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch("/api/auth/check-auth", {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error("Failed to check auth");

  return data;
};
