/**
 * Canonical source-facing metadata API for the reconstructed runtime.
 * The current implementation delegates to transitional helpers in `src-like/`.
 */

export {
  CHARACTER_METADATA_KEY,
  CHAT_METADATA_KEY,
  DATE_METADATA_KEY,
  DEFAULT_GM_DATA,
  GM_METADATA_KEY,
  POOL_METADATA_KEY,
  buildLocalMetadataBackup,
  getChatStateFromMetadata,
  getCharactersFromMetadata,
  getPoolsFromMetadata,
  getRestoreMetadataPatch,
  mergeCharacterUpdate,
  valuesFromMetadataRecord,
  writeSceneMetadata
} from "../../src-like/metadata.js";
