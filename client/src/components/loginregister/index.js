import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const LoginRegister = ({ onLogin }) => {
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const event = isRegistering ? "register" : "login";
    socket.emit(event, { nick, password });

    socket.on(`${event}Success`, () => {
      onLogin(nick); // Callback para logar o usuário no jogo
    });

    socket.on(`${event}Error`, (message) => {
      setErrorMessage(message); // Exibe erros na tela
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{isRegistering ? "Registro" : "Login"}</h1>
      <input
        type="text"
        placeholder="Nick"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>
        {isRegistering ? "Registrar" : "Entrar"}
      </button>
      <br />
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Já tenho uma conta" : "Criar conta"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginRegister;
