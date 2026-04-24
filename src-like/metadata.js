// Transitional compatibility module.
// New maintained runtime work should go into src/core or src/domain instead.
export const CHARACTER_METADATA_KEY = "grimwild.character.extension/metadata";
export const POOL_METADATA_KEY = "grimwild.pool.extension/metadata";
export const CHAT_METADATA_KEY = "grimwild.extension/metadata";
export const GM_METADATA_KEY = "grimwild.gm.extension/metadata";
export const DATE_METADATA_KEY = "grimwild.date.extension/metadata";

export const DEFAULT_GM_DATA = {
  suspense: "0"
};

export const valuesFromMetadataRecord = record => {
  const source = record && typeof record === "object" ? record : {};
  return Object.keys(source).map(key => source[key]);
};

export const getCharactersFromMetadata = metadata => valuesFromMetadataRecord(metadata?.[CHARACTER_METADATA_KEY]);

export const getPoolsFromMetadata = metadata => valuesFromMetadataRecord(metadata?.[POOL_METADATA_KEY]);

export const getChatStateFromMetadata = (metadata, ownPlayerId) => {
  const chatByPlayer = metadata?.[CHAT_METADATA_KEY];
  let allEntries = [];
  let myEntries = [];

  if (chatByPlayer && typeof chatByPlayer === "object") {
    Object.keys(chatByPlayer).forEach(playerId => {
      const entries = Array.isArray(chatByPlayer[playerId]) ? chatByPlayer[playerId] : [];
      allEntries = allEntries.concat(entries);
      if (playerId === ownPlayerId) myEntries = entries;
    });
  }

  allEntries.sort((left, right) => left.id - right.id);

  return {
    allEntries,
    myEntries
  };
};

export const mergeCharacterUpdate = (metadata, character, lastEdit) => {
  const currentCharacters = {
    ...(metadata?.[CHARACTER_METADATA_KEY] ?? {})
  };

  currentCharacters[character.id] = {
    ...character,
    lastEdit
  };

  return {
    [CHARACTER_METADATA_KEY]: currentCharacters
  };
};

export const buildLocalMetadataBackup = (roomId, metadata) => ({
  room: roomId,
  dateNow: Date.now(),
  [CHARACTER_METADATA_KEY]: metadata?.[CHARACTER_METADATA_KEY],
  [POOL_METADATA_KEY]: metadata?.[POOL_METADATA_KEY],
  [CHAT_METADATA_KEY]: metadata?.[CHAT_METADATA_KEY]
});

export const getRestoreMetadataPatch = (roomId, backupString, currentMetadata) => {
  if (!backupString) return null;

  const parsedBackup = JSON.parse(backupString);
  const currentDate = currentMetadata?.[DATE_METADATA_KEY] ?? 0;

  if (parsedBackup.room !== roomId) return null;
  if (currentDate >= parsedBackup.dateNow) return null;

  return {
    ...currentMetadata,
    [CHARACTER_METADATA_KEY]: parsedBackup[CHARACTER_METADATA_KEY],
    [POOL_METADATA_KEY]: parsedBackup[POOL_METADATA_KEY],
    [CHAT_METADATA_KEY]: parsedBackup[CHAT_METADATA_KEY]
  };
};

export const writeSceneMetadata = (scene, patch) => {
  const nextMetadata = {
    ...patch,
    [DATE_METADATA_KEY]: Date.now()
  };

  scene.setMetadata(nextMetadata);
};
