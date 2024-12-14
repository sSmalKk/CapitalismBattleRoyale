import React, { createContext, useContext, useEffect, ReactNode, useRef } from "react";
import { io } from "socket.io-client";
import { useGameStore } from "../store/gameStore";

interface PlayerData {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number, number];
}

interface SocketContextType {
  updatePlayerPosition: (
    position: [number, number, number],
    rotation: [number, number, number, number],
    velocity: [number, number, number]
  ) => void;
  currentPlayerId: string | null;
}

const SocketContext = createContext<SocketContextType>({
  updatePlayerPosition: () => { },
  currentPlayerId: null,
});

let socket;

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { setEntities } = useGameStore();
  const localPlayerId = useRef<string | null>(null);

  useEffect(() => {
    if (!socket) {
      const token = localStorage.getItem("token"); // Recupera o token do localStorage
      socket = io("http://localhost:3001", {
        auth: { token }, // Envia o token no handshake
      });

      socket.on("connect", () => {
        localPlayerId.current = socket.id;
        console.log("Local player ID:", localPlayerId.current);
      });

      socket.on("updatePlayers", (playerData) => {
        console.log("Dados recebidos dos jogadores:", playerData);
        setEntities(playerData.filter((player) => player.id !== localPlayerId.current));
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [setEntities]);

  const updatePlayerPosition = (
    position: [number, number, number],
    rotation: [number, number, number, number],
    velocity: [number, number, number]
  ) => {
    if (!localPlayerId.current) return;
    socket.emit("playerPosition", { position, rotation, velocity });
  };

  return (
    <SocketContext.Provider value={{ updatePlayerPosition, currentPlayerId: localPlayerId.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
