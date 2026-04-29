import { loadExternalData } from "../core/data-loader.js";
import createAppShell from "../app/AppShell.js";
import { createCharacterListScreens } from "../screens/CharacterList.js";
import createCharacterSheetScreen from "../screens/CharacterSheet.js";
import { createPathScreens } from "../screens/PathScreen.js";
import { createPoolsAndChatScreens } from "../screens/PoolsAndChat.js";
import { createRoot, jsxRuntime, React } from "./react-runtime.js";
import resolveObr from "./obr.js";
import createRollDice from "./rolls.js";
import classNames from "./class-names.js";
import styles from "./styles.js";
import { APP_ASSETS, DEFAULT_PATH_ASSETS } from "./assets.js";
/**
 * @typedef {import("../contracts/app.js").AppRouteMode} AppRouteMode
 */

const DEFAULT_PATH_KEYS = Object.keys(DEFAULT_PATH_ASSETS);

let pathAssets = {
  ...DEFAULT_PATH_ASSETS
};
let pathsById = {};

// The entry modules choose the intended route mode, but Vite dev serving can
// still resolve /chatpopover through the main HTML entry. Keep this path-based
// override so the popup renders the chat-only shell even in that case.
const resolveRouteModeFromLocation = preferredRouteMode => {
  if (window.location.pathname.startsWith("/chatpopover")) return "chatpopover";
  return preferredRouteMode;
};

const createRuntimeScreens = obr => {
  const rollDice = createRollDice(obr);

  const { CharacterList, CharacterRow } = createCharacterListScreens({
    jsxRuntime,
    obr,
    styles,
    classNames,
    assets: {
      logo: APP_ASSETS.logo,
      dividerPrimary: APP_ASSETS.dividerPrimary
    },
    getPathAssets: () => pathAssets
  });

  const CharacterSheet = createCharacterSheetScreen({
    jsxRuntime,
    styles,
    classNames,
    assets: {
      dividerPrimary: APP_ASSETS.dividerPrimary,
      dividerSecondary: APP_ASSETS.dividerSecondary
    },
    rollDice
  });

  const { PathScreen } = createPathScreens({
    jsxRuntime,
    React,
    obr,
    styles,
    classNames,
    assets: {
      dividerPrimary: APP_ASSETS.dividerPrimary,
      dividerSecondary: APP_ASSETS.dividerSecondary
    },
    getPathAssets: () => pathAssets,
    getPathsById: () => pathsById
  });

  const { PoolsScreen, ChatScreen } = createPoolsAndChatScreens({
    jsxRuntime,
    React,
    obr,
    styles,
    classNames,
    assets: {
      dividerPrimary: APP_ASSETS.dividerPrimary,
      diceFaces: APP_ASSETS.diceFaces,
      thornFaces: APP_ASSETS.thornFaces
    },
    rollDice
  });

  return {
    CharacterList,
    CharacterRow,
    CharacterSheet,
    PathScreen,
    PoolsScreen,
    ChatScreen
  };
};

async function loadRuntimeData() {
  try {
    const {
      paths: externalPaths
    } = await loadExternalData({
      pathKeys: DEFAULT_PATH_KEYS
    });

    if (externalPaths && Object.keys(externalPaths).length > 0) pathsById = externalPaths;
  } catch (error) {
    console.warn("Failed to load external Grimwild path data.", error);
  }
}

/**
 * @param {{ routeMode: AppRouteMode }} options
 * @returns {Promise<void>}
 */
export async function bootRuntime({ routeMode }) {
  const obrClient = globalThis.__grimwild_test_obr ? null : resolveObr();
  const obr = obrClient?.obr ?? globalThis.__grimwild_test_obr;
  const resolvedRouteMode = resolveRouteModeFromLocation(routeMode);
  const screens = createRuntimeScreens(obr);
  const AppShell = createAppShell({
    React,
    jsxRuntime,
    obr,
    styles,
    classNames,
    routeMode: resolvedRouteMode,
    screens
  });

  await loadRuntimeData();

  const root = createRoot(document.getElementById("root"));
  root.render(jsxRuntime.jsx(React.StrictMode, {
    children: jsxRuntime.jsx(AppShell, {})
  }));

  return () => {
    root.unmount();
    obrClient?.messageBus.destroy();
  };
}
