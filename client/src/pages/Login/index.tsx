import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rotas que serão tentadas
    const routes = [
      "http://localhost:5000/admin/auth/login",
      "http://localhost:5000/client/auth/login",
      "http://localhost:5000/device/auth/login",
    ];

    let success = false; // Flag para verificar sucesso

    for (const route of routes) {
      try {
        const response = await axios.post(route, {
          username,
          password,
        });

        // Se o login foi bem-sucedido
        if (response.status === 200) {
          const { token } = response.data.data;
          // Salva o token no localStorage
          localStorage.setItem("token", token);

          // Redireciona para o jogo
          navigate("/sandboxsurvival");
          success = true;
          break; // Interrompe o loop após sucesso
        }
      } catch (err) {
        console.error(`Erro ao tentar login na rota ${route}:`, err);
      }
    }

    if (!success) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
