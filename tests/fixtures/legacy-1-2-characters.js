const CHARACTER_METADATA_KEY = "grimwild.character.extension/metadata";

const baseCharacter = {
  player: "Legacy Player",
  background1: "Wanderer",
  background2: "Scout",
  wise1: "old roads",
  wise2: "campfire rumors",
  groupArc: "Protect the caravan",
  characterArc: "Prove myself",
  features: "travel-worn cloak; watchful eyes; scarred hands",
  conditions: "",
  brawn: 2,
  agility: 2,
  wits: 2,
  presence: 1,
  brawnMark: false,
  agilityMark: false,
  witsMark: false,
  presenceMark: false,
  bloodied: false,
  rattled: false,
  story1: false,
  story2: false,
  spark1: false,
  spark2: false,
  experience: 3,
  trait1: "Brave",
  trait2: "Curious",
  notTrait: "Quiet",
  desire1: "Justice",
  desire2: "Renown",
  notDesire: "Power",
  bonds: [
    {
      id: 1,
      name: "Ally One",
      intensity: "Growing",
      nature: "Respect"
    }
  ],
  bio: "Frozen 1.2-era compatibility fixture."
};

const checkboxTracker = (name, checked = false) => ({
  name,
  type: "checkbox",
  checked
});

const fieldTracker = (name, value1) => ({
  name,
  type: "field",
  value1
});

const fieldSmallTracker = (name, value1) => ({
  name,
  type: "fieldSmall",
  value1
});

const fieldSmallLongTracker = (name, value1) => ({
  name,
  type: "fieldSmallLong",
  value1
});

const fieldTwoTracker = (name, value1, value2) => ({
  name,
  type: "fieldTwo",
  value1,
  value2
});

const buildLegacyCharacter = ({
  id,
  name,
  path,
  coreTalent,
  talents,
  overrides = {}
}) => ({
  ...baseCharacter,
  id,
  name,
  path,
  coreTalent,
  talents,
  ...overrides
});

export const LEGACY_FREE_PATH_IDS = [
  "bard",
  "berserker",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard"
];

export const LEGACY_1_2_CHARACTERS = [
  buildLegacyCharacter({
    id: 101,
    name: "Legacy Bard",
    path: "bard",
    coreTalent: {
      name: "BARDSONG",
      description: "Legacy 1.2 snapshot of the bard core talent.",
      trackers: [
        checkboxTracker("Bardsongs", true),
        checkboxTracker("", false),
        checkboxTracker("", false),
        checkboxTracker("", true),
        checkboxTracker("", false),
        checkboxTracker("Melodies", true),
        checkboxTracker("", false),
        checkboxTracker("", false),
        checkboxTracker("", true),
        checkboxTracker("", false)
      ]
    },
    talents: [
      {
        name: "BARDIC LORE",
        description: "Legacy 1.2 snapshot of a bard talent.",
        trackers: [ checkboxTracker("Story", true) ]
      }
    ],
    overrides: {
      presence: 3,
      trait2: "Honest",
      desire2: "Harmony"
    }
  }),
  buildLegacyCharacter({
    id: 102,
    name: "Legacy Berserker",
    path: "berserker",
    coreTalent: {
      name: "FRENZY",
      description: "Legacy 1.2 snapshot of the berserker core talent.",
      trackers: [
        checkboxTracker("Frenzy", true),
        checkboxTracker("", false),
        checkboxTracker("", false)
      ]
    },
    talents: [
      {
        name: "Flesh Wounds",
        description: "Legacy 1.2 snapshot of a berserker talent.",
        trackers: [
          checkboxTracker("Wounds", true),
          checkboxTracker("", false),
          checkboxTracker("", false),
          checkboxTracker("", false),
          checkboxTracker("", false)
        ]
      }
    ],
    overrides: {
      brawn: 3,
      bloodied: true
    }
  }),
  buildLegacyCharacter({
    id: 103,
    name: "Legacy Cleric",
    path: "cleric",
    coreTalent: {
      name: "CHANNEL DIVINITY",
      description: "Legacy 1.2 snapshot of the cleric core talent.",
      trackers: [
        fieldTwoTracker("Major", "Radiance", "6"),
        fieldTwoTracker("Minor", "Warding", "4"),
        fieldTwoTracker("Minor", "Healing", "4")
      ]
    },
    talents: [
      {
        name: "IRON WILL",
        description: "Legacy 1.2 snapshot of a cleric talent.",
        trackers: [ fieldTracker("Iron Will", "3") ]
      }
    ],
    overrides: {
      presence: 3,
      story1: true
    }
  }),
  buildLegacyCharacter({
    id: 104,
    name: "Legacy Druid",
    path: "druid",
    coreTalent: {
      name: "WILD SHAPE",
      description: "Legacy 1.2 snapshot of the druid core talent.",
      trackers: [ fieldTracker("Wild Shape", "4") ]
    },
    talents: [
      {
        name: "PRIMORDIAL BONDS",
        description: "Legacy 1.2 snapshot of a druid talent.",
        trackers: [
          checkboxTracker("Air", true),
          checkboxTracker("Earth", false),
          checkboxTracker("Fire", true),
          checkboxTracker("Water", false),
          checkboxTracker("Deep Bond", true)
        ]
      }
    ],
    overrides: {
      wits: 3
    }
  }),
  buildLegacyCharacter({
    id: 105,
    name: "Legacy Fighter",
    path: "fighter",
    coreTalent: {
      name: "WEAPON MASTERY",
      description: "Legacy 1.2 snapshot of the fighter core talent.",
      trackers: [ fieldSmallTracker("Fighting Style", "two-handed") ]
    },
    talents: [
      {
        name: "BULWARK",
        description: "Legacy 1.2 snapshot of a fighter talent.",
        trackers: [ fieldTracker("Bulwark", "3") ]
      }
    ],
    overrides: {
      brawn: 3,
      agility: 1
    }
  }),
  buildLegacyCharacter({
    id: 106,
    name: "Legacy Monk",
    path: "monk",
    coreTalent: {
      name: "DISCIPLINE",
      description: "Legacy 1.2 snapshot of the monk core talent.",
      trackers: [
        checkboxTracker("Flow", true),
        checkboxTracker("", false),
        checkboxTracker("", false),
        checkboxTracker("", true),
        checkboxTracker("", false),
        checkboxTracker("", false),
        checkboxTracker("", false),
        checkboxTracker("Inter.", true),
        checkboxTracker("", false),
        checkboxTracker("", false)
      ]
    },
    talents: [
      {
        name: "Primordial Forces",
        description: "Legacy 1.2 snapshot of a monk talent.",
        trackers: [
          checkboxTracker("Air", false),
          checkboxTracker("Earth", true),
          checkboxTracker("Fire", false),
          checkboxTracker("Water", false)
        ]
      }
    ],
    overrides: {
      agility: 3
    }
  }),
  buildLegacyCharacter({
    id: 107,
    name: "Legacy Paladin",
    path: "paladin",
    coreTalent: {
      name: "OATHSWORN",
      description: "Legacy 1.2 snapshot of the paladin core talent.",
      trackers: [
        checkboxTracker("Smite", true),
        checkboxTracker("", true),
        checkboxTracker("", false),
        checkboxTracker("Tenet", false),
        checkboxTracker("", false),
        checkboxTracker("", false),
        fieldSmallLongTracker("Tenet 1", "Protect the innocent"),
        fieldSmallLongTracker("Tenet 2", "Speak the truth"),
        fieldSmallLongTracker("Tenet 3", "Stand against darkness")
      ]
    },
    talents: [
      {
        name: "SANCTIFIED WEAPON",
        description: "Legacy 1.2 snapshot of a paladin talent.",
        trackers: [ fieldTwoTracker("Domain", "Radiance", "4") ]
      }
    ],
    overrides: {
      presence: 2,
      spark1: true
    }
  }),
  buildLegacyCharacter({
    id: 108,
    name: "Legacy Ranger",
    path: "ranger",
    coreTalent: {
      name: "HUNTER’S MARK",
      description: "Legacy 1.2 snapshot of the ranger core talent.",
      trackers: [
        checkboxTracker("Weakness", true),
        checkboxTracker("", false),
        checkboxTracker("", false),
        checkboxTracker("", true),
        checkboxTracker("", false)
      ]
    },
    talents: [
      {
        name: "SCOUT AHEAD",
        description: "Legacy 1.2 snapshot of a ranger talent.",
        trackers: [ checkboxTracker("Story", true) ]
      }
    ],
    overrides: {
      agility: 3,
      story2: true
    }
  }),
  buildLegacyCharacter({
    id: 109,
    name: "Legacy Rogue",
    path: "rogue",
    coreTalent: {
      name: "EXPERTISE",
      description: "Legacy 1.2 snapshot of the rogue core talent.",
      trackers: [ fieldTracker("Expertise", "locks, disguises, traps") ]
    },
    talents: [
      {
        name: "CONTINGENCY",
        description: "Legacy 1.2 snapshot of a rogue talent.",
        trackers: [ fieldTracker("Contingency", "3") ]
      }
    ],
    overrides: {
      agility: 3,
      trait2: "Quiet"
    }
  }),
  buildLegacyCharacter({
    id: 110,
    name: "Legacy Sorcerer",
    path: "sorcerer",
    coreTalent: {
      name: "SORCERY",
      description: "Legacy 1.2 snapshot of the sorcerer core talent.",
      trackers: [ fieldSmallLongTracker("Magic Paths & Techniques", "flame, shadow, attack, traverse") ]
    },
    talents: [
      {
        name: "SPELLEATER",
        description: "Legacy 1.2 snapshot of a sorcerer talent.",
        trackers: [
          fieldTracker("Spelleater", "3"),
          checkboxTracker("Essence", true),
          checkboxTracker("", false)
        ]
      }
    ],
    overrides: {
      presence: 3,
      rattled: true
    }
  }),
  buildLegacyCharacter({
    id: 111,
    name: "Legacy Warlock",
    path: "warlock",
    coreTalent: {
      name: "PACT",
      description: "Legacy 1.2 snapshot of the warlock core talent.",
      trackers: [
        fieldTracker("Patience", "8"),
        fieldTracker("Gifts", "3"),
        fieldTracker("", "5")
      ]
    },
    talents: [
      {
        name: "VISIONS",
        description: "Legacy 1.2 snapshot of a warlock talent."
      }
    ],
    overrides: {
      characterArc: "Appease my patron"
    }
  }),
  buildLegacyCharacter({
    id: 112,
    name: "Legacy Wizard",
    path: "wizard",
    coreTalent: {
      name: "SPELLCRAFT",
      description: "Legacy 1.2 snapshot of the wizard core talent.",
      trackers: [
        fieldTracker("Spells", "4"),
        fieldTracker("Potent Spells", "2"),
        fieldSmallLongTracker("Theorems", "Shadow Gate"),
        fieldSmallLongTracker("Theorems", "Glass Beacon")
      ]
    },
    talents: [
      {
        name: "ALCHEMIST",
        description: "Legacy 1.2 snapshot of a wizard talent.",
        trackers: [ fieldTracker("Potions", "4") ]
      }
    ],
    overrides: {
      wits: 3,
      wise2: "forbidden libraries"
    }
  })
];

export const LEGACY_1_2_MESSY_CHARACTERS = [
  buildLegacyCharacter({
    id: 201,
    name: "Legacy Bard Messy",
    path: "bard",
    coreTalent: {
      name: "BARDSONG",
      description: "Messy 1.2 snapshot with extra and missing tracker data.",
      trackers: [
        checkboxTracker("Bardsongs", true),
        checkboxTracker("", false),
        checkboxTracker("", true),
        checkboxTracker("Unexpected", true)
      ]
    },
    talents: [
      {
        name: "INFLUENCE",
        description: "Legacy 1.2 snapshot with sparse tracker data.",
        trackers: [ checkboxTracker("Influence", false) ]
      }
    ]
  }),
  buildLegacyCharacter({
    id: 202,
    name: "Legacy Cleric Messy",
    path: "cleric",
    coreTalent: {
      name: "CHANNEL DIVINITY",
      description: "Messy 1.2 snapshot with incomplete fieldTwo trackers.",
      trackers: [
        fieldTwoTracker("Major", "Radiance", ""),
        fieldTwoTracker("Minor", "Warding", undefined),
        fieldTwoTracker("Minor", "", "4")
      ]
    },
    talents: [
      {
        name: "SERMONS",
        description: "Legacy 1.2 snapshot with partially filled trackers.",
        trackers: [
          checkboxTracker("Push", true),
          checkboxTracker("Ritual", false)
        ]
      }
    ]
  }),
  buildLegacyCharacter({
    id: 203,
    name: "Legacy Paladin Messy",
    path: "paladin",
    coreTalent: {
      name: "OATHSWORN",
      description: "Messy 1.2 snapshot with short tenet list.",
      trackers: [
        checkboxTracker("Smite", true),
        checkboxTracker("", false),
        checkboxTracker("", false),
        fieldSmallLongTracker("Tenet 1", "Never abandon a companion")
      ]
    },
    talents: [
      {
        name: "CHALLENGE",
        description: "Legacy 1.2 snapshot without expected tracker data."
      }
    ]
  }),
  buildLegacyCharacter({
    id: 204,
    name: "Legacy Wizard Messy",
    path: "wizard",
    coreTalent: {
      name: "SPELLCRAFT",
      description: "Messy 1.2 snapshot with old theorem storage shape.",
      trackers: [
        fieldTracker("Spells", "3"),
        fieldTracker("Potent Spells", "1"),
        fieldSmallLongTracker("Theorems", "Spirit Gate")
      ]
    },
    talents: [
      {
        name: "MASTERED THEOREM",
        description: "Legacy 1.2 snapshot of a wizard talent.",
        trackers: [ checkboxTracker("Potent", true) ]
      }
    ]
  })
];

export const buildLegacyCharacterMetadata = (characters = LEGACY_1_2_CHARACTERS) => {
  const record = {};

  for (const character of characters) record[character.id] = character;

  return {
    [CHARACTER_METADATA_KEY]: record
  };
};
