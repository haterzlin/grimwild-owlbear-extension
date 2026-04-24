/**
 * Canonical source-facing pools domain API.
 * The current implementation delegates to transitional helpers in `src-like/`.
 */

export {
  buildDescriptionChatEntry,
  buildDescriptionChatPatch,
  buildNamedPoolRollChatPatch,
  buildNamedPoolRollEntry,
  buildPoolCreatePatch,
  buildPoolRemovePatch,
  buildPoolUpdatePatch,
  buildSuspensePatch,
  createPoolRecord,
  getPoolMetadataRecord
} from "../../src-like/pools.js";
