// src/services/authService.ts
const API_URL = "http://localhost:8080";

const login = async (username: string, password: string): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Échec de la connexion");
  }

  const data = await response.json();
  return data.token;
};

export default {
  login,
};
