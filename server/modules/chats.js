const chats = new Map();

export const createChat = (id, name) => {
  if (!chats.has(id)) {
    chats.set(id, { id, name, messages: [] });
    console.log(`Chat created: ${name} (${id})`);
  }
};

export const addMessageToChat = (chatId, message) => {
  if (chats.has(chatId)) {
    chats.get(chatId).messages.push(message);
    console.log(`Message added to chat ${chatId}:`, message);
    return true;
  }
  console.log(`Chat ${chatId} not found.`);
  return false;
};

export const getChatMessages = (chatId) => {
  if (chats.has(chatId)) {
    return chats.get(chatId).messages;
  }
  return [];
};

export const getChatList = () => Array.from(chats.values());
