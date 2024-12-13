import React from "react";
import * as THREE from "three";
import PlayerModel from "./PlayerModel";

type SimpleEntityProps = {
  id: string;
  position: [number, number, number]; // Posição fixa
  rotation: [number, number, number, number]; // Rotação alvo para a cabeça
};

function SimpleEntity({ id, position, rotation }: SimpleEntityProps) {
  return (
    <group position={position}>
      <PlayerModel rotationX={rotation} />
    </group>
  );
}

export default SimpleEntity;
