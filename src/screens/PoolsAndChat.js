import {
  buildClearChatPatch,
  buildChatMessagePatch
} from "../domain/chat.js";
import {
  buildDescriptionChatPatch,
  buildNamedPoolRollChatPatch,
  buildNamedPoolRollEntry,
  buildPoolCreatePatch,
  buildPoolRemovePatch,
  buildPoolUpdatePatch,
  buildSuspensePatch,
  createPoolRecord
} from "../domain/pools.js";
import { writeSceneMetadata } from "../core/metadata.js";
import { scrollChatboxToEnd } from "../core/app-shell-state.js";

const CRUCIBLE_FIRST_WORDS = [
  [ "Tough", "Quiet", "Precarious", "Wild", "Mysterious", "Rustic" ],
  [ "Muffled", "Aged", "Romantic", "Menacing", "Puzzling", "Eerie" ],
  [ "Broken", "Distant", "Dwindling", "Perilous", "Bleak", "Tense" ],
  [ "Forgotten", "Hidden", "Abundant", "Withered", "Chaotic", "Looming" ],
  [ "Festive", "Lost", "Immense", "Serene", "Vibrant", "Flickering" ],
  [ "Rugged", "Sacred", "Splintered", "Relentless", "Tangled", "Twisted" ]
];

const CRUCIBLE_SECOND_WORDS = [
  [ "Journey", "Juncture", "Rift", "Scheme", "Nexus", "Team" ],
  [ "Tremor", "Debris", "Symbol", "Scar", "Archive", "Chasm" ],
  [ "Sanctuary", "Betrayal", "Trail", "Wasteland", "Help", "Mystery" ],
  [ "Peak", "Threshold", "Boundary", "Beacon", "Secret", "Wall" ],
  [ "Territory", "Rumor", "Standoff", "Strife", "Maze", "Pact" ],
  [ "Dilemma", "Tradition", "Jackpot", "Omen", "Deception", "Illusion" ]
];

const rollDie = sides => Math.floor(Math.random() * sides) + 1;

const getOutcomeColor = outcome => {
  switch (outcome) {
    case "Critical":
      return "purple";
    case "Perfect":
      return "green";
    case "Messy":
      return "orange";
    case "Disaster":
      return "red";
    default:
      return "black";
  }
};

const buildCrucibleName = () => {
  const firstGroup = CRUCIBLE_FIRST_WORDS[Math.floor(Math.random() * CRUCIBLE_FIRST_WORDS.length)];
  const secondGroup = CRUCIBLE_SECOND_WORDS[Math.floor(Math.random() * CRUCIBLE_SECOND_WORDS.length)];
  const firstWord = firstGroup[Math.floor(Math.random() * firstGroup.length)];
  const secondWord = secondGroup[Math.floor(Math.random() * secondGroup.length)];
  return `${firstWord} ${secondWord}`;
};

/**
 * @typedef {Object} PoolsAndChatDependencies
 * @property {{ Fragment: symbol|string, jsx: Function, jsxs: Function }} jsxRuntime
 * @property {{ useState: Function }} React
 * @property {Object} obr
 * @property {Object} styles
 * @property {(base: string, extras?: Object<string, boolean>) => string} classNames
 * @property {{ dividerPrimary: string, diceFaces: string[], thornFaces: string[] }} assets
 * @property {(input: Object) => Promise<void>} rollDice
 */

/**
 * @param {PoolsAndChatDependencies} dependencies
 * @returns {{
 *   PoolsScreen: Function,
 *   ChatScreen: Function,
 *   ChatEntry: Function,
 *   PoolRow: Function
 * }}
 */
export function createPoolsAndChatScreens(dependencies) {
  const {
    jsxRuntime,
    React,
    obr,
    styles,
    classNames,
    assets,
    rollDice
  } = dependencies;
  const { Fragment, jsx, jsxs } = jsxRuntime;

  const writePatch = patch => {
    writeSceneMetadata(obr.scene, patch);
  };

  const RollEntry = ({ chat, name }) => {
    if (!(chat.dice && chat.dice.length) && !(chat.thorns && chat.thorns.length)) return null;

    return jsxs("div", {
      style: {
        textAlign: chat.user === name ? "right" : "left"
      },
      children: [
        jsx("div", {
          className: styles.chatSender,
          children: chat.user
        }),
        jsxs("div", {
          className: styles.rollResult,
          style: {
            flexDirection: chat.user === name ? "row-reverse" : "row"
          },
          children: [
            chat.dice.map((die, index) => jsx("img", {
              src: assets.diceFaces[die - 1],
              width: 24,
              height: 24
            }, `dice${index}`)),
            chat.thorns && chat.thorns.map((thorn, index) => jsx("img", {
              src: assets.thornFaces[thorn - 1],
              width: 30,
              height: 30
            }, `thorn${index}`))
          ]
        }),
        chat.dice.length > 0 && jsxs(Fragment, {
          children: [
            jsx("div", {
              style: {
                fontSize: 16
              },
              children: chat.thornEffect.map((effect, index) => jsx("div", {
                children: effect
              }, index))
            }),
            jsx("div", {
              className: styles.header,
              style: {
                color: getOutcomeColor(chat.outcome),
                fontSize: 14
              },
              children: chat.outcome
            })
          ]
        })
      ]
    });
  };

  const ChatEntry = ({ chat, name }) => chat.message || chat.description ? jsxs("div", {
    style: {
      textAlign: chat.user === name ? "right" : "left"
    },
    children: [
      jsx("div", {
        className: styles.chatSender,
        children: chat.user
      }),
      jsx("span", {
        children: chat.message
      }),
      chat.description && jsx("div", {
        dangerouslySetInnerHTML: {
          __html: chat.description
        }
      })
    ]
  }) : jsx(RollEntry, {
    chat,
    name
  });

  const PoolRow = ({ pool, onChange, onRemove, onRoll }) => jsx("div", {
    className: classNames(styles.fieldContainer),
    children: jsxs("div", {
      className: styles.fieldRowNoSpread,
      children: [
        jsx("input", {
          className: styles.fieldStatSmall,
          value: pool.value,
          onChange: event => {
            const parsed = parseInt(event.target.value.charAt(event.target.value.length - 1));
            onChange({
              ...pool,
              value: isNaN(parsed) ? 0 : parsed
            });
          }
        }),
        jsx("button", {
          onClick: () => {
            onRoll();
          },
          children: "Roll"
        }),
        jsx("input", {
          className: styles.poolField,
          type: "text",
          value: pool.name,
          onChange: event => {
            onChange({
              ...pool,
              name: event.target.value
            });
          }
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

  const PoolsScreen = ({ chat, myChat, id, pools, player, role, gmData, players }) => {
    const [customDiceCount, setCustomDiceCount] = React.useState(0);
    const [customThornsCount, setCustomThornsCount] = React.useState(0);

    const updateSuspense = async suspense => {
      const metadata = await obr.scene.getMetadata();
      writePatch(buildSuspensePatch(metadata, suspense));
    };

    const broadcastCrucible = async () => {
      const metadata = await obr.scene.getMetadata();
      writePatch(buildDescriptionChatPatch({
        metadata,
        ownPlayerId: id,
        myChatEntries: myChat,
        user: role === "GM" ? "GM" : player,
        description: `- Crucible - <br><b>${buildCrucibleName()}</b>`,
        gmRoll: true
      }));
    };

    const broadcastPcTarget = async () => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      const metadata = await obr.scene.getMetadata();
      writePatch(buildDescriptionChatPatch({
        metadata,
        ownPlayerId: id,
        myChatEntries: myChat,
        user: role === "GM" ? "GM" : player,
        description: `- You've been targeted - <br><b>${randomPlayer.name}</b>`,
        gmRoll: true
      }));
    };

    const addPool = async value => {
      const pool = createPoolRecord(value);
      const metadata = await obr.scene.getMetadata();
      writePatch(buildPoolCreatePatch(metadata, pool));
    };

    const removePool = async poolId => {
      const metadata = await obr.scene.getMetadata();
      writePatch(buildPoolRemovePatch(metadata, poolId));
    };

    const updatePool = async pool => {
      if (!pool) return;
      const metadata = await obr.scene.getMetadata();
      writePatch(buildPoolUpdatePatch(metadata, pool, id));
    };

    const rollNamedPool = async pool => {
      let misses = 0;
      const dice = [];
      let criticalCount = 0;
      let messyCount = 0;

      for (let index = 0; index < pool.value; index++) {
        const result = rollDie(6);
        dice.push(result);
        if (result < 4) misses++;
        if (result === 6) criticalCount++;
        else if (result > 3) messyCount++;
      }

      let outcome = "Grim";
      if (criticalCount > 1) outcome = "Critical";
      else if (criticalCount > 0) outcome = "Perfect";
      else if (messyCount > 0) outcome = "Messy";

      const remainingValue = pool.value - misses;
      const rollEntry = buildNamedPoolRollEntry({
        user: role === "GM" ? "GM" : player,
        dice,
        poolName: pool.name,
        startingValue: pool.value,
        remainingValue,
        outcome
      });

      await updatePool({
        ...pool,
        value: remainingValue
      });

      const metadata = await obr.scene.getMetadata();
      writePatch(buildNamedPoolRollChatPatch({
        metadata,
        ownPlayerId: id,
        myChatEntries: myChat,
        rollEntry
      }));
      scrollChatboxToEnd();
    };

    return jsxs("div", {
      className: classNames(styles.Sheet),
      children: [
        jsx("div", {
          className: classNames(styles.fieldColumn),
          children: jsxs("div", {
            className: classNames(styles.fieldRow),
            style: {
              display: "grid",
              gridTemplateColumns: "minmax(9rem, 1fr) minmax(7rem, 1.2fr) minmax(10rem, 1.4fr)",
              gap: "0.5rem",
              alignItems: "start"
            },
            children: [
              jsxs("div", {
                className: styles.statContainer,
                style: {
                  alignItems: "center",
                  flexGrow: 1,
                  flexDirection: "column",
                  gap: "0.5rem",
                  height: "auto",
                  width: "auto",
                  gridColumn: "1"
                },
                children: [
                  jsxs("div", {
                    className: styles.fieldStatContainerSmall,
                    style: {
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.5rem"
                    },
                    children: [
                      jsx("b", {
                        children: "Suspense"
                      }),
                      jsx("input", {
                        className: styles.fieldStat,
                        type: "number",
                        value: gmData && gmData.suspense ? gmData.suspense : "0",
                        onChange: event => {
                          updateSuspense(event.target.value);
                        }
                      })
                    ]
                  }),
                  jsxs("div", {
                    className: styles.fieldStatContainerSmall,
                    style: {
                      flexDirection: "row",
                      gap: "0.25rem"
                    },
                    children: [
                      jsx("button", {
                        onClick: () => {
                        broadcastPcTarget();
                        },
                        style: {
                          width: "2.1rem"
                        },
                        children: "PC"
                      }),
                      jsx("button", {
                        onClick: () => {
                          broadcastCrucible();
                        },
                        style: {
                          width: "4.2rem"
                        },
                        children: "Crucible"
                      })
                    ]
                  })
                ]
              }),
              jsxs("div", {
                className: styles.statContainer,
                style: {
                  alignItems: "center",
                  justifyContent: "space-between",
                  gridColumn: "2",
                  minWidth: 0,
                  minHeight: 78
                },
                children: [
                  jsx("b", {
                    children: "Story"
                  }),
                  jsxs("div", {
                    className: styles.fieldStatContainerSmall,
                    style: {
                      marginLeft: 8,
                      gap: "0.25rem"
                    },
                    children: [
                      jsx("button", {
                        className: styles.storyButton,
                        onClick: () => {
                          rollDice({
                            diceCount: 3,
                            thornsCount: 0,
                            myChat,
                            id,
                            player,
                            odds: "Good Odds",
                            role
                          });
                        },
                        children: "Good"
                      }),
                      jsx("button", {
                        className: styles.storyButton,
                        onClick: () => {
                          rollDice({
                            diceCount: 2,
                            thornsCount: 0,
                            myChat,
                            id,
                            player,
                            odds: "Even Odds",
                            role
                          });
                        },
                        children: "Even"
                      }),
                      jsx("button", {
                        className: styles.storyButton,
                        onClick: () => {
                          rollDice({
                            diceCount: 1,
                            thornsCount: 0,
                            myChat,
                            id,
                            player,
                            odds: "Bad Odds",
                            role
                          });
                        },
                        children: "Bad"
                      })
                    ]
                  })
                ]
              }),
              jsxs("div", {
                className: styles.statContainer,
                style: {
                  alignItems: "center",
                  flexGrow: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "0.5rem",
                  height: "auto",
                  minWidth: 0,
                  gridColumn: "3"
                },
                children: [
                  jsxs("div", {
                    className: styles.fieldStatContainerSmall,
                    style: {
                      minWidth: 0
                    },
                    children: [
                      jsx("b", {
                        children: "Dice"
                      }),
                      jsx("input", {
                        className: styles.fieldStat,
                        type: "number",
                        value: customDiceCount === null ? "" : customDiceCount,
                        onClick: () => {
                          setCustomDiceCount(null);
                        },
                        onBlur: () => {
                          if (customDiceCount === null) setCustomDiceCount(0);
                        },
                        onChange: event => {
                          const parsed = parseInt(event.target.value.charAt(event.target.value.length - 1));
                          setCustomDiceCount(isNaN(parsed) ? null : parsed);
                        }
                      })
                    ]
                  }),
                  jsxs("div", {
                    className: styles.fieldStatContainerSmall,
                    style: {
                      minWidth: 0
                    },
                    children: [
                      jsx("b", {
                        children: "Thorns"
                      }),
                      jsx("input", {
                        className: styles.fieldStat,
                        type: "number",
                        value: customThornsCount === null ? "" : customThornsCount,
                        onClick: () => {
                          setCustomThornsCount(null);
                        },
                        onBlur: () => {
                          if (customThornsCount === null) setCustomThornsCount(0);
                        },
                        onChange: event => {
                          const parsed = parseInt(event.target.value.charAt(event.target.value.length - 1));
                          setCustomThornsCount(isNaN(parsed) ? null : parsed);
                        }
                      })
                    ]
                  }),
                  jsxs("div", {
                    className: styles.fieldStatContainerSmall,
                    style: {
                      gridColumn: "1 / -1",
                      flexDirection: "row",
                      gap: "0.25rem"
                    },
                    children: [
                      jsx("button", {
                        onClick: () => {
                          rollDice({
                            diceCount: customDiceCount ?? 0,
                            thornsCount: customThornsCount ?? 0,
                            myChat,
                            id,
                            player,
                            setValue: nextValue => {
                              setCustomDiceCount(nextValue);
                            },
                            role
                          });
                        },
                        style: {
                          width: "4rem"
                        },
                        children: "Pool"
                      }),
                      jsx("button", {
                        onClick: () => {
                          rollDice({
                            diceCount: customDiceCount ?? 0,
                            thornsCount: customThornsCount ?? 0,
                            myChat,
                            id,
                            player,
                            role
                          });
                        },
                        style: {
                          width: "4rem"
                        },
                        children: "Roll"
                      })
                    ]
                  })
                ]
              })
            ]
          })
        }),
        jsxs("div", {
          className: styles.fieldRow,
          style: {
            justifyContent: "space-between"
          },
          children: [
            jsxs("div", {
              className: classNames(styles.fieldColumn),
              children: [
                jsx("div", {
                  className: styles.header,
                  children: "Pools"
                }),
                jsx("div", {
                  className: styles.poolContainer,
                  children: pools.map(pool => jsx(PoolRow, {
                    pool,
                    onChange: nextPool => {
                      updatePool(nextPool);
                    },
                    onRoll: () => {
                      rollNamedPool(pool);
                    },
                    onRemove: () => {
                      removePool(pool.id);
                    }
                  }, pool.id))
                }),
                jsxs("div", {
                  className: styles.poolButtons,
                  children: [
                    jsx("b", {
                      children: "Add Pool:"
                    }),
                    jsx("button", {
                      className: styles.statButton,
                      onClick: () => {
                        addPool(2);
                      },
                      children: "Short"
                    }),
                    jsx("button", {
                      className: styles.statButton,
                      onClick: () => {
                        addPool(4);
                      },
                      children: "Mid"
                    }),
                    jsx("button", {
                      className: styles.statButton,
                      onClick: () => {
                        addPool(8);
                      },
                      children: "Long"
                    })
                  ]
                })
              ]
            }),
            jsx("div", {
              className: styles.chatBox,
              style: {
                height: 420
              },
              children: jsx("div", {
                id: "chatbox",
                className: classNames(styles.chatScrollable),
                style: {
                  width: 155
                },
                children: chat.length ? chat
                  .sort((left, right) => left.id - right.id)
                  .filter(entry => entry.dice && entry.dice.length > 0 || entry.thorns && entry.thorns.length > 0 || entry.gmRoll)
                  .map(entry => jsx(ChatEntry, {
                    chat: entry,
                    name: player
                  }, entry.id)) : ""
              })
            })
          ]
        })
      ]
    });
  };

  const ChatScreen = ({ chat, myChat, role, id, player, chatOnly }) => {
    const [message, setMessage] = React.useState("");

    const submitMessage = async () => {
      if (message === "") return;

      if (role === "GM" && message === "/clearchat") {
        await clearChat();
        setMessage("");
        return;
      }

      const metadata = await obr.scene.getMetadata();
      writePatch(buildChatMessagePatch({
        metadata,
        ownPlayerId: id,
        myChatEntries: myChat,
        user: role === "GM" ? "GM" : player,
        message
      }));
      setMessage("");
      scrollChatboxToEnd();
    };

    const clearChat = async () => {
      const metadata = await obr.scene.getMetadata();
      writePatch(buildClearChatPatch(metadata));
    };

    return jsx("div", {
      className: classNames(styles.Sheet),
      style: chatOnly ? {
        padding: 0
      } : {},
      children: jsx("div", {
        className: styles.fieldRow,
        children: jsxs("div", {
          className: styles.chatBox,
          style: {
            width: chatOnly ? 280 : 460
          },
          children: [
            jsx("div", {
              id: "chatbox",
              className: classNames(styles.chatScrollable),
              style: {
                height: chatOnly ? 480 : 420
              },
              children: chat.length ? chat
                .sort((left, right) => left.id - right.id)
                .map(entry => jsx(ChatEntry, {
                  chat: entry,
                  name: player
                }, entry.id)) : ""
            }),
            jsx("img", {
              src: assets.dividerPrimary
            }),
            jsxs("div", {
              className: styles.chatInputContainer,
              children: [
                jsx("input", {
                  className: styles.chatField,
                  value: message,
                  onChange: event => {
                    setMessage(event.target.value);
                  },
                  onKeyDown: event => {
                    if (event.key === "Enter") submitMessage();
                  }
                }),
                role === "GM" && jsx("button", {
                  onClick: () => {
                    if (confirm("Are you sure you want to clear all the chat messages?") === true) {
                      clearChat();
                    }
                  },
                  children: "Clear"
                })
              ]
            })
          ]
        })
      })
    });
  };

  return {
    PoolsScreen,
    ChatScreen,
    ChatEntry,
    PoolRow
  };
}
