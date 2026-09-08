import {
  buildConvertedCharacter,
  buildCharacterCreatePatch,
  buildCharacterRemovePatch,
  createEmptyCharacter,
  getCharacterRowViewModel,
  getNextCharacterId,
  isImportableLegacyCharacter,
  isSupportedCharacter
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
 * @property {() => Object<string, Object>} getPathsById
 * @property {() => Object[]} getBackgroundTalents
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
    getPathAssets,
    getPathsById,
    getBackgroundTalents
  } = dependencies;
  const { jsx, jsxs } = jsxRuntime;

  const writePatch = patch => {
    writeSceneMetadata(obr.scene, patch);
  };

  const CharacterRow = ({ player, onRemove, onOpen, onImport }) => {
    const viewModel = getCharacterRowViewModel(player, getPathAssets());
    const isLegacy = isImportableLegacyCharacter(player);

    return jsx("div", {
      className: classNames(styles.fieldContainer),
      style: {
        flexDirection: "row",
        alignItems: "center"
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
            style: {
              lineHeight: "1.25rem"
            },
            children: "PC: "
          }),
          jsx("input", {
            className: styles.field,
            value: viewModel.name,
            readOnly: true,
            style: {
              width: 120,
              minWidth: 0,
              lineHeight: "1.25rem"
            }
          }),
          jsx("div", {
            className: styles.fieldLabel,
            style: {
              lineHeight: "1.25rem"
            },
            children: "Path: "
          }),
          jsx("div", {
            className: styles.header,
            style: {
              width: 110,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "0.75rem",
              lineHeight: "1.25rem",
              transform: "translateY(1.5px)"
            },
            children: viewModel.pathLabel
          }),
          isLegacy ? jsx("button", {
            className: styles.statButton,
            style: {
              marginLeft: "auto",
              flexShrink: 0
            },
            onClick: () => {
              onImport();
            },
            children: "Import"
          }) : jsx("button", {
            className: styles.statButton,
            style: {
              width: 40,
              marginLeft: "auto",
              flexShrink: 0
            },
            onClick: () => {
              onOpen();
            },
            children: "Open"
          }),
          !isLegacy && jsx("button", {
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

  const CharacterList = ({ playerList, onOpen }) => {
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

    const handleImportCharacter = async oldCharacter => {
      const metadata = await obr.scene.getMetadata();
      const converted = buildConvertedCharacter(oldCharacter, {
        id: getNextCharacterId(metadata),
        pathsById: getPathsById(),
        backgroundTalents: getBackgroundTalents()
      });
      if (converted) writePatch(buildCharacterCreatePatch(metadata, converted));
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
              jsxs("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                },
                children: [
                  jsx("img", {
                    src: assets.logo,
                    className: styles.logo
                  }),
                  jsx("div", {
                    style: {
                      fontSize: "0.65rem",
                      marginTop: "-0.15rem"
                    },
                    children: "Community Edition"
                  })
                ]
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
          playerList.map(player => jsx(CharacterRow, {
            player,
            onRemove: isSupportedCharacter(player) ? () => {
              handleRemoveCharacter(player.id);
            } : null,
            onOpen: () => {
              onOpen(player);
            },
            onImport: () => {
              handleImportCharacter(player);
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
