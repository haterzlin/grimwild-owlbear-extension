/**
 * Canonical source-facing character domain API.
 * The current implementation delegates to transitional helpers in `src-like/`.
 */

export {
  buildCharacterCreatePatch,
  buildCharacterRemovePatch,
  createEmptyCharacter,
  getCharacterMetadataRecord,
  getCharacterRowViewModel
} from "../../src-like/character-model.js";
