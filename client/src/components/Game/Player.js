import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useSocket } from "../../context/SocketProvider";

export const Player = ({
  setChunkPosition,
  initialPosition,
  speed = 5,
  direction = new THREE.Vector3(),
  frontVector = new THREE.Vector3(),
  sideVector = new THREE.Vector3(),
}) => {
  const rigidBodyRef = useRef(null);
  const { updatePlayerPosition, currentPlayerId } = useSocket(); // Adiciona o `currentPlayerId` para diferenciar o jogador local
  const [, getKeys] = useKeyboardControls();

  useEffect(() => {
    if (!rigidBodyRef.current) return;

    const initialTranslation = rigidBodyRef.current.translation?.() || [0, 0, 0];
    const initialRotation = rigidBodyRef.current.rotation
      ? [
        rigidBodyRef.current.rotation().x,
        rigidBodyRef.current.rotation().y,
        rigidBodyRef.current.rotation().z,
        rigidBodyRef.current.rotation().w,
      ]
      : [0, 0, 0, 1];
    const initialVelocity = rigidBodyRef.current.linvel?.() || [0, 0, 0];

    console.log("Initializing player state:", {
      position: initialTranslation,
      rotation: initialRotation,
      velocity: initialVelocity,
    });

    // Atualiza o servidor com as informações iniciais do jogador
    updatePlayerPosition(initialTranslation, initialRotation, initialVelocity);
  }, []);

  useFrame((state) => {
    if (!rigidBodyRef.current) return;

    const keys = getKeys();
    const { forward, backward, left, right, jump } = keys;

    const velocity = rigidBodyRef.current.linvel?.() || { x: 0, y: 0, z: 0 };

    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(state.camera.rotation);

    // Movimenta o jogador local
    rigidBodyRef.current.setLinvel({
      x: direction.x,
      y: velocity.y,
      z: direction.z,
    });

    if (jump && velocity.y === 0) {
      rigidBodyRef.current.setLinvel({ x: velocity.x, y: 7.5, z: velocity.z });
    }

    // Obtenha a posição e rotação sem interferir no comportamento local
    const translationVector = rigidBodyRef.current.translation?.() || new THREE.Vector3();
    const preciseTranslation = [translationVector.x, translationVector.y, translationVector.z];
    const rotationQuaternion = new THREE.Quaternion();
    state.camera.getWorldQuaternion(rotationQuaternion); // Pega a rotação da câmera como quaternion

    // Calcula os valores arredondados para enviar ao servidor (com 2 decimais)
    const roundedTranslation = preciseTranslation.map((value) => parseFloat(value.toFixed(2)));

    // Atualiza o servidor apenas com os dados arredondados
    const currentVelocity = rigidBodyRef.current.linvel?.() || [0, 0, 0];
    updatePlayerPosition(roundedTranslation, rotationQuaternion.toArray(), currentVelocity);

    // Atualiza a câmera e chunks (mantendo valores precisos para o local)
    state.camera.position.set(...preciseTranslation);

    setChunkPosition([
      Math.round(preciseTranslation[0] / 16),
      0,
      Math.round(preciseTranslation[2] / 16),
    ]);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      type="dynamic"
      position={initialPosition}
      
      enabledRotations={[false, true, false]} // Permitir rotação
    >
      <CapsuleCollider args={[2, 0.5]} position={[0, 1, 0]} />
    </RigidBody>
  );
};
