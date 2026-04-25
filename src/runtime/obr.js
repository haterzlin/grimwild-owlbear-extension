import { createObrClient } from "../vendor/obr-runtime.js";

export default function resolveObr() {
  if (globalThis.__grimwild_test_obr) return globalThis.__grimwild_test_obr;
  return createObrClient().obr;
}
