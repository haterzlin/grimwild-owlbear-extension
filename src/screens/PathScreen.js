import {
  addTalentToCharacter,
  assignCorePath,
  buildTalentBroadcastPatch,
  clearCorePath,
  getPathData,
  getPathIds,
  removeTalentAtIndex,
  updateCoreTalentTracker,
  updateTalentTrackerAtIndex
} from "../domain/paths.js";
import { writeSceneMetadata } from "../core/metadata.js";
import { scrollChatboxToEnd } from "../core/app-shell-state.js";

/**
 * @typedef {Object} PathScreenDependencies
 * @property {{ Fragment: symbol|string, jsx: Function, jsxs: Function }} jsxRuntime
 * @property {{ useState: Function }} React
 * @property {Object} obr
 * @property {Object} styles
 * @property {(base: string, extras?: Object<string, boolean>) => string} classNames
 * @property {{ dividerPrimary: string, dividerSecondary: string }} assets
 * @property {() => Object<string, string>} getPathAssets
 * @property {() => Object<string, Object>} getPathsById
 * @property {() => Object[]} getBackgroundTalents
 */

/**
 * @param {PathScreenDependencies} dependencies
 * @returns {{
 *   PathScreen: Function,
 *   PathPicker: Function,
 *   CorePathView: Function,
 *   PathTalentPicker: Function,
 *   TalentCard: Function
 * }}
 */
export function createPathScreens(dependencies) {
  const {
    jsxRuntime,
    React,
    obr,
    styles,
    classNames,
    assets,
    getPathAssets,
    getPathsById,
    getBackgroundTalents
  } = dependencies;
  const { Fragment, jsx, jsxs } = jsxRuntime;

  const writePatch = patch => {
    writeSceneMetadata(obr.scene, patch);
  };

  const TalentCard = ({ talent, onSelect, onRemove, onChangeTracker, onBroadcast, isSelected }) => {
    const renderCompactTracker = (tracker, trackerIndex) => {
      if (tracker.type === "checkbox") {
        return jsx("input", {
          type: "checkbox",
          checked: tracker.checked,
          onChange: () => {
            onChangeTracker({
              ...tracker,
              checked: !tracker.checked
            }, trackerIndex);
          }
        });
      }

      if (tracker.type === "field") {
        return jsx("input", {
          className: styles.fieldStat,
          value: tracker.value1,
          onChange: event => {
            onChangeTracker({
              ...tracker,
              value1: event.target.value
            }, trackerIndex);
          }
        });
      }

      if (tracker.type === "fieldSmall") {
        return jsx("input", {
          className: styles.fieldSmall,
          value: tracker.value1,
          onChange: event => {
            onChangeTracker({
              ...tracker,
              value1: event.target.value
            }, trackerIndex);
          }
        });
      }

      if (tracker.type === "fieldTwo") {
        return jsxs(Fragment, {
          children: [
            jsx("input", {
              className: styles.fieldStatSmall,
              value: tracker.value1,
              onChange: event => {
                onChangeTracker({
                  ...tracker,
                  value1: event.target.value
                }, trackerIndex);
              }
            }),
            jsx("input", {
              className: styles.fieldSmall,
              value: tracker.value2,
              onChange: event => {
                onChangeTracker({
                  ...tracker,
                  value2: event.target.value
                }, trackerIndex);
              },
              style: {
                width: "4rem"
              }
            })
          ]
        });
      }

      return "";
    };

    return jsxs("div", {
      className: classNames(styles.fieldColumn, styles.statContainer),
      children: [
        jsxs("div", {
          className: styles.fieldRowNoSpread,
          style: {
            alignItems: "center",
            minHeight: "2rem"
          },
          children: [
            jsx("div", {
              className: styles.header,
              children: talent.name
            }),
            onRemove && jsx("div", {
              style: {
                marginLeft: "auto"
              },
              children: jsx("button", {
                onClick: () => {
                  onRemove();
                },
                children: "×"
              })
            })
          ]
        }),
        talent.trackers?.map((tracker, trackerIndex) => tracker.type !== "fieldSmallLong" ? "" : jsxs("div", {
          className: classNames(styles.fieldStatContainerSmallRow, styles.statDetail),
          children: [
            jsx("div", {
              className: styles.fieldStatLabel,
              style: {
                marginLeft: "0.25rem"
              },
              children: tracker.name
            }),
            jsx("div", {
              className: styles.fieldRowNoSpread,
              style: {
                gap: "0.25rem"
              },
              children: jsx("input", {
                className: styles.fieldSmallLong,
                value: tracker.value1,
                onChange: event => {
                  onChangeTracker({
                    ...tracker,
                    value1: event.target.value
                  }, trackerIndex);
                }
              })
            })
          ]
        }, tracker.name + trackerIndex)),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsx("div", {
          dangerouslySetInnerHTML: {
            __html: talent.description
          }
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsx("div", {
          children: jsx("div", {
            className: styles.statDetail,
            children: jsxs("div", {
              className: styles.fieldRowNoSpread,
              style: {
                gap: 0
              },
              children: [
                talent.trackers?.map((tracker, trackerIndex) => tracker.type === "fieldSmallLong" ? "" : jsxs("div", {
                  className: styles.fieldStatContainerSmallRow,
                  children: [
                    jsx("div", {
                      className: styles.fieldStatLabel,
                      style: {
                        marginLeft: "0.25rem"
                      },
                      children: tracker.name
                    }),
                    jsx("div", {
                      className: styles.fieldRowNoSpread,
                      style: {
                        gap: "0.25rem"
                      },
                      children: renderCompactTracker(tracker, trackerIndex)
                    })
                  ]
                }, tracker.name + trackerIndex)),
                jsx("div", {
                  style: {
                    marginLeft: "auto"
                  },
                  children: jsx("button", {
                    onClick: () => {
                      onBroadcast();
                    },
                    children: "➤"
                  })
                })
              ]
            })
          })
        }),
        onSelect && jsxs(Fragment, {
          children: [
            jsx("img", {
              src: assets.dividerSecondary
            }),
            jsx("button", {
              disabled: isSelected,
              onClick: () => {
                onSelect();
              },
              children: isSelected ? "Already selected" : "Add Talent"
            })
          ]
        })
      ]
    });
  };

  const CorePathView = ({ player, updatePlayer, broadcast }) => {
    if (player.path === "") return "";

    const pathData = getPathData(getPathsById(), player.path);
    const [detailsCollapsed, setDetailsCollapsed] = React.useState(true);

    if (!pathData) {
      return jsxs(Fragment, {
        children: [
          jsx("div", {
            className: styles.header,
            children: "PATH NOT FOUND"
          }),
          jsx("div", {
            className: styles.statDetail,
            children: `The path "${player.path}" is not available in /data/paths.`
          }),
          jsx("button", {
            onClick: () => {
              updatePlayer(clearCorePath(player));
            },
            children: "Clear Core Path"
          })
        ]
      });
    }

    return jsxs(Fragment, {
      children: [
        jsxs("div", {
          className: styles.fieldRowNoSpread,
          children: [
            jsx("div", {
              children: jsx("img", {
                src: getPathAssets()[pathData.name.toLowerCase()],
                width: 80
              })
            }),
            jsxs("div", {
              className: styles.fieldColumn,
              children: [
                jsxs("div", {
                  className: styles.fieldRowNoSpread,
                  style: {
                    alignItems: "center"
                  },
                  children: [
                    jsx("div", {
                      className: styles.header,
                      children: pathData.name
                    }),
                    jsx("div", {
                      className: styles.statDetail,
                      children: pathData.description
                    })
                  ]
                }),
                jsx("div", {
                  className: styles.statDetail,
                  style: {
                    fontStyle: "italic"
                  },
                  children: pathData.quote
                })
              ]
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsx("div", {
          className: styles.header,
          children: "CORE TALENT"
        }),
        jsx(TalentCard, {
          talent: player.coreTalent ?? pathData.coreTalent,
          onChangeTracker: (tracker, trackerIndex) => {
            updatePlayer(updateCoreTalentTracker(player, tracker, trackerIndex));
          },
          onBroadcast: () => {
            broadcast(pathData.coreTalent);
          }
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsx("div", {
          className: styles.header,
          children: "DETAILS"
        }),
        jsx("button", {
          onClick: () => {
            setDetailsCollapsed(!detailsCollapsed);
          },
          children: detailsCollapsed ? "Expand Details " : "Collapse Details"
        }),
        !detailsCollapsed && jsxs(Fragment, {
          children: [
            pathData.details.map(talent => jsx(TalentCard, {
              talent,
              onChangeTracker: () => {},
              onBroadcast: () => {
                broadcast(talent);
              }
            }, talent.name)),
            jsx("img", {
              src: assets.dividerSecondary
            }),
            pathData.other !== null ? jsx("div", {
              className: classNames(styles.fieldColumn, styles.statContainer),
              children: jsx("div", {
                dangerouslySetInnerHTML: {
                  __html: pathData.other
                }
              })
            }) : ""
          ]
        })
      ]
    });
  };

  const PathPicker = ({ player, updatePlayer, onSelect, includeBackground = false }) => {
    const pathIds = getPathIds(getPathsById());

    return jsx("div", {
      className: styles.pathList,
      children: [ ...pathIds.map(pathId => jsxs("div", {
        className: styles.pathItem,
        onClick: () => {
          if (updatePlayer) updatePlayer(assignCorePath(player, pathId, getPathsById()));
          if (onSelect) onSelect(pathId);
        },
        children: [
          jsx("img", {
            src: getPathAssets()[pathId],
            width: 80
          }),
          jsx("div", {
            className: styles.header,
            children: pathId
          })
        ]
      }, pathId)), includeBackground && jsx("div", {
        className: styles.pathItem,
        onClick: () => onSelect("background"),
        children: jsx("div", {
          className: styles.header,
          children: "background"
        })
      }, "background") ]
    });
  };

  const PathTalentPicker = ({ path, player, updatePlayer, onClose, broadcast }) => {
    if (path === "") return "";

    const pathData = getPathData(getPathsById(), path);
    const talents = path === "background" ? getBackgroundTalents() : pathData?.pathTalent;

    if (!pathData && path !== "background") {
      return jsxs(Fragment, {
        children: [
          jsx("div", {
            className: styles.header,
            children: "PATH NOT FOUND"
          }),
          jsx("div", {
            className: styles.statDetail,
            children: `The path "${path}" is not available in /data/paths.`
          }),
          jsx("button", {
            onClick: () => {
              onClose();
            },
            children: "Close"
          })
        ]
      });
    }

    return jsxs(Fragment, {
      children: [
        jsxs("div", {
          className: styles.fieldRowNoSpread,
          children: [
            jsxs("div", {
              className: styles.header,
              children: [ "SELECT TALENT FROM ", path === "background" ? "BACKGROUND" : pathData.name ]
            }),
            jsx("div", {
              style: {
                marginLeft: "auto"
              },
              children: jsx("button", {
                onClick: () => {
                  onClose();
                },
                children: "×"
              })
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        talents.map(talent => jsx(TalentCard, {
          talent,
          isSelected: player.talents.some(selectedTalent => selectedTalent?.name === talent.name),
          onSelect: () => {
            updatePlayer(addTalentToCharacter(player, talent));
            onClose();
          },
          onChangeTracker: () => {},
          onBroadcast: () => {
            broadcast(talent);
          }
        }, talent.name))
      ]
    });
  };

  const PathScreen = ({ player, updatePlayer, myChat, id }) => {
    const [isAddingTalent, setIsAddingTalent] = React.useState(false);
    const [selectedTalentPath, setSelectedTalentPath] = React.useState("");

    const broadcastTalent = async talent => {
      const metadata = await obr.scene.getMetadata();
      writePatch(buildTalentBroadcastPatch({
        metadata,
        ownPlayerId: id,
        myChatEntries: myChat,
        talent
      }));
      scrollChatboxToEnd();
    };

    if (isAddingTalent && selectedTalentPath === "") {
      return jsxs("div", {
        className: classNames(styles.scrollable, styles.Sheet),
        children: [
          jsxs("div", {
            className: styles.fieldRowNoSpread,
            children: [
              jsx("div", {
                className: styles.header,
                children: "SELECT PATH TO CHOOSE TALENT"
              }),
              jsx("div", {
                style: {
                  marginLeft: "auto"
                },
                children: jsx("button", {
                  onClick: () => {
                    setIsAddingTalent(false);
                    setSelectedTalentPath("");
                  },
                  children: "×"
                })
              })
            ]
          }),
          jsx("img", {
            src: assets.dividerPrimary
          }),
          jsx(PathPicker, {
            player,
            includeBackground: true,
            onSelect: pathId => {
              setSelectedTalentPath(pathId);
            }
          })
        ]
      });
    }

    if (selectedTalentPath !== "") {
      return jsx("div", {
        className: classNames(styles.scrollable, styles.Sheet, styles.fieldColumn),
        children: jsx(PathTalentPicker, {
          path: selectedTalentPath,
          updatePlayer,
          onClose: () => {
            setIsAddingTalent(false);
            setSelectedTalentPath("");
          },
          player,
          broadcast: broadcastTalent
        })
      });
    }

    return jsxs("div", {
      className: classNames(styles.scrollable, styles.Sheet),
      children: [
        player.path !== "" ? jsxs(Fragment, {
          children: [
            jsxs("div", {
              className: styles.fieldRowNoSpread,
              children: [
                jsx("div", {
                  className: styles.header,
                  children: "CORE PATH"
                }),
                jsx("div", {
                  style: {
                    marginLeft: "auto"
                  },
                  children: jsx("button", {
                    onClick: () => {
                      updatePlayer(clearCorePath(player));
                    },
                    children: "Change Core Path"
                  })
                })
              ]
            }),
            jsx(CorePathView, {
              player,
              updatePlayer,
              broadcast: broadcastTalent
            })
          ]
        }) : jsxs(Fragment, {
          children: [
            jsx("div", {
              className: styles.header,
              children: "SELECT CORE PATH"
            }),
            jsx("img", {
              src: assets.dividerPrimary
            }),
            jsx(PathPicker, {
              player,
              updatePlayer
            })
          ]
        }),
        jsx("div", {
          className: styles.header,
          children: "TALENTS"
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        player.talents.map((talent, talentIndex) => jsx(TalentCard, {
          talent,
          onRemove: () => {
            updatePlayer(removeTalentAtIndex(player, talentIndex));
          },
          onChangeTracker: (tracker, trackerIndex) => {
            updatePlayer(updateTalentTrackerAtIndex(player, talentIndex, tracker, trackerIndex));
          },
          onBroadcast: () => {
            broadcastTalent(talent);
          }
        }, talent.name)),
        jsx("button", {
          className: styles.statButton,
          onClick: () => {
            setIsAddingTalent(true);
          },
          children: "Add Talent"
        })
      ]
    });
  };

  return {
    PathScreen,
    PathPicker,
    CorePathView,
    PathTalentPicker,
    TalentCard
  };
}
