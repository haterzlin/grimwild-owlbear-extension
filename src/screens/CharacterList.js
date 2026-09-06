import {
  buildCharacterCreatePatch,
  buildCharacterRemovePatch,
  createEmptyCharacter,
  getCharacterRowViewModel
} from "../domain/characters.js";
import { writeSceneMetadata } from "../core/metadata.js";

/**
 * @typedef {Object} CharacterListDependencies
 * @property {{ jsx: Function, jsxs: Function }} jsxRuntime
 * @property {Object} obr
 * @property {Object} styles
 * @property {(base: string, extras?: Object<string, boolean>) => string} classNames
 * @property {{ logo: string, dividerPrimary: string }} assets
 * @property {() => Object<string, string>} getPathAssets
 */

/**
 * @param {CharacterListDependencies} dependencies
 * @returns {{ CharacterList: Function, CharacterRow: Function }}
 */
export function createCharacterListScreens(dependencies) {
  const {
    jsxRuntime,
    obr,
    styles,
    classNames,
    assets,
    getPathAssets
  } = dependencies;
  const { jsx, jsxs } = jsxRuntime;

  const writePatch = patch => {
    writeSceneMetadata(obr.scene, patch);
  };

  const CharacterRow = ({ player, onRemove, onOpen }) => {
    const viewModel = getCharacterRowViewModel(player, getPathAssets());

    return jsx("div", {
      className: classNames(styles.fieldContainer),
      style: {
        flexDirection: "row"
      },
      children: jsxs("div", {
        className: styles.characterRow,
        children: [
          viewModel.artSrc ? jsx("img", {
            src: viewModel.artSrc,
            height: 40
          }) : jsx("div", {
            style: {
              width: 40,
              height: 40
            }
          }),
          jsx("div", {
            className: styles.fieldLabel,
            children: "PC: "
          }),
          jsx("input", {
            className: styles.field,
            value: viewModel.name,
            readOnly: true,
            style: {
              width: 140
            }
          }),
          jsx("div", {
            className: styles.fieldLabel,
            children: "Path: "
          }),
          jsx("div", {
            className: styles.header,
            style: {
              width: 100
            },
            children: viewModel.pathLabel
          }),
          jsx("button", {
            className: styles.statButton,
            style: {
              width: 40,
              marginLeft: "auto"
            },
            onClick: () => {
              onOpen();
            },
            children: "Open"
          }),
          jsx("button", {
            className: styles.statButton,
            style: {
              width: "0.75rem",
              height: "0.75rem"
            },
            onClick: () => {
              onRemove();
            },
            children: "×"
          })
        ]
      })
    });
  };

  const CharacterList = ({ playerList, hasUnsupportedCharacters, onOpen }) => {
    const handleCreateCharacter = async () => {
      const character = createEmptyCharacter();
      const metadata = await obr.scene.getMetadata();
      writePatch(buildCharacterCreatePatch(metadata, character));
    };

    const handleRemoveCharacter = async characterId => {
      const metadata = await obr.scene.getMetadata();
      if (confirm("Are you sure you want to delete the character?") === true) {
        writePatch(buildCharacterRemovePatch(metadata, characterId));
      }
    };

    return jsx("div", {
      className: classNames(styles.scrollable, styles.Sheet),
      style: {
        height: 590,
        padding: "1rem"
      },
      children: jsxs("div", {
        className: classNames(styles.fieldColumn),
        children: [
          jsxs("div", {
            className: styles.fieldRow,
            style: {
              alignItems: "center",
              justifyContent: "space-between"
            },
            children: [
              jsx("img", {
                src: assets.logo,
                className: styles.logo
              }),
              jsx("div", {
                className: styles.header,
                children: "CHARACTER LIST"
              }),
              jsx("button", {
                onClick: () => {
                  handleCreateCharacter();
                },
                style: {
                  height: 30
                },
                children: "Add Character"
              })
            ]
          }),
          jsx("img", {
            src: assets.dividerPrimary
          }),
          hasUnsupportedCharacters && jsx("div", {
            children: "Some saved characters are unsupported. Recreate them for CE Preview 5.2."
          }),
          playerList.map(player => jsx(CharacterRow, {
            player,
            onRemove: () => {
              handleRemoveCharacter(player.id);
            },
            onOpen: () => {
              onOpen(player);
            }
          }, player.id))
        ]
      })
    });
  };

  return {
    CharacterList,
    CharacterRow
  };
}
