import { createObrClient } from "./obr-client.js";

export default function resolveObr() {
  if (globalThis.__grimwild_test_obr) return globalThis.__grimwild_test_obr;
  return createObrClient().obr;
}
