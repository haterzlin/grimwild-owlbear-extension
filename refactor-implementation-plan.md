# Grimwild Extension Refactor Plan

## Overview

Goal: make the recovered Owlbear Rodeo Grimwild extension readable and maintainable without breaking the current runnable build.

Chosen approach:
- Keep the current runnable production bundle in [assets/index.js](./assets/index.js).
- Keep external path data in [data/assets.json](./data/assets.json) and [data/paths](./data/paths).
- Refactor in a hybrid way:
  - first add readable wrappers, aliases, notes, and extracted helpers around the existing bundle,
  - then gradually reconstruct a clearer source-like layer alongside the bundle,
  - only after that consider deeper rewrites.

Important current facts:
- The extension is a compiled `React` SPA, not Vue.
- Main runtime entry points and screen boundaries already exist in [assets/index.js](./assets/index.js):
  - `Qp` pools screen at [index.js:11809](./assets/index.js:11809)
  - `_h` chat screen at [index.js:12172](./assets/index.js:12172)
  - `Jp` character sheet at [index.js:12396](./assets/index.js:12396)
  - `xs` talent renderer at [index.js:12939](./assets/index.js:12939)
  - `yE` selected core path view at [index.js:13092](./assets/index.js:13092)
  - `Ch` path picker at [index.js:13189](./assets/index.js:13189)
  - `gE` talent picker for a path at [index.js:13215](./assets/index.js:13215)
  - `bE` path screen at [index.js:13266](./assets/index.js:13266)
  - `AE` default character shape at [index.js:13445](./assets/index.js:13445)
  - `EE` character list at [index.js:13483](./assets/index.js:13483)
  - metadata writer `re` at [index.js:13543](./assets/index.js:13543)
  - external data loader `loadExternalGrimwildData()` at [index.js:13551](./assets/index.js:13551)
  - top-level app `SE()` at [index.js:13573](./assets/index.js:13573)
- Metadata keys and screen roles are already documented in [../grimwild-extension-data/ARCHITECTURE.md](../grimwild-extension-data/ARCHITECTURE.md).
- The Playwright harness is already available:
  - config in [playwright.config.js](./playwright.config.js)
  - mock Owlbear runtime in [test/mock-obr.js](./test/mock-obr.js)
  - tests in [tests](./tests)
  - package script in [package.json](./package.json)

Implementation guardrails:
- Do not stop using the current bundle as the runnable artifact until the replacement layer proves parity.
- Keep every phase independently runnable and testable.
- Prefer extracting named helpers and documentation before changing behavior.
- When behavior changes are needed, add or update tests in the same phase.

---

## Phase 1: Stabilize Runtime Map And Naming

- [x] Create a readable runtime map of the current bundle.
- [x] Add stable aliases for major screens and runtime helpers without changing behavior.
- [x] Document metadata keys, core data structures, and screen responsibilities in the extension folder.

### Relevant context

- Main runtime bundle: [assets/index.js](./assets/index.js)
- Existing extracted architecture notes: [../grimwild-extension-data/ARCHITECTURE.md](../grimwild-extension-data/ARCHITECTURE.md)
- Default character structure: [assets/index.js:13445](./assets/index.js:13445)
- Metadata write helper: [assets/index.js:13543](./assets/index.js:13543)
- App shell and state wiring: [assets/index.js:13573](./assets/index.js:13573)

### Deliverable

A source-of-truth map inside the extension folder that explains:
- what each major component/function is,
- what metadata it reads and writes,
- what local state it owns,
- what tests currently cover it.

This phase may also add non-functional naming aliases or comments near major boundaries in [assets/index.js](./assets/index.js) to reduce the cost of further extraction.

Completed artifact:
- [docs/runtime-map.md](./docs/runtime-map.md)

### Suggested implementation steps

- Create a local architecture note in the extension folder, e.g. `docs/runtime-map.md` or similar.
- Record stable names for:
  - `AppShell` for `SE`
  - `CharacterList` for `EE`
  - `CharacterSheet` for `Jp`
  - `PathScreen` for `bE`
  - `PoolsScreen` for `Qp`
  - `ChatScreen` for `_h`
  - `TalentCard` for `xs`
- Record which metadata keys each screen touches.
- Record the JSON-backed path loading flow from [assets/index.js:13551](./assets/index.js:13551).

### Verify and test

- Open the runtime note and verify every major screen in [assets/index.js](./assets/index.js) is mapped.
- Verify no functional behavior changed.
- Run the full test suite:
  - `npm run test:e2e`

---

## Phase 2: Extract Metadata And Data Access Helpers

- [x] Extract readable helpers for metadata access and persistence.
- [x] Extract readable helpers for path/art data loading.
- [x] Replace repeated inline metadata object handling with named helper functions where safe.

### Relevant context

- Bundle entry and app shell: [assets/index.js:13573](./assets/index.js:13573)
- Metadata write helper `re`: [assets/index.js:13543](./assets/index.js:13543)
- External JSON loader: [assets/index.js:13551](./assets/index.js:13551)
- Current JSON data:
  - [data/assets.json](./data/assets.json)
  - [data/paths](./data/paths)
- Mock metadata API used in tests: [test/mock-obr.js](./test/mock-obr.js)

### Deliverable

A small set of readable helper modules, kept alongside the current extension, for example:
- `src-like/metadata.js`
- `src-like/data-loader.js`
- `src-like/constants.js`

These helpers should describe and centralize:
- metadata key names,
- scene metadata reads/writes,
- localStorage sync behavior,
- external path/art JSON loading.

This phase can still leave the main UI in [assets/index.js](./assets/index.js), but shared runtime operations should stop being anonymous inline logic where practical.

Completed artifacts:
- [src-like/metadata.js](./src-like/metadata.js)
- [src-like/data-loader.js](./src-like/data-loader.js)

Bundle integration completed in:
- [assets/index.js](./assets/index.js)

### Suggested implementation steps

- Extract metadata key constants from current string literals:
  - `grimwild.character.extension/metadata`
  - `grimwild.pool.extension/metadata`
  - `grimwild.extension/metadata`
  - `grimwild.gm.extension/metadata`
  - `grimwild.date.extension/metadata`
- Extract helpers for:
  - reading character lists from scene metadata,
  - reading pools from scene metadata,
  - flattening/sorting chat entries,
  - writing metadata with timestamp,
  - local storage backup/restore,
  - loading `/data/assets.json` and `/data/paths/*.json`.
- Use those helpers from the bundle in the least invasive way possible.

### Verify and test

- Verify the extension still loads with `/?mockOwlbear=1`.
- Verify JSON-backed paths still appear from [data/assets.json](./data/assets.json) and [data/paths](./data/paths).
- Run targeted tests:
  - `npx playwright test tests/paths.spec.js`
  - `npx playwright test tests/talents.spec.js`
- Run the full suite:
  - `npm run test:e2e`

Current verification completed:
- syntax check passed for:
  - [src-like/metadata.js](./src-like/metadata.js)
  - [src-like/data-loader.js](./src-like/data-loader.js)
  - [assets/index.js](./assets/index.js)

---

## Phase 3: Extract App Shell And Screen Routing Layer

- [x] Isolate the top-level app shell and screen selection logic.
- [x] Replace cryptic screen routing logic with readable wrappers.
- [x] Keep screen implementations functionally unchanged while improving composition.

### Relevant context

- Top-level app and route-like state: [assets/index.js:13573](./assets/index.js:13573)
- Character list screen: [assets/index.js:13483](./assets/index.js:13483)
- Character sheet screen: [assets/index.js:12396](./assets/index.js:12396)
- Path screen: [assets/index.js:13266](./assets/index.js:13266)
- Pools screen: [assets/index.js:11809](./assets/index.js:11809)
- Chat screen: [assets/index.js:12172](./assets/index.js:12172)
- Playwright categories:
  - [tests/character-list.spec.js](./tests/character-list.spec.js)
  - [tests/character-sheet.spec.js](./tests/character-sheet.spec.js)
  - [tests/paths.spec.js](./tests/paths.spec.js)
  - [tests/talents.spec.js](./tests/talents.spec.js)
  - [tests/pools.spec.js](./tests/pools.spec.js)

### Deliverable

A readable app-shell layer, for example:
- `src-like/app-shell.js`
- `src-like/screens.js`

This layer should own:
- current screen selection (`character`, `path`, `pool`, `chat`)
- selected character handling
- unread badge behavior
- chat popover open/close flow
- scene readiness handling

The key goal is that the main control flow is readable in one place, even if the underlying screen implementations are still adapted from the bundle.

Completed artifacts:
- [src-like/app-shell.js](./src-like/app-shell.js)

Bundle integration completed in:
- [assets/index.js](./assets/index.js)

Notable follow-up fix completed in this phase:
- after moving bootstrap and subscription logic, the app shell now performs a current-metadata resync when ready-state subscriptions attach, so metadata written during startup is not missed

### Suggested implementation steps

- Wrap `SE()` responsibilities into named helpers:
  - readiness/bootstrap
  - metadata subscriptions
  - selected character updates
  - screen switching
  - badge updates
- Introduce a clear screen map instead of large inline conditional rendering.
- Keep the rendered UI structure equivalent to the current one.

### Verify and test

- Verify the extension still opens from Owlbear/mock runtime.
- Verify each top-level screen can still be reached.
- Run category tests:
  - `npx playwright test tests/character-list.spec.js`
  - `npx playwright test tests/character-sheet.spec.js`
  - `npx playwright test tests/paths.spec.js`
  - `npx playwright test tests/pools.spec.js`
- Run the full suite:
  - `npm run test:e2e`

Current verification completed:
- syntax check passed for:
  - [src-like/app-shell.js](./src-like/app-shell.js)
  - [assets/index.js](./assets/index.js)

---

## Phase 4: Extract Character And Path/Talent Screens

- [x] Extract the character list and character sheet into readable source-like modules.
- [x] Extract the path screen, path picker, core path view, and talent picker into readable modules.
- [x] Keep JSON-backed path behavior as the authoritative source.

### Relevant context

- Character list row rendering: [assets/index.js:13266](./assets/index.js:13266) through [assets/index.js:13543](./assets/index.js:13543)
- Default character structure: [assets/index.js:13445](./assets/index.js:13445)
- Character sheet screen: [assets/index.js:12396](./assets/index.js:12396)
- Talent card renderer: [assets/index.js:12939](./assets/index.js:12939)
- Core path view: [assets/index.js:13092](./assets/index.js:13092)
- Path picker: [assets/index.js:13189](./assets/index.js:13189)
- Talent picker for a path: [assets/index.js:13215](./assets/index.js:13215)
- Path screen: [assets/index.js:13266](./assets/index.js:13266)
- Path data:
  - [data/assets.json](./data/assets.json)
  - [data/paths](./data/paths)
- Character test data shape:
  - [tests/helpers/characters.js](./tests/helpers/characters.js)

### Deliverable

Readable source-like modules for:
- `CharacterList`
- `CharacterRow`
- `CharacterSheet`
- `TalentCard`
- `PathScreen`
- `PathPicker`
- `CorePathView`
- `PathTalentPicker`

The extension should still render through the current runtime, but these areas should no longer require reading large anonymous blocks in the bundle to understand behavior.

Completed artifacts:
- [src-like/character-model.js](./src-like/character-model.js)
- [src-like/path-talent.js](./src-like/path-talent.js)

Supporting integration:
- [tests/helpers/characters.js](./tests/helpers/characters.js)
- [assets/index.js](./assets/index.js)

Phase 4 result:
- character creation/removal and row view state are now centralized in `character-model.js`
- path selection, path resolution, core-path clearing, core-talent tracker updates, talent add/remove/update, and talent chat broadcast patch building are now centralized in `path-talent.js`
- the runnable UI still renders from [assets/index.js](./assets/index.js), but these character/path/talent behaviors no longer depend on large inline mutation blocks

### Suggested implementation steps

- Mirror the current `AE()` structure into a readable module or schema note.
- Extract character list create/open/delete flow from [assets/index.js:13483](./assets/index.js:13483).
- Extract character sheet sections into smaller named blocks:
  - attributes
  - story/spark/experience
  - traits/desires
  - bonds
  - arcs
  - notes
- Extract path/talent screen flow using the JSON data as the source of truth.

### Verify and test

- Verify path picker still lists exactly the keys from [data/assets.json](./data/assets.json).
- Verify selecting/changing a core path still works.
- Verify adding/removing talents still works.
- Verify character editing still works.
- Run:
  - `npx playwright test tests/character-list.spec.js`
  - `npx playwright test tests/character-sheet.spec.js`
  - `npx playwright test tests/paths.spec.js`
  - `npx playwright test tests/talents.spec.js`
- Run the full suite:
  - `npm run test:e2e`

Current verification completed:
- syntax check passed for:
  - [src-like/character-model.js](./src-like/character-model.js)
  - [src-like/path-talent.js](./src-like/path-talent.js)
  - [tests/helpers/characters.js](./tests/helpers/characters.js)
  - [assets/index.js](./assets/index.js)

---

## Phase 5: Extract Pools And Chat Screens, Then Tighten Documentation

- [x] Extract pools and chat into readable source-like modules.
- [x] Document remaining random/chat/message flows and GM-specific state.
- [x] Finish a developer-facing refactor guide for future work.

### Relevant context

- Pools screen: [assets/index.js:11809](./assets/index.js:11809)
- Chat screen: [assets/index.js:12172](./assets/index.js:12172)
- Top-level app shell integration: [assets/index.js:13573](./assets/index.js:13573)
- Mock Owlbear runtime for metadata and action state: [test/mock-obr.js](./test/mock-obr.js)
- Pools and chat tests:
  - [tests/pools.spec.js](./tests/pools.spec.js)
  - [tests/talents.spec.js](./tests/talents.spec.js)
  - [tests/character-sheet.spec.js](./tests/character-sheet.spec.js)

### Deliverable

Readable source-like modules for:
- `PoolsScreen`
- `ChatScreen`
- pool row/custom pool helpers
- chat entry formatting helpers

And a short developer guide inside the extension folder describing:
- where runtime code still depends on the bundle,
- where extracted readable modules live,
- how to continue the migration toward a real source tree.

Completed artifacts:
- [src-like/pools.js](./src-like/pools.js)
- [src-like/chat.js](./src-like/chat.js)
- [docs/developer-guide.md](./docs/developer-guide.md)

Bundle integration completed in:
- [assets/index.js](./assets/index.js)

Phase 5 result:
- pools metadata mutation and chat-description patch building are now centralized in `pools.js`
- chat message append and clear-chat patch building are now centralized in `chat.js`
- the extension now has a local developer-facing guide that explains the current refactor shape and recommended next migration direction

### Suggested implementation steps

- Extract pools logic:
  - custom dice/thorns roll
  - named pools add/remove/edit/roll
  - crucible and PC broadcasts
  - suspense/GM-related values
- Extract chat rendering and message formatting helpers.
- Add a final “current architecture after refactor” document to replace ad hoc tribal knowledge.

### Verify and test

- Verify pool creation, rolling, depletion, and deletion still work.
- Verify crucible and PC chat output still work.
- Verify chat rendering still works from sheet/path/pools flows.
- Run:
  - `npx playwright test tests/pools.spec.js`
  - `npx playwright test tests/talents.spec.js`
  - `npx playwright test tests/character-sheet.spec.js`
- Run the full suite:
  - `npm run test:e2e`

Current verification completed:
- syntax check passed for:
  - [src-like/pools.js](./src-like/pools.js)
  - [src-like/chat.js](./src-like/chat.js)
  - [assets/index.js](./assets/index.js)

---

## Completion Criteria

- [x] Major runtime responsibilities are documented in readable files inside [recovered/grimwild-extension](./).
- [x] Metadata access and external data loading are centralized in named helpers.
- [x] App shell routing is readable without tracing one large bundle block.
- [x] Character, path/talent, pools, and chat areas each have readable source-like modules.
- [ ] The full Playwright suite still passes from [tests](./tests).
- [x] Future CE data updates can continue through [data/assets.json](./data/assets.json) and [data/paths](./data/paths) without editing embedded path tables.
