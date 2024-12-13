import React, { useState, useEffect } from "react";
import "./style.css"; // Importando os estilos

export const ServerStatus: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<"red" | "green" | "invisible">("invisible");
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const serverUrl = localStorage.getItem("server");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkServerStatus = async () => {
      if (!serverUrl) {
        setServerStatus("red"); // Se não houver um servidor salvo, mostra vermelho.
        return;
      }

      try {
        const response = await fetch(`${serverUrl}/device/api/v1/user/me`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token || ""}`,
            Credentials: "include",
          },
        });

        if (response.status === 404) {
          setServerStatus("red");
        } else if (response.ok || response.status === 401) {
          setServerStatus("green");
        } else {
          setServerStatus("red");
        }
      } catch (error) {
        setServerStatus("red");
      }
    };

    checkServerStatus();
  }, [serverUrl, token]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const removeServer = () => {
    localStorage.removeItem("server");
    setServerStatus("invisible");
    window.location.href = "/";
  };

  return (
    <div className="fixed top-5 right-5 p-3" style={{ zIndex: 99 }}>
      {/* Caixa de botão "hamburger" com a bola de status */}
      <div className="hamburger-container bg-opacity-80 p-4 rounded-md shadow-lg relative">
        {/* Botão Hamburger Discreto */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>

      {/* Menu que aparece ao clicar */}
      {menuOpen && serverUrl && (
        <div className="menu bg-gray-900 p-3 mt-2 rounded shadow-lg">
          <div className="flex items-center justify-between">
            {/* Nome do servidor salvo, truncado em uma linha */}
            <div
              className={`ml-2 w-[10px] h-[5px] rounded-full ${serverStatus === "red"
                ? "bg-red-500"
                : serverStatus === "green"
                  ? "bg-green-500"
                  : "bg-gray-500"
                }`}
            ></div>
            <span className="text-white flex items-center truncate max-w-[150px]" title={serverUrl}>
              {serverUrl}
            </span>
            {/* Botão para remover o servidor */}
            <button className="text-red-500 font-bold ml-4" onClick={removeServer}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
