import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Apenas a rota de registro do cliente
    const route = "http://localhost:5000/client/auth/register";

    try {
      const response = await axios.post(route, {
        username,
        email,
        password,
      });

      // Se o registro foi bem-sucedido
      if (response.status === 201) {
        setSuccess(true);
        setError("");
        // Opcional: redirecionar para login após sucesso
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error(`Erro ao tentar registrar na rota ${route}:`, err);
      setError("Falha no registro. Verifique os dados fornecidos.");
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
        onSubmit={handleRegister}
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
        <h2>Registro</h2>
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {success && <p style={{ color: "green" }}>Registro bem-sucedido!</p>}
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
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
