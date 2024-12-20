/**
 * socket.js
 * @description :: socket connection with server
 */

const User = require('../../model/User'); // Importa o modelo User
const dbService = require('../../utils/dbService');
const mongoose = require('mongoose'); // Importa o mongoose para usar ObjectId
const ObjectId = mongoose.Types.ObjectId; // Obtém o tipo ObjectId do mongoose

module.exports = function (httpServer) {
  const io = require('socket.io')(httpServer, { cors: { origin: '*' } });

  /**
   * Calcula jogadores visíveis com base na posição e distância de renderização
   */
  const getVisiblePlayers = async (userId, position, renderDistance) => {
    const users = await dbService.findMany(User, { _id: { $ne: userId } }); // Encontra todos os usuários, exceto o atual
    const visiblePlayers = users.filter((user) => {
      const distance = Math.sqrt(
        Math.pow(user.x - position[0], 2) +
        Math.pow(user.y - position[1], 2) +
        Math.pow(user.z - position[2], 2)
      );
      return distance <= renderDistance; // Retorna apenas os jogadores dentro do alcance
    });

    return visiblePlayers.map((user) => ({
      id: user._id,
      position: [user.x, user.y, user.z],
      rotation: [user.rx, user.ry, user.rz],
    }));
  };

  io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    /**
     * Atualiza a posição e rotação do jogador
     */
    socket.on("updatePosition", async ({ userId, position, rotation }) => {
      try {
        console.log("Received updatePosition:", { userId, position, rotation });
    
        // Verifica se o userId é um ObjectId válido
        if (!ObjectId.isValid(userId)) {
          console.error(`Invalid userId: ${userId}`);
          return;
        }
    
        const updateData = {
          x: position[0],
          y: position[1],
          z: position[2],
          rx: rotation[0],
          ry: rotation[1],
          rz: rotation[2],
        };
    
        await dbService.updateOne(User, { _id: new ObjectId(userId) }, { $set: updateData });
        console.log(`Position updated for user: ${userId}`);
      } catch (error) {
        console.error('Error updating position:', error);
      }
    });
    
    /**
     * Retorna lista de usuários visíveis com base na posição e distância
     */
    socket.on("getVisiblePlayers", async ({ userId, position, renderDistance }, callback) => {
      try {
        if (!Array.isArray(position) || position.length !== 3) {
          return callback({ success: false, message: "Invalid position format." });
        }

        const visiblePlayers = await getVisiblePlayers(userId, position, renderDistance);
        callback({ success: true, data: visiblePlayers });
      } catch (error) {
        console.error("Error fetching visible players:", error);
        callback({ success: false, message: "Failed to fetch visible players." });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.id}`);
    });
  });
};
