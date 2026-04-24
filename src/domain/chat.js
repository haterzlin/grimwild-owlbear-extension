/**
 * Canonical source-facing chat domain API.
 * The current implementation delegates to transitional helpers in `src-like/`.
 */

export {
  buildChatMessageEntry,
  buildChatMessagePatch,
  buildClearChatPatch
} from "../../src-like/chat.js";
