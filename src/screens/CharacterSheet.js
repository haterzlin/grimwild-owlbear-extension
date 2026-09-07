import { getAttributeRollModifiers } from "../domain/characters.js";

const TRAIT_OPTIONS = [ "Brave", "Caring", "Confident", "Curious", "Gentle", "Honest", "Honorable", "Persistent", "Quiet", "Protective", "Rash", "Stubborn" ];
const DESIRE_OPTIONS = [ "Belonging", "Glory", "Harmony", "Honor", "Justice", "Knowledge", "Love", "Power", "Renown", "Thrills", "Wealth", "Wisdom" ];
const BOND_INTENSITY_OPTIONS = [ "Deep", "Complex", "Growing", "Lowkey", "Playful", "Tense" ];
const BOND_NATURE_OPTIONS = [ "Affection", "Camaraderie", "Curiosity", "Doubts", "Respect", "Rivalry" ];

const getUnlockedTalentLevel = experience => {
  const thresholds = [ 2, 5, 9, 14, 20, 27 ];
  let level = 1;

  for (let index = 0; index < thresholds.length && experience >= thresholds[index]; index++) level++;

  return level;
};

const getExperienceToNextLevel = experience => {
  const thresholds = [ 2, 5, 9, 14, 20, 27 ];

  for (let index = 0; index < thresholds.length; index++) {
    if (experience < thresholds[index]) return thresholds[index] - experience;
  }

  return 0;
};

/**
 * @typedef {Object} CharacterSheetDependencies
 * @property {{ Fragment: symbol|string, jsx: Function, jsxs: Function }} jsxRuntime
 * @property {Object} styles
 * @property {(base: string, extras?: Object<string, boolean>) => string} classNames
 * @property {{ dividerPrimary: string, dividerSecondary: string }} assets
 * @property {(input: Object) => void} rollDice
 */

/**
 * @param {CharacterSheetDependencies} dependencies
 * @returns {Function}
 */
export default function createCharacterSheetScreen(dependencies) {
  const {
    jsxRuntime,
    styles,
    classNames,
    assets,
    rollDice
  } = dependencies;
  const { Fragment, jsx, jsxs } = jsxRuntime;

  const TextField = ({ label, onChange, value, className }) => jsxs("div", {
    className: classNames(styles.fieldContainer, className),
    children: [
      jsx("div", {
        className: styles.fieldLabel,
        children: label
      }),
      jsx("input", {
        className: styles.field,
        type: "text",
        onChange: event => {
          onChange(event.target.value);
        },
        value
      })
    ]
  });

  const TextAreaField = ({ label, onChange, rows = 4, value, width = 200 }) => jsxs("div", {
    className: styles.fieldContainer,
    children: [
      jsx("div", {
        className: styles.fieldLabel,
        children: label
      }),
      jsx("textarea", {
        className: styles.field,
        style: {
          width
        },
        rows,
        onChange: event => {
          onChange(event.target.value);
        },
        value
      })
    ]
  });

  const SelectOrCustomField = ({ value, onChange, options }) => !options.includes(value) && value !== "" ? jsx("input", {
    className: styles.fieldSmall,
    value,
    onChange: event => {
      onChange(event.target.value);
    }
  }) : jsxs("select", {
    onChange: event => {
      onChange(event.target.value);
    },
    value,
    children: [
      options.map(option => jsx("option", {
        value: option,
        children: option
      }, option)),
      jsx("option", {
        value: "Custom",
        children: "Custom"
      })
    ]
  });

  const BondRow = ({ onChange, onRemove, bond }) => jsx("div", {
    className: classNames(styles.fieldContainer, styles.fieldFullWidth),
    children: jsxs("div", {
      className: styles.fieldRowNoSpread,
      children: [
        jsx("div", {
          className: styles.fieldLabel,
          children: "PC: "
        }),
        jsx("input", {
          className: styles.field,
          type: "text",
          onChange: event => {
            onChange({
              ...bond,
              name: event.target.value
            });
          },
          value: bond.name
        }),
        jsx(SelectOrCustomField, {
          value: bond.intensity,
          onChange: nextValue => {
            onChange({
              ...bond,
              intensity: nextValue
            });
          },
          options: BOND_INTENSITY_OPTIONS
        }),
        jsx(SelectOrCustomField, {
          value: bond.nature,
          onChange: nextValue => {
            onChange({
              ...bond,
              nature: nextValue
            });
          },
          options: BOND_NATURE_OPTIONS
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

  const AttributeStat = ({ stat, label, onChangeValue, onChangeMark, value, marked, myChat, id, onRoll, player }) => jsxs("div", {
    className: styles.fieldStatContainer,
    children: [
      jsx("div", {
        className: styles.fieldStatLabel,
        children: jsx("b", {
          children: label
        })
      }),
      jsx("input", {
        className: styles.fieldStat,
        onChange: event => {
          onChangeValue(event.target.value);
        },
        value
      }),
      jsx("button", {
        className: styles.statButton,
        onClick: () => {
          const modifiers = getAttributeRollModifiers({
            stat,
            marked,
            bloodied: player.bloodied,
            rattled: player.rattled,
            desperate: player.desperate
          });
          if (modifiers.clearsMark) onChangeMark(false);

          rollDice({
            diceCount: value,
            thornsCount: modifiers.thorns,
            myChat,
            id,
            player: player.name,
            role: "PLAYER"
          });
          onRoll();
        },
        children: "Roll"
      }),
      jsxs("div", {
        className: styles.fieldStatContainerSmall,
        children: [
          jsx("div", {
            className: styles.fieldStatLabel,
            children: "Marked"
          }),
          jsx("input", {
            type: "checkbox",
            checked: marked,
            onChange: () => {
              onChangeMark(!marked);
            }
          })
        ]
      }),
    ]
  });

  return function CharacterSheet({ player, updatePlayer, myChat, id, onRoll }) {
    const updateField = patch => {
      updatePlayer({
        ...player,
        ...patch
      });
    };

    return jsxs("div", {
      className: classNames(styles.scrollable, styles.Sheet),
      children: [
        jsx("div", {
          className: styles.header,
          children: "CHARACTER"
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsxs("div", {
          className: classNames(styles.fieldRow, styles.fieldFullWidth),
          children: [
            jsxs("div", {
              className: classNames(styles.fieldColumn, styles.fieldFullWidth),
              children: [
                jsx(TextField, {
                  label: "Name",
                  onChange: value => updateField({
                    name: value
                  }),
                  value: player.name
                }),
                jsx(TextField, {
                  label: "Player",
                  onChange: value => updateField({
                    player: value
                  }),
                  value: player.player
                }),
                jsx(TextField, {
                  label: "Weapon Style (optional)",
                  onChange: value => updateField({
                    weaponStyle: value
                  }),
                  value: player.weaponStyle
                })
              ]
            }),
            jsx("div", {
              className: styles.fieldFullColumn,
              children: jsx(TextAreaField, {
                label: "Distinct Features",
                onChange: value => updateField({
                  features: value
                }),
                value: player.features
              })
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsx("div", {
          className: styles.header,
          children: "STATS"
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsxs("div", {
          className: classNames(styles.fieldRow),
          children: [
            jsxs("div", {
              className: classNames(styles.fieldColumn, styles.statContainer),
              children: [
                jsxs("div", {
                  className: classNames(styles.fieldRow),
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    gap: "0.25rem"
                  },
                  children: [
                    jsx(AttributeStat, {
                      stat: "brawn",
                      label: "Brawn",
                      onChangeMark: value => updateField({
                        brawnMark: value
                      }),
                      value: player.brawn,
                      marked: player.brawnMark,
                      onChangeValue: value => {
                        const parsed = parseInt(value.charAt(value.length - 1));
                        updateField({
                          brawn: isNaN(parsed) ? 0 : parsed
                        });
                      },
                      myChat,
                      id,
                      onRoll,
                      player
                    }),
                    jsx(AttributeStat, {
                      stat: "agility",
                      label: "Agility",
                      onChangeMark: value => updateField({
                        agilityMark: value
                      }),
                      value: player.agility,
                      marked: player.agilityMark,
                      onChangeValue: value => {
                        const parsed = parseInt(value.charAt(value.length - 1));
                        updateField({
                          agility: isNaN(parsed) ? 0 : parsed
                        });
                      },
                      myChat,
                      id,
                      onRoll,
                      player
                    }),
                    jsx(AttributeStat, {
                      stat: "wits",
                      label: "Wits",
                      onChangeMark: value => updateField({
                        witsMark: value
                      }),
                      value: player.wits,
                      marked: player.witsMark,
                      onChangeValue: value => {
                        const parsed = parseInt(value.charAt(value.length - 1));
                        updateField({
                          wits: isNaN(parsed) ? 0 : parsed
                        });
                      },
                      myChat,
                      id,
                      onRoll,
                      player
                    }),
                    jsx(AttributeStat, {
                      stat: "presence",
                      label: "Presence",
                      onChangeMark: value => updateField({
                        presenceMark: value
                      }),
                      value: player.presence,
                      marked: player.presenceMark,
                      onChangeValue: value => {
                        const parsed = parseInt(value.charAt(value.length - 1));
                        updateField({
                          presence: isNaN(parsed) ? 0 : parsed
                        });
                      },
                      myChat,
                      id,
                      onRoll,
                      player
                    })
                  ]
                }),
                jsxs("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "start",
                    gap: "0.5rem",
                    padding: "0.25rem 0.5rem 0"
                  },
                  children: [
                    jsxs("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem",
                        transform: "translate(1.25rem, -0.35rem)"
                      },
                      children: [
                        jsx("input", {
                          type: "checkbox",
                          checked: player.bloodied,
                          onChange: () => updateField({
                            bloodied: !player.bloodied
                          })
                        }),
                        jsx("div", {
                          className: styles.fieldStatLabel,
                          children: "Bloodied"
                        })
                      ]
                    }),
                    jsxs("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem",
                        transform: "translateY(1.5rem)"
                      },
                      children: [
                        jsx("input", {
                          type: "checkbox",
                          checked: player.desperate,
                          onChange: () => updateField({
                            desperate: !player.desperate
                          })
                        }),
                        jsx("div", {
                          className: styles.fieldStatLabel,
                          children: "Desperate"
                        })
                      ]
                    }),
                    jsxs("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem",
                        transform: "translate(-1.25rem, -0.35rem)"
                      },
                      children: [
                        jsx("input", {
                          type: "checkbox",
                          checked: player.rattled,
                          onChange: () => updateField({
                            rattled: !player.rattled
                          })
                        }),
                        jsx("div", {
                          className: styles.fieldStatLabel,
                          children: "Rattled"
                        })
                      ]
                    })
                  ]
                }),
              ]
            }),
            jsxs("div", {
              className: classNames(styles.fieldColumn),
              children: [
                jsxs("div", {
                  className: classNames(styles.fieldColumn, styles.statContainer),
                  children: [
                    jsxs("div", {
                      className: classNames(styles.fieldRow),
                      children: [
                        jsx("b", {
                          children: "Thread"
                        }),
                        " ",
                        jsx("input", {
                          type: "checkbox",
                          checked: player.story1,
                          onChange: () => updateField({
                            story1: !player.story1
                          })
                        }),
                        " ",
                        jsx("input", {
                          type: "checkbox",
                          checked: player.story2,
                          onChange: () => updateField({
                            story2: !player.story2
                          })
                        })
                      ]
                    }),
                    jsxs("div", {
                      className: classNames(styles.fieldRow),
                      children: [
                        jsx("b", {
                          children: "Spark"
                        }),
                        " ",
                        jsx("input", {
                          type: "checkbox",
                          checked: player.spark1,
                          onChange: () => updateField({
                            spark1: !player.spark1
                          })
                        }),
                        " ",
                        jsx("input", {
                          type: "checkbox",
                          checked: player.spark2,
                          onChange: () => updateField({
                            spark2: !player.spark2
                          })
                        })
                      ]
                    })
                  ]
                }),
                jsxs("div", {
                  className: classNames(styles.fieldColumn, styles.statContainer),
                  style: {
                    textAlign: "center"
                  },
                  children: [
                    jsx("b", {
                      children: "Experience"
                    }),
                    jsxs("div", {
                      className: styles.fieldStatContainerSmall,
                      children: [
                        jsx("input", {
                          className: styles.fieldStat,
                          value: player.experience,
                          onChange: event => {
                            const parsed = parseInt(event.target.value);
                            updateField({
                              experience: isNaN(parsed) ? 0 : parsed
                            });
                          }
                        }),
                        jsx("div", {
                          className: styles.fieldStatLabel,
                          children: "Each session, take 1xp"
                        }),
                        jsx("div", {
                          className: styles.talentCount,
                          children: getUnlockedTalentLevel(player.experience)
                        }),
                        jsx("div", {
                          className: styles.fieldStatLabel,
                          children: "Level & Non-Core Talents Unlocked"
                        }),
                        jsx("div", {
                          className: styles.talentCount,
                          children: getExperienceToNextLevel(player.experience)
                        }),
                        jsx("div", {
                          className: styles.fieldStatLabel,
                          children: "XP to next level"
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        jsxs("div", {
          className: classNames(styles.fieldColumn, styles.statContainer),
          children: [
            jsx("b", {
              children: "Conditions"
            }),
            jsx("textarea", {
              className: styles.fieldConditions,
              rows: 1,
              onChange: event => updateField({
                conditions: event.target.value
              }),
              value: player.conditions
            }),
            jsxs("div", {
              className: styles.statDetail,
              children: [
                jsx("b", {
                  children: "Vex"
                }),
                ": Fight - Flight - Freeze- Freakout"
              ]
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsxs("div", {
          className: styles.fieldRowNoSpread,
          children: [
            jsx("div", {
              className: styles.header,
              children: "DETAILS"
            }),
            jsx("div", {
              className: styles.statDetail,
              children: "Introduce a tangle: take a spark"
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsx("div", {
          className: styles.fieldRow,
          children: jsxs("div", {
            className: classNames(styles.fieldColumn, styles.fieldFullWidth),
            children: [
              jsx(TextField, {
                label: "Background #1",
                onChange: value => updateField({
                  background1: value
                }),
                value: player.background1
              }),
              jsx(TextField, {
                label: "Wises",
                onChange: value => updateField({
                  wise1: value
                }),
                value: player.wise1
              })
            ]
          })
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsx("div", {
          className: styles.fieldRow,
          children: jsxs("div", {
            className: classNames(styles.fieldColumn, styles.fieldFullWidth),
            children: [
              jsx(TextField, {
                label: "Background #2",
                onChange: value => updateField({
                  background2: value
                }),
                value: player.background2
              }),
              jsx(TextField, {
                label: "Wises",
                onChange: value => updateField({
                  wise2: value
                }),
                value: player.wise2
              })
            ]
          })
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsxs("div", {
          className: classNames(styles.fieldColumn, styles.statContainer),
          children: [
            jsx("b", {
              children: "Traits"
            }),
            jsx("div", {
              className: classNames(styles.fieldColumn),
              style: {
                fontSize: 15
              },
              children: jsxs("div", {
                className: classNames(styles.fieldRowNoSpread),
                children: [
                  jsx("div", {
                    className: styles.fieldStatLabel,
                    children: "2 you are"
                  }),
                  jsx(SelectOrCustomField, {
                    value: player.trait1,
                    onChange: value => updateField({
                      trait1: value
                    }),
                    options: TRAIT_OPTIONS
                  }),
                  jsx(SelectOrCustomField, {
                    value: player.trait2,
                    onChange: value => updateField({
                      trait2: value
                    }),
                    options: TRAIT_OPTIONS
                  }),
                  jsx("div", {
                    className: styles.fieldStatLabel,
                    children: "1 you're really not"
                  }),
                  jsx(SelectOrCustomField, {
                    value: player.notTrait,
                    onChange: value => updateField({
                      notTrait: value
                    }),
                    options: TRAIT_OPTIONS
                  })
                ]
              })
            }),
            jsx("b", {
              children: "Desires"
            }),
            jsx("div", {
              className: classNames(styles.fieldColumn),
              style: {
                fontSize: 15
              },
              children: jsxs("div", {
                className: classNames(styles.fieldRowNoSpread),
                children: [
                  jsx("div", {
                    className: styles.fieldStatLabel,
                    children: "2 you want"
                  }),
                  jsx(SelectOrCustomField, {
                    value: player.desire1,
                    onChange: value => updateField({
                      desire1: value
                    }),
                    options: DESIRE_OPTIONS
                  }),
                  jsx(SelectOrCustomField, {
                    value: player.desire2,
                    onChange: value => updateField({
                      desire2: value
                    }),
                    options: DESIRE_OPTIONS
                  }),
                  jsx("div", {
                    className: styles.fieldStatLabel,
                    children: "1 you really don't"
                  }),
                  jsx(SelectOrCustomField, {
                    value: player.notDesire,
                    onChange: value => updateField({
                      notDesire: value
                    }),
                    options: DESIRE_OPTIONS
                  })
                ]
              })
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsxs("div", {
          className: styles.fieldRowNoSpread,
          children: [
            jsx("div", {
              className: styles.header,
              children: "BONDS"
            }),
            jsx("div", {
              className: styles.statDetail,
              children: "Change a bond: The other PC takes spark | Quarrel: Both take spark"
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsxs("div", {
          className: styles.fieldColumn,
          children: [
            player.bonds?.map((bond, index) => jsx(BondRow, {
              bond,
              onChange: nextBond => {
                const bonds = [ ...player.bonds ];
                const bondIndex = bonds.findIndex(entry => entry.id === nextBond.id);
                bonds[bondIndex] = nextBond;
                updateField({
                  bonds
                });
              },
              onRemove: () => {
                const bonds = [ ...player.bonds ];
                const bondIndex = bonds.findIndex(entry => entry.id === bond.id);
                bonds.splice(bondIndex, 1);
                updateField({
                  bonds
                });
              }
            }, `bond${index}`)),
            jsx("button", {
              className: styles.statButton,
              onClick: () => {
                const bonds = [
                  ...player.bonds,
                  {
                    id: Date.now(),
                    name: "",
                    intensity: "",
                    nature: ""
                  }
                ];
                updateField({
                  bonds
                });
              },
              children: "Add PC Bond"
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerSecondary
        }),
        jsxs("div", {
          className: styles.fieldRowNoSpread,
          children: [
            jsx("div", {
              className: styles.header,
              children: "STORY ARCS"
            }),
            jsx("div", {
              className: styles.statDetail,
              children: "Finish or move on: take a spark"
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsxs("div", {
          className: classNames(styles.fieldFullWidth, styles.fieldColumn),
          children: [
            jsx(TextField, {
              label: "Group Arc",
              onChange: value => updateField({
                groupArc: value
              }),
              value: player.groupArc
            }),
            jsx(TextField, {
              label: "Character Arc",
              onChange: value => updateField({
                characterArc: value
              }),
              value: player.characterArc
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsxs("div", {
          className: styles.fieldRowNoSpread,
          children: [
            jsx("div", {
              className: styles.header,
              children: "OTHER"
            }),
            jsx("div", {
              className: styles.statDetail,
              children: "Arcana, Character Notes, Notable Items"
            })
          ]
        }),
        jsx("img", {
          src: assets.dividerPrimary
        }),
        jsx(TextAreaField, {
          label: "",
          onChange: value => updateField({
            bio: value
          }),
          value: player.bio,
          width: 450
        })
      ]
    });
  };
}
