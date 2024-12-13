import create from "zustand";

type Entity = {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number, number];
};

type BlockState = {
  [key: number]: {
    name: string;
    texture: string;
    model: string;
    textures: string[];
    RigidBody: string;
    RigidBodyType: string;
    type: number;
  };
};

type CustomModel = {
  position: number[];
  rotation: number[];
  render: boolean;
};

type Chunk = {
  position: number[];
  cubesArray: number[][];
};

type GameStore = {
  // Entidades no jogo
  entities: Entity[];
  setEntities: (entities: Entity[]) => void;
  updateEntity: (id: string, updates: Partial<Entity>) => void;
  addEntity: (id: string, position: [number, number, number], rotation: [number, number, number, number]) => void;

  // Gerenciamento de chunks
  chunkPosition: [number, number, number];
  setChunkPosition: (newPosition: [number, number, number]) => void;
  chunks: Chunk[];
  setChunks: (chunks: Chunk[]) => void;
  addChunk: (chunk: Chunk) => void;

  // Blocos e modelos personalizados
  blockState: BlockState;
  setBlockState: (index: number, newState: BlockState[number]) => void;
  customModels: { [key: string]: CustomModel[] };
  setCustomModels: (modelName: string, newConfig: CustomModel[]) => void;

  // Texturas
  textures: { [key: string]: string };
  setTextures: (textureName: string, url: string) => void;

  // Controle de interface
  interfaceOpen: boolean;
  setInterfaceOpen: (value: boolean) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  // Estado inicial de entidades
  entities: [],
  setEntities: (entities) => set({ entities }),

  addEntity: (id, position, rotation) =>
    set((state) => {
      const entityExists = state.entities.some((entity) => entity.id === id);
      if (!entityExists) {
        return { entities: [...state.entities, { id, position, rotation }] };
      }
      return state;
    }),

  updateEntity: (id, updates) =>
    set((state) => ({
      entities: state.entities.map((entity) =>
        entity.id === id ? { ...entity, ...updates } : entity
      ),
    })),

  // Estado inicial de chunks
  chunkPosition: [0, 0, 0],
  setChunkPosition: (newPosition) => set({ chunkPosition: newPosition }),
  chunks: [],
  setChunks: (chunks) => set({ chunks }),

  addChunk: (chunk) =>
    set((state) => {
      const chunkExists = state.chunks.some((c) =>
        c.position.every((value, index) => value === chunk.position[index])
      );
      if (!chunkExists) {
        return { chunks: [...state.chunks, chunk] };
      }
      return state;
    }),

  // Estado inicial de blocos e modelos personalizados
  blockState: {
    0: {
      name: "custombox",
      texture: "stone",
      model: "custombox",
      textures: ["stone", "brick"],
      RigidBody: "fixed",
      RigidBodyType: "cuboid",
      type: 0,
    },
  },
  setBlockState: (index, newState) =>
    set((state) => ({
      blockState: { ...state.blockState, [index]: newState },
    })),

  customModels: {
    custombox: [
      { position: [0, 0, 0.5], rotation: [0, 0, 0], render: true },
      { position: [0, 0, -0.5], rotation: [0, Math.PI, 0], render: true },
    ],
  },
  setCustomModels: (modelName, newConfig) =>
    set((state) => ({
      customModels: { ...state.customModels, [modelName]: newConfig },
    })),

  // Estado inicial de texturas
  textures: {
    stone: "/assets/textures/cubes/stone.png",
  },
  setTextures: (textureName, url) =>
    set((state) => ({
      textures: { ...state.textures, [textureName]: url },
    })),

  // Estado inicial de controle de interface
  interfaceOpen: true,
  setInterfaceOpen: (value) => set({ interfaceOpen: value }),
}));
