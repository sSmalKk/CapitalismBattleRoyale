import { Server } from "socket.io";
import http from "http";
import { addPlayer, removePlayer, updatePlayer, getPlayerList } from "./modules/players.js";

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

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);
  addPlayer(socket.id);

  // Envia a lista inicial de jogadores
  io.emit("updatePlayers", getPlayerList());

  // Gerencia atualizações de jogadores
  socket.on("playerPosition", ({ position, rotation, velocity }) => {
    updatePlayer(socket.id, position, rotation, velocity);
    io.emit("updatePlayers", getPlayerList());
  });

  // Remove jogador ao desconectar
  socket.on("disconnect", () => {
    removePlayer(socket.id);
    io.emit("updatePlayers", getPlayerList());
  });
});

console.log("Socket.IO server is running.");
