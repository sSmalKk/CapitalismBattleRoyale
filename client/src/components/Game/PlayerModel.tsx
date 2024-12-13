import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type PlayerModelProps = {
  rotationX: [number, number, number, number]; // Rotação da câmera em forma de quaternion
};

function PlayerModel({ rotationX }: PlayerModelProps) {
  const { scene } = useGLTF("/model-transformed.glb");
  const headRef = useRef<THREE.Object3D | null>(null); // Referência à cabeça
  const modelRef = useRef<THREE.Group | null>(null); // Referência ao corpo

  useEffect(() => {
    if (!headRef.current) {
      headRef.current = scene.getObjectByName("Head");
      if (!headRef.current) {
        console.warn("Bone 'Head' não encontrado no modelo.");
        return;
      }
    }

    if (headRef.current && modelRef.current) {
      // Converte a rotação recebida para Euler
      const quaternion = new THREE.Quaternion().fromArray(rotationX);
      const euler = new THREE.Euler().setFromQuaternion(quaternion, "YXZ");

      // Aplica a rotação vertical da cabeça sem limites
      headRef.current.rotation.set(euler.x, 0, 0); // Apenas eixo X para a cabeça

      // Rotação horizontal (corpo) sem limites
      const bodyRotationY = euler.y; // Apenas eixo Y
      modelRef.current.rotation.y = bodyRotationY; // Atualiza diretamente sem limites
    }
  }, [rotationX]);

  return (
    <group position={[0, -1.5, 0]} ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
}

export default PlayerModel;
