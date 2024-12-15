const users = new Map(); // Armazena nick, senha e última posição

export const registerUser = (nick, password) => {
  if (users.has(nick)) throw new Error("Nick já está em uso.");
  users.set(nick, {
    password,
    position: [0, 0, 0],
    rotation: [0, 0, 0, 1],
  });
  console.log(`Usuário registrado: ${nick}`);
};

export const authenticateUser = (nick, password) => {
  if (!users.has(nick) || users.get(nick).password !== password) {
    throw new Error("Nick ou senha incorretos.");
  }
  console.log(`Usuário autenticado: ${nick}`);
  return true;
};

export const addPlayer = (nick) => {
  const userData = users.get(nick);
  players.set(nick, {
    id: nick,
    position: userData.position || [0, 0, 0],
    rotation: userData.rotation || [0, 0, 0, 1],
    velocity: { x: 0, y: 0, z: 0 },
    lastUpdate: Date.now(),
  });
  console.log(`Player adicionado: ${nick}`);
};

export const updatePlayer = (nick, position, rotation, velocity) => {
  if (players.has(nick)) {
    const player = players.get(nick);
    player.position = position;
    player.rotation = rotation;
    player.velocity = velocity;
    player.lastUpdate = Date.now();

    // Atualiza a última posição no usuário
    const userData = users.get(nick);
    if (userData) {
      userData.position = position;
      userData.rotation = rotation;
    }
  }
};

export const getPlayerList = () => Array.from(players.values());
