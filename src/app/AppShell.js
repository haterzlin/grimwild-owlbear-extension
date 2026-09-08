import {
  DEFAULT_GM_DATA,
  buildLocalMetadataBackup,
  getChatStateFromMetadata,
  getCharactersFromMetadata,
  getPoolsFromMetadata,
  getRestoreMetadataPatch,
  mergeCharacterUpdate,
  writeSceneMetadata
} from "../core/metadata.js";
import {
  APP_SCREENS,
  getVisiblePanels,
  hydrateAppShell,
  openCharacterFromList,
  openChatPopover,
  scrollChatboxToEnd,
  showChatScreen,
  showPoolsScreen,
  syncAppShellFromMetadata
} from "../core/app-shell-state.js";
import { getCharacterGroupsFromMetadata } from "../domain/characters.js";

const characterSnapshot = character => {
  if (!character) return null;
  const { lastEdit, ...snapshot } = character;
  return snapshot;
};

const charactersMatch = (left, right) => JSON.stringify(characterSnapshot(left)) === JSON.stringify(characterSnapshot(right));

/**
 * @typedef {Object} AppShellDependencies
 * @property {typeof import("../contracts/index.js")} [contracts]
 * @property {{ jsx: Function, jsxs: Function, Fragment: symbol|string }} jsxRuntime
 * @property {{ useEffect: Function, useState: Function }} React
 * @property {Object} obr
 * @property {Object} styles
 * @property {(base: string, extras?: Object<string, boolean>) => string} classNames
 * @property {() => Object<string, Object>} [getPathsById]
 * @property {import("../contracts/app.js").AppRouteMode} routeMode
 * @property {{
 *   CharacterSheet: Function,
 *   PathScreen: Function,
  *   CharacterList: Function,
 *   CharacterRow?: Function,
 *   PoolsScreen: Function,
 *   ChatScreen: Function
 * }} screens
 */

/**
 * Build the source-owned top-level Grimwild app shell while still reusing the
 * current recovered screen implementations as child components.
 *
 * @param {AppShellDependencies} dependencies
 * @returns {Function}
 */
export default function createAppShell(dependencies) {
  const {
    jsxRuntime,
    React,
    obr,
    styles,
    classNames,
    screens,
    getPathsById = () => ({}),
    routeMode
  } = dependencies;
  const { jsx, jsxs, Fragment } = jsxRuntime;
  const {
    CharacterSheet,
    PathScreen,
    CharacterList,
    PoolsScreen,
    ChatScreen
  } = screens;

  const writePatch = patch => {
    writeSceneMetadata(obr.scene, patch);
  };

  return function AppShell() {
    const isChatPopover = routeMode === "chatpopover";
    const [isReady, setReady] = React.useState(false);
    const [unreadCount, setUnreadCount] = React.useState(0);
    const [playerName, setPlayerName] = React.useState("");
    const [playerId, setPlayerId] = React.useState("");
    const [role, setRole] = React.useState("PLAYER");
    const [chatEntries, setChatEntries] = React.useState([]);
    const [metadataChatEntries, setMetadataChatEntries] = React.useState([]);
    const [myChatEntries, setMyChatEntries] = React.useState([]);
    const [cookiesUnavailable, setCookiesUnavailable] = React.useState(false);
    const [selectedCharacter, setSelectedCharacter] = React.useState(null);
    const [pendingCharacterSaveTimeout, setPendingCharacterSaveTimeout] = React.useState(null);
    const [gmData, setGmData] = React.useState(DEFAULT_GM_DATA);
    const [currentScreen, setCurrentScreen] = React.useState(APP_SCREENS.CHAT);
    const [characters, setCharacters] = React.useState([]);
    const [hasUnsupportedCharacters, setHasUnsupportedCharacters] = React.useState(false);
    const [pools, setPools] = React.useState([]);
    const currentScreenRef = React.useRef(currentScreen);
    const selectedCharacterRef = React.useRef(selectedCharacter);
    const characterUpdateSequence = React.useRef(0);
    const latestCharacterUpdate = React.useRef(null);
    const lastChatEntryId = React.useRef(null);
    const didInitializeChat = React.useRef(false);

    React.useEffect(() => {
      currentScreenRef.current = currentScreen;
    }, [currentScreen]);

    React.useEffect(() => {
      selectedCharacterRef.current = selectedCharacter;
    }, [selectedCharacter]);

    React.useEffect(() => {
      if (!selectedCharacter) return;
      if (pendingCharacterSaveTimeout) return;

      const nextSelectedCharacter = characters.find(character => character.id === selectedCharacter.id) ?? null;

      const latestUpdate = latestCharacterUpdate.current;
      if (latestUpdate?.character.id === selectedCharacter.id && !charactersMatch(nextSelectedCharacter, latestUpdate.character)) {
        return;
      }

      if (!nextSelectedCharacter) {
        setSelectedCharacter(null);
        return;
      }

      if (nextSelectedCharacter !== selectedCharacter) {
        setSelectedCharacter(nextSelectedCharacter);
      }
    }, [characters, pendingCharacterSaveTimeout, selectedCharacter]);

    const loadCharacters = async metadata => {
      const groups = getCharacterGroupsFromMetadata(metadata);
      const pathsById = getPathsById();
      const importableCharacters = groups.importableCharacters.filter(character => {
        const pathId = pathsById[character.path] ? character.path : character.path?.toLowerCase();
        return Boolean(pathsById[pathId]);
      });
      setHasUnsupportedCharacters(groups.hiddenCharacters.length > 0);
      return [ ...groups.supportedCharacters, ...importableCharacters ];
    };

    const loadPools = async metadata => getPoolsFromMetadata(metadata);

    const loadChat = async metadata => {
      const ownPlayerId = await obr.player.getId();
      setPlayerId(ownPlayerId);

      const {
        allEntries,
        myEntries
      } = getChatStateFromMetadata(metadata, ownPlayerId);

      setMyChatEntries(myEntries);

      return allEntries;
    };

    const flushSelectedCharacter = async (character, updateId) => {
      if (!character) return;

      const metadata = await obr.scene.getMetadata();
      if (updateId !== characterUpdateSequence.current) {
        return;
      }
      writePatch(mergeCharacterUpdate(metadata, character, playerId));
    };

    const updateSelectedCharacter = character => {
      if (pendingCharacterSaveTimeout) clearTimeout(pendingCharacterSaveTimeout);

      const updateId = characterUpdateSequence.current + 1;
      characterUpdateSequence.current = updateId;
      latestCharacterUpdate.current = { updateId, character };
      const timeout = setTimeout(() => {
        flushSelectedCharacter(character, updateId);
      }, 500);

      setPendingCharacterSaveTimeout(timeout);
      setSelectedCharacter(character);
    };

    const backupLocalMetadata = async () => {
      const metadata = await obr.scene.getMetadata();
      const backup = buildLocalMetadataBackup(obr.room.id, metadata);
      localStorage.setItem("grimwild.extension/metadata", JSON.stringify(backup));
    };

    const restoreLocalMetadata = async () => {
      const backupString = localStorage.getItem("grimwild.extension/metadata");
      const currentMetadata = await obr.scene.getMetadata();
      const patch = getRestoreMetadataPatch(obr.room.id, backupString, currentMetadata);
      if (patch) writePatch(patch);
    };

    const syncFromMetadata = async metadata => {
      const syncedCharacters = getCharactersFromMetadata(metadata);
      await syncAppShellFromMetadata({
        metadata,
        loadCharacters,
        loadPools,
        loadChat,
        setCharacters,
        setPools,
        setChat: setMetadataChatEntries,
        setGmData
      });

      const latestUpdate = latestCharacterUpdate.current;
      const syncedCharacter = latestUpdate && syncedCharacters.find(character => character.id === latestUpdate.character.id);
      if (latestUpdate && charactersMatch(syncedCharacter, latestUpdate.character)) {
        latestCharacterUpdate.current = null;
        setPendingCharacterSaveTimeout(null);
      }
    };

    React.useEffect(() => {
      let isDisposed = false;
      let didHydrateReadyScene = false;
      let stopSceneReadyChange;
      let stopPlayerChange;

      const runHydrate = async () => {
        await hydrateAppShell({
          obr,
          restoreLocalMetadata,
          syncFromMetadata,
          setReady,
          setPlayerName,
          setPlayerId,
          setRole
        });
      };

      obr.onReady(async () => {
        if (isDisposed) return;

        stopSceneReadyChange = obr.scene.onReadyChange(async sceneReady => {
          if (isDisposed) return;

          if (sceneReady) {
            didHydrateReadyScene = true;
            await runHydrate();
          } else {
            didHydrateReadyScene = false;
            setReady(false);
            setChatEntries([]);
          }
        });

        if (await obr.scene.isReady() && !didHydrateReadyScene) {
          didHydrateReadyScene = true;
          await runHydrate();
        }

        if (isDisposed) return;
        stopPlayerChange = obr.player.onChange(async () => {
          if (isDisposed) return;
          setPlayerName(await obr.player.getName());
        });
      });

      try {
        localStorage.getItem("grimwild.extension/rolldata");
      } catch {
        setCookiesUnavailable(true);
      }

      return () => {
        isDisposed = true;
        if (typeof stopSceneReadyChange === "function") stopSceneReadyChange();
        if (typeof stopPlayerChange === "function") stopPlayerChange();
      };
    }, []);

    React.useEffect(() => {
      if (metadataChatEntries.length !== chatEntries.length) {
        setChatEntries(metadataChatEntries);
        scrollChatboxToEnd();
      }
    }, [metadataChatEntries, chatEntries.length]);

    React.useEffect(() => {
      if (!isReady) return;

      (async () => {
        const metadata = await obr.scene.getMetadata();
        await syncFromMetadata(metadata);
      })();

      const stopMetadataChange = obr.scene.onMetadataChange(async metadata => {
        await syncFromMetadata(metadata);
        if (await obr.player.getRole() === "GM") await backupLocalMetadata();
      });

      const stopOpenChange = obr.action.onOpenChange(async isOpen => {
        if (isOpen && currentScreenRef.current === APP_SCREENS.CHAT && selectedCharacterRef.current) {
          setUnreadCount(0);
        }
      });

      try {
        localStorage.getItem("grimwild.extension/rolldata");
      } catch {
        setCookiesUnavailable(true);
      }

      return () => {
        if (typeof stopMetadataChange === "function") stopMetadataChange();
        if (typeof stopOpenChange === "function") stopOpenChange();
      };
    }, [isReady]);

    React.useEffect(() => {
      if (unreadCount > 0) {
        obr.action.setBadgeText(`${unreadCount}`);
      } else {
        obr.action.setBadgeText(undefined);
      }
    }, [unreadCount, isReady]);

    React.useEffect(() => {
      if (!isReady) return;

      (async () => {
        const newestEntry = chatEntries[chatEntries.length - 1];
        if (!newestEntry) {
          didInitializeChat.current = true;
          lastChatEntryId.current = null;
          return;
        }

        if (!didInitializeChat.current) {
          didInitializeChat.current = true;
          lastChatEntryId.current = newestEntry.id;
          return;
        }

        if (newestEntry.id === lastChatEntryId.current) return;
        lastChatEntryId.current = newestEntry.id;

        if (!await obr.action.isOpen() || currentScreen !== APP_SCREENS.CHAT) {
          setUnreadCount(count => count + 1);
        }
      })();
    }, [chatEntries, currentScreen, isReady, obr.action]);

    if (cookiesUnavailable) return "Cookies not enabled";

    if (!isReady) {
      return jsx("div", {
        className: styles.global,
        children: jsxs("div", {
          className: classNames(styles.scrollable, styles.Sheet),
          children: [
            jsx("div", {
              className: styles.header,
              children: "No Scene found."
            }),
            jsx("div", {
              children: "You need to load a scene to start adding/updating characters. If a scene is already loaded, kindly refresh the page."
            })
          ]
        })
      });
    }

    if (isChatPopover) {
      return jsxs("div", {
        className: styles.global,
        children: [
          jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              padding: "0.5rem"
            },
            children: [
              jsx("div", {
                className: styles.header,
                children: "Chat"
              }),
              jsx("button", {
                className: styles.chatCloseButton,
                onClick: () => {
                  obr.popover.close("chat/popover");
                },
                children: "Close"
              })
            ]
          }),
          jsx(ChatScreen, {
            chat: chatEntries,
            role,
            myChat: myChatEntries,
            id: playerId,
            pools,
            player: selectedCharacter ? selectedCharacter.name : playerName,
            gmData,
            players: characters,
            chatOnly: isChatPopover
          })
        ]
      });
    }

    const visiblePanels = getVisiblePanels({
      currentScreen,
      selectedCharacter
    });

    const openPopover = async () => {
      await openChatPopover(obr);
    };

    return jsxs("div", {
      className: styles.global,
      children: [
        visiblePanels.showMenu && jsxs("div", {
          className: classNames(styles.fixedMenu),
          children: [
            jsx("button", {
              className: classNames(styles.menuButton, {
                [styles.menuButtonSelected]: currentScreen === APP_SCREENS.CHARACTER
              }),
              onClick: () => {
                setCurrentScreen(APP_SCREENS.CHARACTER);
              },
              children: "Character"
            }),
            jsx("button", {
              className: classNames(styles.menuButton, {
                [styles.menuButtonSelected]: currentScreen === APP_SCREENS.PATH
              }),
              onClick: () => {
                setCurrentScreen(APP_SCREENS.PATH);
              },
              children: "Path"
            }),
            jsx("button", {
              className: classNames(styles.menuButton, {
                [styles.menuButtonSelected]: currentScreen === APP_SCREENS.POOL
              }),
              onClick: () => {
                showPoolsScreen(setCurrentScreen);
              },
              children: "Pools"
            }),
            jsxs("button", {
              className: classNames(styles.menuButton, {
                [styles.menuButtonSelected]: currentScreen === APP_SCREENS.CHAT
              }),
              onClick: () => {
                showChatScreen(setCurrentScreen, setUnreadCount);
              },
              children: [ "Chat ", unreadCount ? `(${unreadCount})` : "" ]
            }),
            jsx("button", {
              className: classNames(styles.menuButton),
              style: {
                marginLeft: "auto",
                width: "3rem"
              },
              onClick: () => {
                setSelectedCharacter(null);
              },
              children: "Close"
            })
          ]
        }),
        visiblePanels.showCharacter && jsx(CharacterSheet, {
          player: selectedCharacter,
          updatePlayer: updateSelectedCharacter,
          myChat: myChatEntries,
          id: playerId,
          onRoll: () => {
            setCurrentScreen(APP_SCREENS.CHAT);
          }
        }),
        visiblePanels.showPath && jsx(PathScreen, {
          player: selectedCharacter,
          updatePlayer: updateSelectedCharacter,
          myChat: myChatEntries,
          id: playerId
        }),
        visiblePanels.showCharacterList && jsx(CharacterList, {
          playerList: characters,
          hasUnsupportedCharacters,
          onOpen: character => {
            openCharacterFromList(setCurrentScreen, setSelectedCharacter, character);
          }
        }),
        visiblePanels.showPools && jsx(PoolsScreen, {
          chat: chatEntries,
          role,
          myChat: myChatEntries,
          id: playerId,
          pools,
          player: selectedCharacter.name,
          gmData,
          players: characters,
          chatOnly: isChatPopover
        }),
        visiblePanels.showChat && jsxs(Fragment, {
          children: [
            jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                paddingTop: "0.5rem",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem"
              },
              children: [
                jsx("div", {
                  className: styles.header,
                  children: "Chat"
                }),
                jsx("button", {
                  className: styles.chatCloseButton,
                  onClick: () => {
                    openPopover();
                  },
                  children: "Popover"
                })
              ]
            }),
            jsx(ChatScreen, {
              chat: chatEntries,
              role,
              myChat: myChatEntries,
              id: playerId,
              pools,
              player: selectedCharacter.name,
              gmData,
              players: characters,
              chatOnly: isChatPopover
            })
          ]
        })
      ]
    });
  };
}
