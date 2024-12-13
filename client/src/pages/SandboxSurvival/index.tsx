import React, { useState } from "react";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";

type UniverseData = {
  name: string;
  CreateAt: string; // Deve ser uma string formatada como data
  age: number;
  Sectiontime: string; // Deve ser uma string formatada como hora
  hastime: boolean;
  expansionRate: number; // Valor estático de expansão
  layers: number; // Valor dinâmico calculado
  actlayers: number; // Valor dinâmico calculado
};

function SandboxSurvival() {
  const [userData, setUserData] = useState<any>(null);
  const [interfaceOpen] = useState(true);
  const [loadingLayer, setLoadingLayer] = useState<number>(1); // Estado para o layer que está sendo carregado
  const [universeData, setUniverseData] = useState<UniverseData>({
    name: "test",
    CreateAt: "",
    age: 10,
    Sectiontime: "11:11:11",
    hastime: true,
    expansionRate: 20,
    layers: 1,
    actlayers: 1,
  });

  // Definindo o blockState para diferentes tipos de blocos
  const blockState = {
    0: { texture: 'stone', model: 'box', RigidBody: "fixed", RigidBodyType: "cuboid" }, // Bloco voxel padrão
    1: { texture: 'wood', model: 'globe', RigidBody: "fixed", RigidBodyType: "cuboid" }, // Globo
    2: { texture: 'brick', model: 'stairs', RigidBody: "fixed", RigidBodyType: "cuboid" }, // Forma personalizada (escada para teste)
  };

  const customModels = {
    stairs: [
      { position: [0, 0, 0.5], rotation: [0, 0, 0], render: true },   // Frente
      { position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], render: true },  // Trás
      // Adicione mais configurações de planos customizados aqui
    ],
    customModelName: [
      { position: [0, 0, 0.5], rotation: [0, 0, 0], render: true },   // Exemplo para um modelo customizado
      // Adicione as configurações do modelo customizado aqui
    ],
  };


  const setlayer = (increase: boolean) => {
    setUniverseData((prevData) => {
      let newActLayers = prevData.actlayers;
      if (increase) {
        newActLayers = Math.min(prevData.actlayers + 1, prevData.layers);
      } else {
        newActLayers = Math.max(prevData.actlayers - 1, 1);
      }
      return { ...prevData, actlayers: newActLayers };
    });
  };


  const textures = {
    stone: '/assets/textures/cubes/stone.png',
    wood: '/assets/textures/cubes/wood.png',
    brick: '/assets/textures/cubes/stone.png',
  };

  const cubesArray = [];

  // Cria o chão
  for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <= 10; z++) {
      cubesArray.push([x, 0, z, 0]); // '1' representa o tipo de bloco (pode ajustar conforme necessário)
    }
  }

  // Adiciona os cubos na altura 1
  cubesArray.push([0, 2, 0, 1]);
  cubesArray.push([1, 2, 0, 2]);
  cubesArray.push([3, 2, 0, 0]);  // Adiciona os cubos na altura 1
  cubesArray.push([0, 1, 1, 1]);
  cubesArray.push([1, 1, 1, 2]);
  cubesArray.push([2, 2, 1, 3]);
  cubesArray.push([3, 1, 1, 0]);

  console.log(cubesArray);

  const chunks = [
    {
      position: [1, 0, 0],
      cubesArray: cubesArray
    },
  ];


  return (
    <>
      <Helmet>
        <title>Sandbox Admin</title>
      </Helmet>



      <Game
        customModels={customModels}
        blockState={blockState}
        canPlayerFly={true}
        textures={textures}
        chunks={chunks}
        renderDistance={15}
        gravity={[0, -9.81, 0]}
        pointLightPosition={[5, 10, 5]}
        initialPlayerPosition={[2, 20, 2]}
        sunPosition={[150, 50, 150]}
        ambientLightIntensity={1.5}
        pointLightIntensity={0.5}
        fov={60}
        keyboardMap={[
          { name: "forward", keys: ["w", "W"] },
          { name: "backward", keys: ["s", "S"] },
          { name: "left", keys: ["a", "A"] },
          { name: "right", keys: ["d", "D"] },
          { name: "shift", keys: ["Shift"] },
          { name: "jump", keys: ["Space"] },
          { name: "inventory", keys: ["e", "E"] },
          { name: "layerp", keys: ["ArrowUp"] },
          { name: "layerm", keys: ["ArrowDown"] },
          { name: "escape", keys: ["ESC", "Escape"] },
        ]}
      />
    </>
  );
}

export default SandboxSurvival;