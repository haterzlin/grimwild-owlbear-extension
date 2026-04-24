/**
 * Canonical source-facing app-shell helpers for the reconstructed runtime.
 * The current implementation delegates to transitional helpers in `src-like/`.
 */

export {
  APP_SCREENS,
  getVisiblePanels,
  hydrateAppShell,
  isChatPopoverLocation,
  openCharacterFromList,
  openChatPopover,
  scrollChatboxToEnd,
  showChatScreen,
  showPoolsScreen,
  syncAppShellFromMetadata
} from "../../src-like/app-shell.js";
