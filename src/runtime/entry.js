import { loadExternalData } from "../core/data-loader.js";
import createAppShell from "../app/AppShell.js";
import { createCharacterListScreens } from "../screens/CharacterList.js";
import createCharacterSheetScreen from "../screens/CharacterSheet.js";
import { createPathScreens } from "../screens/PathScreen.js";
import { createPoolsAndChatScreens } from "../screens/PoolsAndChat.js";
import { createRoot, jsxRuntime, React } from "../vendor/react-runtime.js";
import resolveObr from "./obr.js";
import createRollDice from "./rolls.js";
import classNames from "./class-names.js";
import styles from "./styles.js";
import { APP_ASSETS, DEFAULT_PATH_ASSETS } from "./assets.js";

let pathAssets = {
  ...DEFAULT_PATH_ASSETS
};
let pathsById = {};

const obr = resolveObr();
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

const AppShell = createAppShell({
  React,
  jsxRuntime,
  obr,
  styles,
  classNames,
  screens: {
    CharacterSheet,
    PathScreen,
    CharacterList,
    CharacterRow,
    PoolsScreen,
    ChatScreen
  }
});

async function loadRuntimeData() {
  try {
    const {
      assets: externalAssets,
      paths: externalPaths
    } = await loadExternalData({
      currentPaths: pathsById
    });

    if (externalAssets && typeof externalAssets === "object") pathAssets = externalAssets;
    if (externalPaths && Object.keys(externalPaths).length > 0) pathsById = externalPaths;
  } catch (error) {
    console.warn("Failed to load external Grimwild data. Using local asset defaults.", error);
  }
}

loadRuntimeData().finally(() => {
  createRoot(document.getElementById("root")).render(jsxRuntime.jsx(React.StrictMode, {
    children: jsxRuntime.jsx(AppShell, {})
  }));
});
