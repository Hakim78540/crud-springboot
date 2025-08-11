import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Pour la redirection

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ⬅️ Initialisation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Échec de la connexion");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      // ✅ Rediriger vers la liste des personnes
      navigate("/persons");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nom d’utilisateur" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button type="submit">Se connecter</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
