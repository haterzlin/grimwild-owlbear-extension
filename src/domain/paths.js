/**
 * Canonical source-facing path and talent domain API.
 * The current implementation delegates to transitional helpers in `src-like/`.
 */

export {
  addTalentToCharacter,
  assignCorePath,
  buildTalentBroadcastEntry,
  buildTalentBroadcastPatch,
  clearCorePath,
  getPathData,
  getPathIds,
  removeTalentAtIndex,
  updateCoreTalentTracker,
  updateTalentTrackerAtIndex
} from "../../src-like/path-talent.js";
