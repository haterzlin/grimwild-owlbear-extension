import { createEmptyCharacter } from "../../src/domain/characters.js";

export const buildCharacter = overrides => ({
  ...createEmptyCharacter(() => 1),
  ...overrides
});
