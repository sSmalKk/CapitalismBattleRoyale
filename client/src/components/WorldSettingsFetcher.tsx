// WorldSettingsFetcher.js
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";


export const WorldSettingsFetcher = ({ onSettingsUpdate }) => {
  const [settings, setSettings] = useState({});
  const [mainSpace, setMainSpace] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token") || process.env.JWT;
  const socketUrl = `${apiUrl.replace("/api", "")}`;
  
  // Conectar o socket para receber dados em tempo real
  useEffect(() => {
    const socket = io(socketUrl, {
      auth: { token: `Bearer ${token}` },
    });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    // Atualizar as configurações em tempo real
    socket.on("universe_update", (data) => {
      setSettings(data.universeSettings || {});
      setMainSpace(data.mainSpace || {});
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Função para buscar as configurações iniciais
  const fetchInitialSettings = async () => {
    try {
      const universeResponse = await fetch(`${apiUrl}/client/api/v1/universe/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: {} }),
      });

      const universeConfig = await universeResponse.json();

      const chunkLoaderResponse = await fetch(
        `${apiUrl}/client/api/v1/space/${universeConfig.mainSpaceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const mainSpaceData = await chunkLoaderResponse.json();

      setSettings(universeConfig.data || {});
      setMainSpace(mainSpaceData);

      onSettingsUpdate({ universeSettings: universeConfig.data, mainSpace: mainSpaceData });
    } catch (error) {
      console.error("Error fetching initial settings:", error);
    }
  };

  useEffect(() => {
    fetchInitialSettings();
  }, []);

  return null;
};
