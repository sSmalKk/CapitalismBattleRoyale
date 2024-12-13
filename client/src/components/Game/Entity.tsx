import React from "react";
import { useSocket } from "context/SocketProvider";
import { useGameStore } from "store/gameStore";
import SimpleEntity from "./SimpleEntity";

export function Entities() {
  const entities = useGameStore((state) => state.entities);
  const { currentPlayerId } = useSocket();

  const filteredEntities = entities.filter(
    (entity) => entity.id !== currentPlayerId && Array.isArray(entity.position)
  );

  if (!filteredEntities.length) {
    console.warn("Nenhuma entidade encontrada para renderizar.");
    return null;
  }

  return (
    <>
      {filteredEntities.map(({ id, position, rotation }) => (
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
