import { Server } from "socket.io";
import http from "http";

const users = new Map(); // Armazena usuários e senhas
const players = new Map(); // Armazena jogadores conectados

// Funções auxiliares
const registerUser = (nick, password) => {
  if (users.has(nick)) throw new Error("Nick já está em uso.");
  users.set(nick, password);
};

const authenticateUser = (nick, password) => {
  if (!users.has(nick) || users.get(nick) !== password) {
    throw new Error("Nick ou senha incorretos.");
  }
};

const addPlayer = (nick) => {
  if (!players.has(nick)) {
    players.set(nick, {
      id: nick,
      position: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      velocity: { x: 0, y: 0, z: 0 },
      lastUpdate: Date.now(),
    });
  }
};

const removePlayer = (nick) => {
  players.delete(nick);
};

const updatePlayer = (nick, position, rotation, velocity) => {
  if (players.has(nick)) {
    const player = players.get(nick);
    player.position = position;
    player.rotation = rotation;
    player.velocity = velocity;
    player.lastUpdate = Date.now();
  }
};

const getPlayerList = () => Array.from(players.values());

// Configuração do servidor
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("Socket.IO server listening on port 3001");
});

// Eventos Socket.IO
io.on("connection", (socket) => {
  console.log(`Nova conexão: ${socket.id}`);

  socket.on("register", ({ nick, password }) => {
    try {
      registerUser(nick, password);
      socket.emit("registerSuccess", "Registrado com sucesso!");
    } catch (error) {
      socket.emit("registerError", error.message);
    }
  });

  socket.on("login", ({ nick, password }) => {
    try {
      authenticateUser(nick, password);
      addPlayer(nick);
      socket.emit("loginSuccess", { message: "Login bem-sucedido!", nick });
      io.emit("updatePlayers", getPlayerList());
    } catch (error) {
      socket.emit("loginError", error.message);
    }
  });

  socket.on("playerPosition", ({ position, rotation, velocity }) => {
    const nick = socket.nick; // Identifica o jogador pelo socket
    updatePlayer(nick, position, rotation, velocity);
    io.emit("updatePlayers", getPlayerList());
  });

  socket.on("disconnect", () => {
    const nick = socket.nick; // Identifica o jogador
    removePlayer(nick);
    io.emit("updatePlayers", getPlayerList());
  });
});
