import { bootRuntime } from "./runtime/entry.js";

if (new URLSearchParams(window.location.search).get("mockOwlbear") === "1") {
  await import("../test/mock-obr.js");
}

bootRuntime({
  routeMode: "chatpopover"
});
