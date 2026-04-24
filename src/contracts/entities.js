/**
 * @typedef {Object} GrimwildBond
 * @property {number} id
 * @property {string} name
 * @property {string} intensity
 * @property {string} nature
 */

/**
 * @typedef {Object} GrimwildTalentTracker
 * @property {string} [label]
 * @property {string|number|boolean|null} [value]
 */

/**
 * @typedef {Object} GrimwildTalent
 * @property {string} name
 * @property {string} [description]
 * @property {GrimwildTalentTracker[]} [trackers]
 */

/**
 * @typedef {Object} GrimwildCharacter
 * @property {number} id
 * @property {string} name
 * @property {string} path
 * @property {string} player
 * @property {string} background1
 * @property {string} background2
 * @property {string} wise1
 * @property {string} wise2
 * @property {string} groupArc
 * @property {string} characterArc
 * @property {string} features
 * @property {string} conditions
 * @property {number} brawn
 * @property {number} agility
 * @property {number} wits
 * @property {number} presence
 * @property {boolean} brawnMark
 * @property {boolean} agilityMark
 * @property {boolean} witsMark
 * @property {boolean} presenceMark
 * @property {boolean} bloodied
 * @property {boolean} rattled
 * @property {boolean} story1
 * @property {boolean} story2
 * @property {boolean} spark1
 * @property {boolean} spark2
 * @property {number} experience
 * @property {string} trait1
 * @property {string} trait2
 * @property {string} notTrait
 * @property {string} desire1
 * @property {string} desire2
 * @property {string} notDesire
 * @property {GrimwildBond[]} bonds
 * @property {GrimwildTalent[]} talents
 * @property {GrimwildTalent|null} coreTalent
 * @property {string} bio
 * @property {string} [lastEdit]
 */

/**
 * @typedef {Object} GrimwildPool
 * @property {number} id
 * @property {string} name
 * @property {number} value
 * @property {string} [lastEdit]
 */

/**
 * @typedef {Object} GrimwildRollEntry
 * @property {number} id
 * @property {string} user
 * @property {number[]} [dice]
 * @property {number[]} [thorns]
 * @property {string[]} [thornEffect]
 * @property {string} [outcome]
 * @property {boolean} [gmRoll]
 */

/**
 * @typedef {Object} GrimwildDescriptionEntry
 * @property {number} id
 * @property {string} user
 * @property {string} description
 * @property {boolean} [gmRoll]
 */

/**
 * @typedef {Object} GrimwildMessageEntry
 * @property {number} id
 * @property {string} user
 * @property {string} message
 */

/**
 * @typedef {GrimwildRollEntry | GrimwildDescriptionEntry | GrimwildMessageEntry} GrimwildChatEntry
 */

/**
 * @typedef {Object} GrimwildGmState
 * @property {string} suspense
 */

/**
 * @typedef {Object.<string, GrimwildCharacter>} CharacterMetadataRecord
 */

/**
 * @typedef {Object.<string, GrimwildPool>} PoolMetadataRecord
 */

/**
 * @typedef {Object.<string, GrimwildChatEntry[]>} ChatMetadataRecord
 */

/**
 * @typedef {Object} SceneMetadataShape
 * @property {CharacterMetadataRecord} ["grimwild.character.extension/metadata"]
 * @property {PoolMetadataRecord} ["grimwild.pool.extension/metadata"]
 * @property {ChatMetadataRecord} ["grimwild.extension/metadata"]
 * @property {GrimwildGmState} ["grimwild.gm.extension/metadata"]
 * @property {number} ["grimwild.date.extension/metadata"]
 */
