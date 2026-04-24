import { CHAT_METADATA_KEY, GM_METADATA_KEY, POOL_METADATA_KEY } from "../core/metadata.js";

export const buildSuspensePatch = (metadata, suspense) => ({
  [GM_METADATA_KEY]: {
    ...(metadata?.[GM_METADATA_KEY] ?? {}),
    suspense
  }
});

export const buildDescriptionChatEntry = ({ user, description, gmRoll = false }) => ({
  id: Date.now(),
  user,
  description,
  gmRoll
});

export const buildDescriptionChatPatch = ({ metadata, ownPlayerId, myChatEntries, user, description, gmRoll = false }) => {
  const chatRecord = {
    ...(metadata?.[CHAT_METADATA_KEY] ?? {})
  };

  chatRecord[ownPlayerId] = [
    ...myChatEntries,
    buildDescriptionChatEntry({
      user,
      description,
      gmRoll
    })
  ];

  return {
    [CHAT_METADATA_KEY]: chatRecord
  };
};

export const createPoolRecord = (value = 0, idFactory = () => Date.now()) => ({
  id: idFactory(),
  name: "",
  value: value || 0
});

export const getPoolMetadataRecord = metadata => ({
  ...(metadata?.[POOL_METADATA_KEY] ?? {})
});

export const buildPoolCreatePatch = (metadata, pool) => {
  const record = getPoolMetadataRecord(metadata);
  record[pool.id] = pool;
  return {
    [POOL_METADATA_KEY]: record
  };
};

export const buildPoolRemovePatch = (metadata, poolId) => {
  const record = getPoolMetadataRecord(metadata);
  delete record[poolId];
  return {
    [POOL_METADATA_KEY]: record
  };
};

export const buildPoolUpdatePatch = (metadata, pool, lastEdit) => {
  const record = getPoolMetadataRecord(metadata);
  record[pool.id] = {
    ...pool,
    lastEdit
  };
  return {
    [POOL_METADATA_KEY]: record
  };
};

export const buildNamedPoolRollEntry = ({ user, dice, poolName, startingValue, remainingValue, outcome }) => {
  const thornEffect = [ poolName, `${startingValue} ➜ ${remainingValue}` ];
  if (startingValue === remainingValue) thornEffect.push("Take secondary effect");

  return {
    id: Date.now(),
    user,
    dice,
    thornEffect,
    outcome
  };
};

export const buildNamedPoolRollChatPatch = ({ metadata, ownPlayerId, myChatEntries, rollEntry }) => {
  const chatRecord = {
    ...(metadata?.[CHAT_METADATA_KEY] ?? {})
  };

  chatRecord[ownPlayerId] = [ ...myChatEntries, rollEntry ];

  return {
    [CHAT_METADATA_KEY]: chatRecord
  };
};
