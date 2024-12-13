const players = new Map();

export const addPlayer = (id) => {
  players.set(id, {
    id,
    position: [0, 0, 0],
    rotation: [0, 0, 0, 1],
    velocity: { x: 0, y: 0, z: 0 },
    lastUpdate: Date.now(),
  });
  console.log(`Player added: ${id}`);
};

export const removePlayer = (id) => {
  players.delete(id);
  console.log(`Player removed: ${id}`);
};

export const updatePlayer = (id, position, rotation, velocity) => {
  if (players.has(id)) {
    const player = players.get(id);
    player.position = position; // Mantém a posição original
    player.rotation = rotation; // Mantém a rotação original
    player.velocity = velocity; // Mantém a velocidade original
    player.lastUpdate = Date.now();
    console.log(`Player updated: ${id}`, {
      position: player.position,
      rotation: player.rotation,
      velocity: player.velocity,
    });
  }
};

export const getPlayerList = () => {
  return Array.from(players.values()).map((player) => ({
    ...player,
    position: player.position, // Retorna a posição original
    rotation: player.rotation, // Retorna a rotação original
    velocity: player.velocity, // Retorna a velocidade original
  }));
};
