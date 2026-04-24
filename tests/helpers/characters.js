import { createEmptyCharacter } from "../../src-like/character-model.js";

export const buildCharacter = overrides => ({
  ...createEmptyCharacter(() => 1),
  ...overrides
});
