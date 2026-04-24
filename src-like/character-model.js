// Transitional compatibility module.
// New maintained runtime work should go into src/domain or src/screens instead.
import { CHARACTER_METADATA_KEY } from "./metadata.js";

export const createEmptyCharacter = (idFactory = () => Date.now()) => ({
  id: idFactory(),
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

export const buildCharacterCreatePatch = (metadata, character) => {
  const record = getCharacterMetadataRecord(metadata);
  record[character.id] = character;
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
