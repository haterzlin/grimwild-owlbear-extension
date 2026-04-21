import { CHAT_METADATA_KEY } from "./metadata.js";

export const buildChatMessageEntry = ({ user, message }) => ({
  id: Date.now(),
  user,
  message: message.trim()
});

export const buildChatMessagePatch = ({ metadata, ownPlayerId, myChatEntries, user, message }) => {
  const chatRecord = {
    ...(metadata?.[CHAT_METADATA_KEY] ?? {})
  };

  chatRecord[ownPlayerId] = [
    ...myChatEntries,
    buildChatMessageEntry({
      user,
      message
    })
  ];

  return {
    [CHAT_METADATA_KEY]: chatRecord
  };
};

export const buildClearChatPatch = metadata => {
  const currentRecord = metadata?.[CHAT_METADATA_KEY] ?? {};
  const nextRecord = {
    ...currentRecord
  };

  Object.keys(nextRecord).forEach(playerId => {
    nextRecord[playerId] = [];
  });

  return {
    [CHAT_METADATA_KEY]: nextRecord
  };
};
