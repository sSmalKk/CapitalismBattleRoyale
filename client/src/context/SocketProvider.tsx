import React, { createContext, useContext, useEffect, ReactNode, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  updatePosition: (
    userId: string,
    position: [number, number, number],
    rotation: [number, number, number]
  ) => void;
  getVisiblePlayers: (
    userId: string,
    position: [number, number, number],
    renderDistance: number
  ) => Promise<any>;
  socket: Socket | null;
}

// Corrigindo o nome da função para coincidir com a interface
const SocketContext = createContext<SocketContextType>({
  updatePosition: () => { }, // Nome correto da função
  getVisiblePlayers: async () => [],
  socket: null,
});


export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Inicializa a conexão do socket
    socket.current = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    socket.current.on("connect", () => {
      console.log("Conectado ao servidor de sockets:", socket.current?.id);
    });

    socket.current.on("disconnect", () => {
      console.log("Desconectado do servidor de sockets.");
    });

    return () => {
      // Desconecta o socket ao desmontar o componente
      socket.current?.disconnect();
    };
  }, []);

  // Função para atualizar posição
  const updatePosition = (
    userId: string,
    position: [number, number, number],
    rotation: [number, number, number]
  ) => {
    if (!socket.current) return;
    socket.current.emit("updatePosition", { userId, position, rotation });
    console.log("Atualizando posição no servidor:", { userId, position, rotation });
  };

  // Função para obter jogadores visíveis
  const getVisiblePlayers = async (
    userId: string,
    position: [number, number, number],
    renderDistance: number
  ) => {
    return new Promise((resolve, reject) => {
      if (!socket.current) return reject("Socket not connected.");
      socket.current.emit(
        "getVisiblePlayers",
        { userId, position, renderDistance },
        (response: any) => {
          if (response.success) resolve(response.data);
          else reject(response.message);
        }
      );
    });
  };
  return (
    <SocketContext.Provider value={{ updatePosition, getVisiblePlayers, socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook para acessar o contexto
export const useSocket = () => useContext(SocketContext);
