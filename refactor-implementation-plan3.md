# Grimwild De-Hybridization Implementation Plan

## Overview

Goal: remove the remaining hybrid runtime layer from the Grimwild extension and end up with a normal source-built application that preserves current behavior, metadata compatibility, and Playwright coverage.

Chosen direction:
- Add a minimal Vite build that emits the browser artifact loaded by the extension.
- Replace the vendored Owlbear runtime with a thin local adapter around the browser/Owlbear API that the extension actually uses.
- Replace the vendored React runtime with standard `react` and `react-dom`.
- Keep the current screen factory pattern during the migration so the work stays focused on runtime replacement rather than UI rewrites.

Current codebase state relevant to this plan:
- Maintained browser bootstrap:
  - [src/runtime/entry.js](./src/runtime/entry.js)
  - [src/runtime/obr.js](./src/runtime/obr.js)
  - [src/runtime/rolls.js](./src/runtime/rolls.js)
  - [src/runtime/assets.js](./src/runtime/assets.js)
  - [src/runtime/styles.js](./src/runtime/styles.js)
  - [src/runtime/class-names.js](./src/runtime/class-names.js)
- Remaining vendored hybrid runtime:
  - former React runtime now replaced by [src/runtime/react-runtime.js](./src/runtime/react-runtime.js)
  - [src/runtime/obr-client.js](./src/runtime/obr-client.js) still carries the Owlbear integration boundary
- Current app shell and source-owned screen logic:
  - [src/app/AppShell.js](./src/app/AppShell.js)
  - [src/screens/CharacterList.js](./src/screens/CharacterList.js)
  - [src/screens/CharacterSheet.js](./src/screens/CharacterSheet.js)
  - [src/screens/PathScreen.js](./src/screens/PathScreen.js)
  - [src/screens/PoolsAndChat.js](./src/screens/PoolsAndChat.js)
- Core runtime and metadata behavior:
  - [src/core/app-shell-state.js](./src/core/app-shell-state.js)
  - [src/core/metadata.js](./src/core/metadata.js)
  - [src/core/data-loader.js](./src/core/data-loader.js)
- Mock/runtime test seam:
  - [test/mock-obr.js](./test/mock-obr.js)
- Extension entry pages:
  - [index.html](./index.html)
  - [chatpopover/index.html](./chatpopover/index.html)
  - [manifest.json](./manifest.json)
- Current test harness:
  - [package.json](./package.json)
  - [playwright.config.js](./playwright.config.js)
  - [tests](./tests)

Important constraints:
- Metadata keys and metadata shapes must stay compatible:
  - `grimwild.character.extension/metadata`
  - `grimwild.pool.extension/metadata`
  - `grimwild.extension/metadata`
  - `grimwild.gm.extension/metadata`
  - `grimwild.date.extension/metadata`
- Popover behavior must keep working through `/chatpopover`.
- The app already works through source-owned logic, so this plan should avoid rewriting screens unless the runtime migration strictly requires it.
- Every phase must end in a runnable and testable state.

Implementation guardrails:
- Keep the current source screen factories intact until runtime replacement is complete.
- Prefer small runtime seams over importing a large official client or another vendored compatibility blob.
- Treat Playwright as the acceptance gate for each phase.
- Keep generated browser artifacts out of the “edit here” path; source files should remain the canonical implementation.

---

## Phase 1: Add A Real Build Pipeline Around The Existing Source Runtime

- [x] Introduce a minimal Vite build that produces the extension browser entry.
- [x] Move the maintained browser entry to an explicit source build input instead of relying on a handwritten artifact import chain.
- [x] Keep runtime behavior unchanged while establishing generated output discipline.

### Relevant context

- Current handwritten browser entry:
  - [assets/index.js](./assets/index.js)
- Maintained source bootstrap:
  - [src/runtime/entry.js](./src/runtime/entry.js)
- Extension entry pages:
  - [index.html](./index.html)
  - [chatpopover/index.html](./chatpopover/index.html)
- Current package scripts only cover tests:
  - [package.json](./package.json)

### Deliverable

A working Vite configuration and source entry setup where:
- the extension is built from source-owned inputs
- `assets/index.js` becomes generated output or a generated-compatible artifact
- both `/` and `/chatpopover` still boot the app correctly
- there is a clear `build` workflow in the repository

### Suggested implementation steps

- Add Vite and the minimal config needed to build this extension shape.
- Define a canonical source entry such as:
  - `src/main.js`
  - `src/chatpopover-main.js`
  or an equivalent two-entry setup.
- Point both HTML entry pages at the build-generated script path.
- Keep the current source bootstrap in [`src/runtime/`](./src/runtime) as the behavioral entry.
- Update docs so `assets/index.js` is no longer treated as a hand-maintained file.

### Verify and test

- Verify the project can produce a browser build from source with a single build command.
- Verify the built app loads at:
  - `/`
  - `/chatpopover`
- Verify the extension manifest still points at a valid runtime.
- Run focused checks:
  - `npm run test:character-list`
  - `npm run test:pools`
- Run full suite:
  - `npm run test:e2e`

### Current implementation completed

- Added Vite build configuration in [vite.config.js](./vite.config.js).
- Added explicit source entry modules:
  - [src/main.js](./src/main.js)
  - [src/chatpopover-main.js](./src/chatpopover-main.js)
- Updated [index.html](./index.html) and [chatpopover/index.html](./chatpopover/index.html) to load source entry modules.
- Added build workflow scripts in [package.json](./package.json).
- Removed external Google Fonts from both HTML entry pages and switched [assets/index.css](./assets/index.css) to a local serif stack so Playwright page loads do not stall on remote font fetches.

### Current verification completed

- `node --check vite.config.js`
- `node --check src/main.js`
- `node --check src/chatpopover-main.js`
- `npm run build`
- User-reported Playwright runs after the font fix

---

## Phase 2: Replace The Vendored React Runtime With Standard React/ReactDOM

- [x] Remove the dependency on the former vendored React runtime.
- [x] Keep the current screen factory pattern while swapping to standard `react` / `react-dom`.
- [x] Preserve all current rendering behavior and route/popover flows.

### Relevant context

- Current vendored React runtime:
  - replaced by [src/runtime/react-runtime.js](./src/runtime/react-runtime.js)
- Current bootstrap imports:
  - [src/runtime/entry.js](./src/runtime/entry.js)
- Current screens and app shell accept injected runtime objects:
  - [src/app/AppShell.js](./src/app/AppShell.js)
  - [src/screens/CharacterList.js](./src/screens/CharacterList.js)
  - [src/screens/CharacterSheet.js](./src/screens/CharacterSheet.js)
  - [src/screens/PathScreen.js](./src/screens/PathScreen.js)
  - [src/screens/PoolsAndChat.js](./src/screens/PoolsAndChat.js)

### Deliverable

The app renders through standard React packages:
- `react`
- `react-dom/client`

while preserving the current source module structure and current UI behavior.

### Suggested implementation steps

- Add `react` and `react-dom` to the project.
- Replace `createRoot`, `jsxRuntime`, and `React` imports in [src/runtime/entry.js](./src/runtime/entry.js) with standard package imports.
- If needed, add a small compatibility wrapper that exposes:
  - `jsx`
  - `jsxs`
  - `Fragment`
  so the current screen factory signatures can stay stable during this phase.
- Confirm the app shell and all screen factories still render without touching product behavior.
- Delete or retire the former vendored React runtime once the build is green.

### Verify and test

- Verify the extension still boots from the built output.
- Verify character, path, pools, and chat screens still render.
- Verify the popover route still renders chat-only mode.
- Run focused checks:
  - `npm run test:character-sheet`
  - `npm run test:paths`
  - `npm run test:pools`
- Run full suite:
  - `npm run test:e2e`

### Current implementation completed

- Added [src/runtime/react-runtime.js](./src/runtime/react-runtime.js) as a small compatibility wrapper over:
  - `react`
  - `react-dom/client`
  - `react/jsx-runtime`
- Switched [src/runtime/entry.js](./src/runtime/entry.js) to import React runtime primitives from [src/runtime/react-runtime.js](./src/runtime/react-runtime.js).
- Deleted the live vendored React runtime file at `src/vendor/react-runtime.js`.
- Updated architecture docs to treat standard React packages as the active rendering runtime.

### Current verification completed

- `node --check src/runtime/react-runtime.js`
- `node --check src/runtime/entry.js`
- `npm run build`
- User-reported Playwright runs outside the sandbox

---

## Phase 3: Replace The Vendored Owlbear Runtime With A Thin Local Adapter

- [x] Remove the dependency on [src/vendor/obr-runtime.js](./src/vendor/obr-runtime.js).
- [x] Introduce a local OBR adapter that only implements the APIs this extension actually uses.
- [x] Keep the existing mock runtime and Playwright tests as the verification seam.

### Relevant context

- Current vendored OBR runtime:
  - replaced by [src/runtime/obr-client.js](./src/runtime/obr-client.js)
- Current OBR resolution seam:
  - [src/runtime/obr.js](./src/runtime/obr.js)
- OBR-dependent source modules:
  - [src/runtime/entry.js](./src/runtime/entry.js)
  - [src/runtime/rolls.js](./src/runtime/rolls.js)
  - [src/app/AppShell.js](./src/app/AppShell.js)
  - [src/core/app-shell-state.js](./src/core/app-shell-state.js)
  - [src/screens/CharacterList.js](./src/screens/CharacterList.js)
  - [src/screens/PathScreen.js](./src/screens/PathScreen.js)
  - [src/screens/PoolsAndChat.js](./src/screens/PoolsAndChat.js)
- Mock OBR contract used in tests:
  - [test/mock-obr.js](./test/mock-obr.js)

### Deliverable

A source-owned OBR adapter in `src/runtime/*` that covers the subset this extension actually uses, including:
- readiness
- player identity and role
- scene metadata get/set and subscriptions
- action badge/open state
- popover open/close
- room id

### Suggested implementation steps

- Inventory exactly which OBR methods are used from `src/*`.
- Create a local client module, for example:
  - `src/runtime/obr-client.js`
  - `src/runtime/obr-message-bus.js`
- Implement only the needed message contracts and surface shape.
- Keep [src/runtime/obr.js](./src/runtime/obr.js) as the single resolution point between:
  - test mock runtime
  - real browser/Owlbear runtime
- Remove [src/vendor/obr-runtime.js](./src/vendor/obr-runtime.js) after source adapter parity is verified.
- Update the mock only if the source adapter changes observable expectations.

### Verify and test

- Verify the extension still connects to Owlbear and loads scene metadata.
- Verify metadata writes still update:
  - characters
  - pools
  - chat
  - GM suspense
- Verify the chat popover still opens and closes correctly.
- Run focused checks:
  - `npm run test:character-list`
  - `npm run test:talents`
  - `npm run test:pools`
- Run full suite:
  - `npm run test:e2e`

### Current implementation completed

- Added [src/runtime/obr-reference.js](./src/runtime/obr-reference.js) to parse `obrref` from the current URL.
- Added [src/runtime/obr-client.js](./src/runtime/obr-client.js) as a source-owned `postMessage` client for the exact Owlbear APIs this extension uses:
  - ready handshake
  - player id/name/role/change
  - scene ready/metadata/change
  - action badge/open state
  - popover open/close
  - room id
- Switched [src/runtime/obr.js](./src/runtime/obr.js) to resolve the new source-owned client instead of the vendored runtime.
- Deleted the vendored Owlbear runtime file at `src/vendor/obr-runtime.js`.

### Current verification completed

- `node --check src/runtime/obr-reference.js`
- `node --check src/runtime/obr-client.js`
- `node --check src/runtime/obr.js`
- `node --check src/runtime/entry.js`
- `npm run build`
- User-side Playwright and Owlbear verification still required outside the sandbox

---

## Phase 4: Normalize Entry Pages, Popover Routing, And Runtime Boundaries

- [x] Replace the remaining ad hoc entry-page wiring with explicit source-owned route bootstraps.
- [x] Make `/` and `/chatpopover` first-class build/runtime entrypoints.
- [x] Remove residual compatibility assumptions from docs and repository layout.

### Relevant context

- Current extension page entrypoints:
  - [index.html](./index.html)
  - [chatpopover/index.html](./chatpopover/index.html)
- Current popover route logic:
  - [src/core/app-shell-state.js](./src/core/app-shell-state.js)
  - [src/app/AppShell.js](./src/app/AppShell.js)
- Manifest integration:
  - [manifest.json](./manifest.json)
- Current browser bootstrap:
  - [src/runtime/entry.js](./src/runtime/entry.js)

### Deliverable

A clear route/bootstrap model where:
- the main extension page and chat popover page are intentionally defined
- the build produces both entrypoints
- docs and repository structure describe this as normal application architecture, not a compatibility transition

### Suggested implementation steps

- Split route-specific boot logic if needed between main and popover entry modules.
- Keep shared app bootstrap in common runtime modules.
- Ensure popover route detection remains stable and readable.
- Remove any leftover “thin compatibility artifact” language that no longer applies after the build/runtime swap.
- Update docs to describe the extension as a standard built app.

### Verify and test

- Verify `/` still renders the full extension shell.
- Verify `/chatpopover` renders the chat-only experience.
- Verify the `Popover` button opens a visible popup and the popup `Close` button closes it.
- Run focused checks:
  - `npm run test:pools`
- Run full suite:
  - `npm run test:e2e`

### Current implementation completed

- Changed [src/main.js](./src/main.js) to boot the shared runtime explicitly in `main` mode.
- Changed [src/chatpopover-main.js](./src/chatpopover-main.js) to boot the shared runtime explicitly in `chatpopover` mode.
- Refactored [src/runtime/entry.js](./src/runtime/entry.js) to export a shared `bootRuntime({ routeMode })` bootstrap instead of auto-booting on import.
- Updated [src/app/AppShell.js](./src/app/AppShell.js) to receive `routeMode` from the bootstrap and removed location-based popover inference.
- Removed the obsolete `isChatPopoverLocation(...)` helper from [src/core/app-shell-state.js](./src/core/app-shell-state.js).
- Updated active docs to describe `/` and `/chatpopover` as explicit source-owned entrypoints.

### Current verification completed

- `node --check src/main.js`
- `node --check src/chatpopover-main.js`
- `node --check src/runtime/entry.js`
- `node --check src/app/AppShell.js`
- `node --check src/core/app-shell-state.js`
- `npm run build`
- User-side Playwright verification still required outside the sandbox

---

## Phase 5: Remove Remaining Hybrid/Vendored Runtime Artifacts And Finalize Maintenance Workflow

- [x] Delete the remaining vendored runtime files and obsolete compatibility scaffolding.
- [x] Finalize scripts and docs so future work targets only maintained source code.
- [x] Leave the repository in a normal “source + build + tests” state.

### Relevant context

- Vendored runtime remnants to eliminate by the end:
  - none after Phase 3
- Active repository guidance:
  - [README.md](./README.md)
  - [docs/source-architecture.md](./docs/source-architecture.md)
  - [docs/developer-guide.md](./docs/developer-guide.md)
  - [docs/runtime-map.md](./docs/runtime-map.md)

### Deliverable

A finished repository shape where:
- the app is built from source
- `src/*` is the full source of truth
- no vendored recovered runtime files remain on the live path
- the developer workflow is documented as a normal build/test workflow

### Suggested implementation steps

- Remove obsolete vendored runtime files and compatibility wrappers.
- Remove any unused compatibility helpers left behind by earlier phases.
- Add or finalize package scripts for:
  - `build`
  - `test:e2e`
  - any useful local preview workflow
- Refresh docs so they describe the new normal architecture, not the migration state.
- Keep the archival bundle notes only if they still provide forensic value.

### Verify and test

- Verify there are no live imports from `src/vendor/*`.
- Verify the build output is generated from maintained source only.
- Verify the extension can still be served locally and installed from `manifest.json`.
- Run focused checks:
  - `npm run test:character-list`
  - `npm run test:character-sheet`
  - `npm run test:paths`
  - `npm run test:talents`
  - `npm run test:pools`
- Run full suite:
  - `npm run test:e2e`

### Current implementation completed

- Removed the obsolete browser shim file:
  - `assets/index.js`
- Finalized the active runtime documentation around:
  - [index.html](./index.html)
  - [chatpopover/index.html](./chatpopover/index.html)
  - [src/main.js](./src/main.js)
  - [src/chatpopover-main.js](./src/chatpopover-main.js)
  - [src/runtime/entry.js](./src/runtime/entry.js)
- Removed stale “legacy shim” guidance from the active docs and kept [docs/runtime-map.md](./docs/runtime-map.md) only as a historical bundle reference.
- Left the repository in a source/build/test layout with no live `src/vendor/*` imports and no active compatibility entrypoint.

### Current verification completed

- `node --check src/main.js`
- `node --check src/chatpopover-main.js`
- `node --check src/runtime/entry.js`
- `npm run build`
- User-reported green Playwright suite

---

## Completion Criteria

- [x] The extension builds from a normal source-owned build pipeline.
- [x] Standard `react` / `react-dom` replace the vendored React runtime.
- [x] A thin local OBR adapter replaces the vendored Owlbear runtime for the APIs this extension actually uses.
- [x] `/` and `/chatpopover` are both source-owned built entrypoints.
- [x] No live runtime imports remain from `src/vendor/*`.
- [x] The full Playwright suite passes from [tests](./tests).
- [x] The docs describe a normal source/build/test workflow with `src/*` as the only implementation target.
