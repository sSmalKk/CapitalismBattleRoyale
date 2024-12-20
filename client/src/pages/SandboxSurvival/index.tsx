import React, { useEffect, useState } from "react";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import Inventory from "components/Inventory";

type UniverseData = {
  name: string;
  CreateAt: string;
  age: number;
  Sectiontime: string;
  hastime: boolean;
  expansionRate: number;
  layers: number;
  actlayers: number;
};

function SandboxSurvival() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [loadingLayer, setLoadingLayer] = useState<number>(1);
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

  const token = localStorage.getItem("token") || process.env.JWT || "";

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Token not found");
        setLoading(false);
        return;
      }

      try {
        const endpoint = "http://localhost:5000/client/api/v1/user/me";
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data.data);
        localStorage.setItem("userData", JSON.stringify(data.data)); // Armazena os dados no localStorage
        console.log("User Data:", data.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false); // Define que o carregamento terminou
      }
    };

    fetchUserData();
  }, [token]);

  const blockState = {
    0: { texture: "stone", model: "box", RigidBody: "fixed", RigidBodyType: "cuboid" },
    1: { texture: "wood", model: "globe", RigidBody: "fixed", RigidBodyType: "cuboid" },
    2: { texture: "brick", model: "stairs", RigidBody: "fixed", RigidBodyType: "cuboid" },
  };

  const customModels = {
    stairs: [
      { position: [0, 0, 0.5], rotation: [0, 0, 0], render: true },
      { position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], render: true },
    ],
  };

  const setLayer = (increase: boolean) => {
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
    stone: "/assets/textures/cubes/stone.png",
    wood: "/assets/textures/cubes/wood.png",
    brick: "/assets/textures/cubes/stone.png",
  };

  const cubesArray = [];

  for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <= 10; z++) {
      cubesArray.push([x, 0, z, 0]);
    }
  }

  cubesArray.push([0, 2, 0, 1]);
  cubesArray.push([1, 2, 0, 2]);
  cubesArray.push([3, 2, 0, 0]);
  cubesArray.push([0, 1, 1, 1]);
  cubesArray.push([1, 1, 1, 2]);
  cubesArray.push([2, 2, 1, 3]);
  cubesArray.push([3, 1, 1, 0]);

  const chunks = [
    {
      position: [1, 0, 0],
      cubesArray: cubesArray,
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        Carregando dados do usuário...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sandbox Admin</title>
      </Helmet>

      <Inventory
        topleft={[]}
        topright={[]}
        topmid={[]}
        bottomleft={[]}
        bottommid={[]}
        bottomright={[]}
      />
      <Game
        customModels={customModels}
        blockState={blockState}
        canPlayerFly={true}
        textures={textures}
        chunks={chunks}
        renderDistance={15}
        gravity={[0, -9.81, 0]}
        pointLightPosition={[5, 10, 5]}
        initialPlayerPosition={[userData?.x || 0, userData?.y || 22, userData?.z || 0]}
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
