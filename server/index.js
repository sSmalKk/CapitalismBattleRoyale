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

// Middleware para validar o token antes da conexão
io.use((socket, next) => {
  const token = socket.handshake.auth?.token; // Recebe o token do handshake
  console.log("Token recebido no handshake:", token);

  if (!token) {
    return next(new Error("Token não fornecido.")); // Rejeita a conexão se o token não for enviado
  }

  // Aqui você pode validar o token de forma mais avançada, como verificar no banco de dados
  next(); // Permite a conexão se o token for válido
});

server.listen(3001, () => {
  console.log("Socket.IO server listening on port 3001");
});

// Evento de conexão
io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);
  addPlayer(socket.id); // Somente jogadores autenticados devem ser adicionados

  // Envia a lista inicial de jogadores para todos os clientes conectados
  io.emit("updatePlayers", getPlayerList());

  // Gerencia atualizações de jogadores
  socket.on("playerPosition", ({ position, rotation, velocity }) => {
    updatePlayer(socket.id, position, rotation, velocity);
    console.log("Lista atualizada de jogadores:", getPlayerList());
    io.emit("updatePlayers", getPlayerList());
  });

  // Remove jogador ao desconectar
  socket.on("disconnect", () => {
    removePlayer(socket.id);
    console.log(`Player disconnected: ${socket.id}`);
    io.emit("updatePlayers", getPlayerList());
  });
});

console.log("Socket.IO server is running.");
