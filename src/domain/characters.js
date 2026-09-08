import {
  CHARACTER_METADATA_KEY,
  CE_RULES_VERSION,
  isSupportedCharacter,
  getCharactersFromMetadata
} from "../core/metadata.js";
import { getPathData, initializeTalent } from "./paths.js";

export { CE_RULES_VERSION, isSupportedCharacter };

export const createEmptyCharacter = (idFactory = () => Date.now()) => ({
  id: idFactory(),
  rulesVersion: CE_RULES_VERSION,
  name: "",
  path: "",
  player: "",
  background1: "",
  background2: "",
  wise1: "",
  wise2: "",
  groupArc: "",
  characterArc: "",
  features: "",
  conditions: "",
  brawn: 0,
  agility: 0,
  wits: 0,
  presence: 0,
  brawnMark: false,
  agilityMark: false,
  witsMark: false,
  presenceMark: false,
  bloodied: false,
  rattled: false,
  desperate: false,
  weaponStyle: "",
  story1: false,
  story2: false,
  spark1: false,
  spark2: false,
  experience: 0,
  trait1: "",
  trait2: "",
  notTrait: "",
  desire1: "",
  desire2: "",
  notDesire: "",
  bonds: [],
  talents: [],
  coreTalent: null,
  bio: ""
});

export const getCharacterMetadataRecord = metadata => ({
  ...(metadata?.[CHARACTER_METADATA_KEY] ?? {})
});

export const isImportableLegacyCharacter = character => Boolean(
  character &&
  typeof character.rulesVersion === "string" &&
  character.rulesVersion.length > 0 &&
  character.rulesVersion !== CE_RULES_VERSION &&
  isSupportedCharacter({ ...character, rulesVersion: CE_RULES_VERSION })
);

export const getConvertedFromCharacterIds = metadata => getCharactersFromMetadata(metadata)
  .filter(character => isSupportedCharacter(character) && Number.isInteger(character.convertedFrom))
  .map(character => character.convertedFrom)
  .filter((id, index, ids) => ids.indexOf(id) === index);

export const getCharacterGroupsFromMetadata = metadata => {
  const characters = getCharactersFromMetadata(metadata);
  const convertedFromIds = getConvertedFromCharacterIds(metadata);
  const supportedCharacters = characters.filter(isSupportedCharacter);
  const importableCharacters = characters.filter(character =>
    isImportableLegacyCharacter(character) && !convertedFromIds.includes(character.id)
  );

  return {
    supportedCharacters,
    importableCharacters,
    hiddenCharacters: characters.filter(character =>
      !supportedCharacters.includes(character) && !importableCharacters.includes(character)
    )
  };
};

export const getNextCharacterId = (metadata, idFactory = () => Date.now()) => {
  const usedIds = new Set(getCharactersFromMetadata(metadata)
    .map(character => character?.id)
    .filter(Number.isInteger));
  let id = idFactory();
  while (usedIds.has(id)) id += 1;
  return id;
};

export const buildConvertedCharacter = (oldCharacter, {
  id,
  pathsById = {},
  backgroundTalents = []
} = {}) => {
  const pathId = pathsById[oldCharacter.path]
    ? oldCharacter.path
    : oldCharacter.path?.toLowerCase();
  const pathData = getPathData(pathsById, pathId);
  if (!pathData) return null;

  const {
    id: oldId,
    rulesVersion: oldRulesVersion,
    coreTalent: oldCoreTalent,
    talents: oldTalents,
    convertedFrom: oldConvertedFrom,
    lastEdit,
    ...preservedData
  } = oldCharacter;
  const currentTalents = [
    ...Object.values(pathsById).flatMap(path => path?.pathTalent ?? []),
    ...backgroundTalents
  ];
  const talentsByName = new Map(currentTalents.map(talent => [talent.name, talent]));

  return {
    ...createEmptyCharacter(() => id),
    ...preservedData,
    id,
    rulesVersion: CE_RULES_VERSION,
    path: pathId,
    coreTalent: initializeTalent(pathData.coreTalent),
    talents: (Array.isArray(oldTalents) ? oldTalents : [])
      .map(talent => talentsByName.get(talent?.name))
      .filter(Boolean)
      .map(initializeTalent),
    convertedFrom: oldId
  };
};

export const getUnsupportedCharactersFromMetadata = metadata =>
  Object.values(metadata?.[CHARACTER_METADATA_KEY] ?? {})
    .filter(character => !isSupportedCharacter(character));

export const getAttributeRollModifiers = ({ stat, marked, bloodied, rattled, desperate }) => ({
  thorns:
    (bloodied && ["brawn", "agility"].includes(stat) ? 1 : 0) +
    (rattled && ["wits", "presence"].includes(stat) ? 1 : 0) +
    (desperate ? 1 : 0) +
    (marked ? 1 : 0),
  clearsMark: Boolean(marked)
});

export const buildCharacterCreatePatch = (metadata, character) => {
  const record = getCharacterMetadataRecord(metadata);
  if (isSupportedCharacter(character)) record[character.id] = character;
  return {
    [CHARACTER_METADATA_KEY]: record
  };
};

export const buildCharacterRemovePatch = (metadata, characterId) => {
  const record = getCharacterMetadataRecord(metadata);
  delete record[characterId];
  return {
    [CHARACTER_METADATA_KEY]: record
  };
};

export const getCharacterRowViewModel = (character, pathAssets) => {
  const pathKey = character.path ? character.path.toLowerCase() : "";
  return {
    name: character.name,
    pathLabel: character.path || "-",
    artSrc: pathKey && pathAssets[pathKey] ? pathAssets[pathKey] : null
  };
};
