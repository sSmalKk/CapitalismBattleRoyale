import React, { useEffect, useState } from "react";
import { useSocket } from "context/SocketProvider";
import { useGameStore } from "store/gameStore";
import SimpleEntity from "./SimpleEntity";

export function Entities({ currentPlayerId, currentPosition, renderDistance }: { 
  currentPlayerId: string; 
  currentPosition: [number, number, number]; 
  renderDistance: number; 
}) {
  const { getVisiblePlayers } = useSocket();
  const [visibleEntities, setVisibleEntities] = useState([]);
  const entities = useGameStore((state) => state.entities);

  useEffect(() => {
    const fetchVisibleEntities = async () => {
      try {
        const players = await getVisiblePlayers(currentPlayerId, currentPosition, renderDistance);
        setVisibleEntities(players);
      } catch (error) {
        console.error("Error fetching visible players:", error);
      }
    };

    fetchVisibleEntities();
  }, [currentPlayerId, currentPosition, renderDistance, getVisiblePlayers]);

  if (!visibleEntities.length) {
    console.warn("Nenhuma entidade encontrada para renderizar.");
    return null;
  }

  return (
    <>
      {visibleEntities.map(({ id, position, rotation }) => (
        <SimpleEntity
          key={id}
          id={id}
          position={position as [number, number, number]}
          rotation={rotation as [number, number, number, number]}
        />
      ))}
    </>
  );
}

export default Entities;
