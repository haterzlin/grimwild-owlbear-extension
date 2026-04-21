import { GM_METADATA_KEY } from "./metadata.js";

export const APP_SCREENS = {
  CHARACTER: "character",
  PATH: "path",
  POOL: "pool",
  CHAT: "chat"
};

export const isChatPopoverLocation = href => href.indexOf("/chatpopover") > 1;

export const scrollChatboxToEnd = (delay = 100) => {
  setTimeout(() => {
    const chatbox = document.getElementById("chatbox");
    if (chatbox) chatbox.scrollTop = chatbox.scrollHeight;
  }, delay);
};

export const syncAppShellFromMetadata = async ({
  metadata,
  loadCharacters,
  loadPools,
  loadChat,
  setCharacters,
  setPools,
  setChat,
  setGmData
}) => {
  const characters = await loadCharacters(metadata);
  setCharacters(characters);

  const pools = await loadPools(metadata);
  setPools(pools);

  const chatEntries = await loadChat(metadata);
  setChat(chatEntries);

  const gmData = metadata?.[GM_METADATA_KEY];
  if (gmData) setGmData(gmData);
};

export const hydrateAppShell = async ({
  obr,
  restoreLocalMetadata,
  syncFromMetadata,
  setReady,
  setPlayerName,
  setPlayerId,
  setRole
}) => {
  if (await obr.player.getRole() === "GM") await restoreLocalMetadata();

  const metadata = await obr.scene.getMetadata();
  await syncFromMetadata(metadata);

  setReady(true);
  scrollChatboxToEnd();
  obr.action.setBadgeBackgroundColor("orange");

  setPlayerName(await obr.player.getName());
  setPlayerId(await obr.player.getId());
  setRole(await obr.player.getRole());

  obr.player.onChange(async () => {
    setPlayerName(await obr.player.getName());
  });
};

export const openChatPopover = obr => obr.popover.open({
  id: "chat/popover",
  url: "/chatpopover",
  height: 600,
  width: 300,
  anchorOrigin: {
    horizontal: "RIGHT",
    vertical: "BOTTOM"
  },
  hidePaper: true,
  marginThreshold: 0,
  disableClickAway: true
});

export const showPoolsScreen = setScreen => {
  setScreen(APP_SCREENS.POOL);
  scrollChatboxToEnd(1);
};

export const showChatScreen = (setScreen, setUnreadCount) => {
  setScreen(APP_SCREENS.CHAT);
  setUnreadCount(0);
  scrollChatboxToEnd(1);
};

export const openCharacterFromList = (setScreen, setSelectedCharacter, character) => {
  setScreen(APP_SCREENS.CHARACTER);
  setSelectedCharacter(character);
};

export const getVisiblePanels = ({ currentScreen, selectedCharacter }) => ({
  showMenu: Boolean(selectedCharacter),
  showCharacterList: !selectedCharacter,
  showCharacter: currentScreen === APP_SCREENS.CHARACTER && Boolean(selectedCharacter),
  showPath: currentScreen === APP_SCREENS.PATH && Boolean(selectedCharacter),
  showPools: currentScreen === APP_SCREENS.POOL && Boolean(selectedCharacter),
  showChat: currentScreen === APP_SCREENS.CHAT && Boolean(selectedCharacter)
});
