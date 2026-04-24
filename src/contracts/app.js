/**
 * @typedef {"character" | "path" | "pool" | "chat"} AppScreen
 */

/**
 * @typedef {Object} AppShellState
 * @property {boolean} isReady
 * @property {number} unreadCount
 * @property {string} playerName
 * @property {string} playerId
 * @property {string} role
 * @property {import("./entities.js").GrimwildChatEntry[]} chatEntries
 * @property {import("./entities.js").GrimwildChatEntry[]} myChatEntries
 * @property {boolean} isChatPopover
 * @property {import("./entities.js").GrimwildCharacter|null} selectedCharacter
 * @property {ReturnType<typeof setTimeout>|null} pendingCharacterSaveTimeout
 * @property {import("./entities.js").GrimwildGmState} gmState
 * @property {boolean} cookiesUnavailable
 * @property {AppScreen} currentScreen
 * @property {import("./entities.js").GrimwildCharacter[]} characters
 * @property {import("./entities.js").GrimwildPool[]} pools
 */

/**
 * @typedef {Object} VisiblePanels
 * @property {boolean} showMenu
 * @property {boolean} showCharacterList
 * @property {boolean} showCharacter
 * @property {boolean} showPath
 * @property {boolean} showPools
 * @property {boolean} showChat
 */
