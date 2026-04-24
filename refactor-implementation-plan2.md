# Grimwild Source Reconstruction Implementation Plan

## Overview

Goal: turn the recovered Grimwild extension into a readable, usable source codebase while preserving current behavior and metadata compatibility.

Chosen direction:
- Reconstruct a real source tree screen by screen.
- Treat the current bundle in [assets/index.js](./assets/index.js) as a temporary reference and fallback, not the desired long-term implementation.
- Keep all new extracted code in JavaScript, but require explicit JSDoc contracts for new source modules.
- Use the Playwright suite in [tests](./tests) as the acceptance gate for every phase.

Constraints from the current codebase:
- The only runnable UI today is [assets/index.js](./assets/index.js).
- Domain helpers already exist in [`src-like/`](./src-like):
  - [src-like/metadata.js](./src-like/metadata.js)
  - [src-like/data-loader.js](./src-like/data-loader.js)
  - [src-like/app-shell.js](./src-like/app-shell.js)
  - [src-like/character-model.js](./src-like/character-model.js)
  - [src-like/path-talent.js](./src-like/path-talent.js)
  - [src-like/pools.js](./src-like/pools.js)
  - [src-like/chat.js](./src-like/chat.js)
- Path definitions and art are already externalized:
  - [data/assets.json](./data/assets.json)
  - [data/paths](./data/paths)
- The main app shell still owns critical state and subscriptions inside [assets/index.js:13442](./assets/index.js:13442):
  - ready state
  - unread badge count
  - player identity and role
  - selected character
  - current screen
  - characters, pools, chat, GM state
  - metadata subscriptions
  - localStorage backup and restore
- Existing screen boundaries in the bundle are already known:
  - `Qp` pools screen at [assets/index.js:11818](./assets/index.js:11818)
  - `_h` chat screen at [assets/index.js:12146](./assets/index.js:12146)
  - `Jp` character sheet at [assets/index.js:12396](./assets/index.js:12396)
  - `xs` talent card at [assets/index.js:12899](./assets/index.js:12899)
  - `yE` core path view at [assets/index.js:13054](./assets/index.js:13054)
  - `Ch` path picker at [assets/index.js:13142](./assets/index.js:13142)
  - `gE` path talent picker at [assets/index.js:13210](./assets/index.js:13210)
  - `bE` path screen at [assets/index.js:13266](./assets/index.js:13266)
  - `vE` character row at [assets/index.js:13315](./assets/index.js:13315)
  - `EE` character list at [assets/index.js:13371](./assets/index.js:13371)
  - `SE` app shell at [assets/index.js:13442](./assets/index.js:13442)

Implementation guardrails:
- Keep every phase independently runnable and testable.
- Do not change metadata keys or scene data formats unless a phase explicitly calls for migration work.
- New source modules should define their contracts with JSDoc for exported functions, entity shapes, and screen props.
- Prefer replacing one complete screen flow at a time over scattering partial rewrites across the bundle.
- Keep the current external JSON path content as the authoritative source of path data.

---

## Phase 1: Create The Real Source Skeleton And Shared Contracts

- [x] Create a real `src/` tree and shared source conventions.
- [x] Define JSDoc contracts for metadata, characters, pools, chat entries, talents, and app-shell state.
- [x] Introduce source-side adapters around current `src-like/*` helpers so future screen rewrites target stable source APIs instead of the bundle.

### Relevant context

- Current hybrid helper layer:
  - [src-like/metadata.js](./src-like/metadata.js)
  - [src-like/data-loader.js](./src-like/data-loader.js)
  - [src-like/app-shell.js](./src-like/app-shell.js)
  - [src-like/character-model.js](./src-like/character-model.js)
  - [src-like/path-talent.js](./src-like/path-talent.js)
  - [src-like/pools.js](./src-like/pools.js)
  - [src-like/chat.js](./src-like/chat.js)
- Existing metadata and runtime notes:
  - [docs/runtime-map.md](./docs/runtime-map.md)
  - [docs/developer-guide.md](./docs/developer-guide.md)
- Current runtime entry:
  - [assets/index.js:13442](./assets/index.js:13442)

### Deliverable

A new `src/` foundation that does not yet replace screens, but establishes:
- shared type-style JSDoc contracts
- stable app constants and metadata APIs
- stable entity helpers for characters, pools, chat, and paths
- an explicit source layout for future phases

Example target structure:
- `src/contracts/*.js`
- `src/core/metadata.js`
- `src/core/data-loader.js`
- `src/core/app-shell-state.js`
- `src/domain/characters.js`
- `src/domain/paths.js`
- `src/domain/pools.js`
- `src/domain/chat.js`

### Suggested implementation steps

- Create `src/` with a clear split between:
  - core runtime APIs
  - domain logic
  - screens/components
- Move or wrap current `src-like/*` exports behind new source-facing modules.
- Add JSDoc typedefs for:
  - `GrimwildCharacter`
  - `GrimwildPool`
  - `GrimwildChatEntry`
  - `GrimwildTalent`
  - `GrimwildGmState`
  - `AppScreen`
  - `SceneMetadataShape`
- Document which old `src-like/*` files are transitional and which `src/*` files become the new edit targets.
- Keep bundle integration behavior unchanged in this phase.

### Verify and test

- Verify `src/` contains the canonical contracts and wrappers for current helper logic.
- Verify no runtime behavior changed.
- Run the full suite:
  - `npm run test:e2e`

Current implementation completed in:
- [src/contracts/index.js](./src/contracts/index.js)
- [src/contracts/app.js](./src/contracts/app.js)
- [src/contracts/entities.js](./src/contracts/entities.js)
- [src/core/metadata.js](./src/core/metadata.js)
- [src/core/data-loader.js](./src/core/data-loader.js)
- [src/core/app-shell-state.js](./src/core/app-shell-state.js)
- [src/domain/characters.js](./src/domain/characters.js)
- [src/domain/paths.js](./src/domain/paths.js)
- [src/domain/pools.js](./src/domain/pools.js)
- [src/domain/chat.js](./src/domain/chat.js)
- [src/screens](./src/screens)
- [docs/developer-guide.md](./docs/developer-guide.md)

Phase 1 result:
- the repository now has a canonical `src/` layout for future work
- shared entity and app-shell contracts now exist as JSDoc typedefs in `src/contracts/*`
- source-facing core and domain APIs now exist in `src/*` and wrap the current `src-like/*` transitional implementation
- developer documentation now marks `src/*` as the canonical edit target and `src-like/*` as transitional

Current verification completed:
- syntax check passed for:
  - [src/contracts/index.js](./src/contracts/index.js)
  - [src/contracts/app.js](./src/contracts/app.js)
  - [src/contracts/entities.js](./src/contracts/entities.js)
  - [src/core/metadata.js](./src/core/metadata.js)
  - [src/core/data-loader.js](./src/core/data-loader.js)
  - [src/core/app-shell-state.js](./src/core/app-shell-state.js)
  - [src/domain/characters.js](./src/domain/characters.js)
  - [src/domain/paths.js](./src/domain/paths.js)
  - [src/domain/pools.js](./src/domain/pools.js)
  - [src/domain/chat.js](./src/domain/chat.js)

---

## Phase 2: Rebuild The App Shell And Runtime Wiring In Source

- [x] Reconstruct the top-level app shell as readable source code.
- [x] Move Owlbear wiring, metadata subscriptions, readiness handling, and local backup logic out of the bundle path.
- [x] Keep all screens functionally equivalent, even if some still render through adapted bundle-derived code.

### Relevant context

- Current app shell runtime:
  - [assets/index.js:13442](./assets/index.js:13442)
- Existing helper seams:
  - [src-like/app-shell.js](./src-like/app-shell.js)
  - [src-like/metadata.js](./src-like/metadata.js)
- Owlbear test runtime:
  - [test/mock-obr.js](./test/mock-obr.js)
- Extension entry files:
  - [index.html](./index.html)
  - [manifest.json](./manifest.json)
- Playwright coverage for top-level flows:
  - [tests/character-list.spec.js](./tests/character-list.spec.js)
  - [tests/character-sheet.spec.js](./tests/character-sheet.spec.js)
  - [tests/paths.spec.js](./tests/paths.spec.js)
  - [tests/pools.spec.js](./tests/pools.spec.js)
  - [tests/talents.spec.js](./tests/talents.spec.js)

### Deliverable

A real source-owned `AppShell` that becomes the primary runtime entry point and owns:
- readiness bootstrap
- player identity and role loading
- metadata subscription setup
- localStorage backup and restore
- unread badge logic
- selected character and screen routing
- chat popover behavior

This phase should end with the top-level render path no longer depending on the giant inline app-shell block in the bundle.

### Suggested implementation steps

- Reconstruct `AppShell` in `src/app/AppShell.js` or similar.
- Move the current `SE()` state model into readable source state and effects.
- Move backup/restore and metadata sync code into source-owned modules.
- Keep the same metadata keys and patch-writing behavior.
- Route existing screen components through the new source app shell, even if some screens still delegate to bundle-derived implementations.
- Leave `assets/index.js` as compatibility reference during transition, but stop using its `SE()` as the primary control flow.

### Verify and test

- Verify the extension still boots in normal mode and `/?mockOwlbear=1`.
- Verify screen switching still works for:
  - character
  - path
  - pool
  - chat
- Verify unread badge and chat popover behavior still work.
- Run the full suite:
  - `npm run test:e2e`

Current implementation completed in:
- [src/app/AppShell.js](./src/app/AppShell.js)

Bundle integration completed in:
- [assets/index.js](./assets/index.js)

Supporting documentation updated in:
- [docs/developer-guide.md](./docs/developer-guide.md)

Phase 2 result:
- the top-level runtime state and control flow are now source-owned in `src/app/AppShell.js`
- Owlbear readiness handling, metadata subscriptions, local backup/restore, unread badge logic, selected-character routing, and chat popover flow no longer require editing the inline bundle app shell
- the extension still renders the recovered screen implementations from the bundle, but those screens are now hosted by a source-owned app shell

Current verification completed:
- syntax check passed for:
  - [src/app/AppShell.js](./src/app/AppShell.js)
  - [assets/index.js](./assets/index.js)

---

## Phase 3: Rebuild Character List And Character Sheet In Source

- [x] Replace bundle-owned character list rendering with source components.
- [x] Replace bundle-owned character sheet rendering and field wiring with source components.
- [x] Preserve current character metadata shape and autosave behavior.

### Relevant context

- Character list and row:
  - [assets/index.js:13315](./assets/index.js:13315)
  - [assets/index.js:13371](./assets/index.js:13371)
- Character sheet:
  - [assets/index.js:12396](./assets/index.js:12396)
- Default character factory:
  - [src-like/character-model.js](./src-like/character-model.js)
- Metadata update flow:
  - [src-like/metadata.js](./src-like/metadata.js)
- Character test fixtures:
  - [tests/helpers/characters.js](./tests/helpers/characters.js)
- Character coverage:
  - [tests/character-list.spec.js](./tests/character-list.spec.js)
  - [tests/character-sheet.spec.js](./tests/character-sheet.spec.js)

### Deliverable

Source-owned screen/component files for:
- `CharacterList`
- `CharacterRow`
- `CharacterSheet`
- any supporting field sections needed for readability

This phase should end with character UI and event wiring readable without consulting the bundle.

### Suggested implementation steps

- Build source components for character list and row using current view behavior as reference.
- Reconstruct character sheet sections into named subcomponents:
  - identity
  - attributes and marks
  - conditions
  - story and spark
  - experience
  - traits and desires
  - bonds
  - arcs and notes
- Keep the debounced metadata update behavior that currently flows through selected-character state in [assets/index.js:13457](./assets/index.js:13457).
- Preserve current field names in metadata to avoid migration work.
- Add JSDoc contracts for sheet props and character mutations.

### Verify and test

- Verify add, open, edit, and delete character flows still work.
- Verify all current character sheet inputs still persist correctly.
- Verify attribute roll-to-chat behavior still works.
- Run:
  - `npx playwright test tests/character-list.spec.js`
  - `npx playwright test tests/character-sheet.spec.js`
- Run the full suite:
  - `npm run test:e2e`

Current implementation completed in:
- [src/screens/CharacterList.js](./src/screens/CharacterList.js)
- [src/screens/CharacterSheet.js](./src/screens/CharacterSheet.js)

Supporting integration updated in:
- [src/app/AppShell.js](./src/app/AppShell.js)
- [assets/index.js](./assets/index.js)
- [docs/developer-guide.md](./docs/developer-guide.md)

Phase 3 result:
- character list row rendering, create/delete flows, and list screen structure are now source-owned
- character sheet field layout, traits/desires selectors, bond editor, experience calculations, and attribute roll wiring are now source-owned
- the app shell now renders source character screens while preserving the existing metadata shape and debounced selected-character persistence flow introduced in Phase 2

Current verification completed:
- syntax check passed for:
  - [src/screens/CharacterList.js](./src/screens/CharacterList.js)
  - [src/screens/CharacterSheet.js](./src/screens/CharacterSheet.js)
  - [src/app/AppShell.js](./src/app/AppShell.js)
  - [assets/index.js](./assets/index.js)

---

## Phase 4: Rebuild Path And Talent Screens In Source

- [x] Replace bundle-owned path and talent rendering with source components.
- [x] Preserve JSON-backed path loading as the source of truth.
- [x] Keep current character/path/talent metadata semantics unchanged.

### Relevant context

- Path screen and subparts:
  - [assets/index.js:12899](./assets/index.js:12899)
  - [assets/index.js:13054](./assets/index.js:13054)
  - [assets/index.js:13142](./assets/index.js:13142)
  - [assets/index.js:13210](./assets/index.js:13210)
  - [assets/index.js:13266](./assets/index.js:13266)
- Current path logic helpers:
  - [src-like/path-talent.js](./src-like/path-talent.js)
  - [src-like/data-loader.js](./src-like/data-loader.js)
- Path data:
  - [data/assets.json](./data/assets.json)
  - [data/paths](./data/paths)
- Coverage:
  - [tests/paths.spec.js](./tests/paths.spec.js)
  - [tests/talents.spec.js](./tests/talents.spec.js)

### Deliverable

Source-owned screen/component files for:
- `PathScreen`
- `PathPicker`
- `CorePathView`
- `PathTalentPicker`
- `TalentCard`

This phase should end with path and talent UI behavior readable in source code and no longer dependent on bundle-owned JSX.

### Suggested implementation steps

- Reconstruct path picker and core path display from external JSON data.
- Rebuild talent selection, removal, tracker updates, and chat broadcast actions in source components.
- Preserve the current character fields:
  - `path`
  - `coreTalent`
  - `talents`
- Keep path IDs and art resolution behavior aligned with [data/assets.json](./data/assets.json).
- Ensure the source path screen uses the same patch-building and metadata persistence model as the current runtime.

### Verify and test

- Verify every configured path still appears in the picker.
- Verify choosing and changing core path still works.
- Verify adding, removing, and broadcasting talents still works.
- Run:
  - `npx playwright test tests/paths.spec.js`
  - `npx playwright test tests/talents.spec.js`
- Run the full suite:
  - `npm run test:e2e`

Current implementation completed in:
- [src/screens/PathScreen.js](./src/screens/PathScreen.js)

Supporting integration updated in:
- [assets/index.js](./assets/index.js)
- [docs/developer-guide.md](./docs/developer-guide.md)

Phase 4 result:
- path picker, core path view, talent picker, and talent card rendering are now source-owned
- talent add/remove, tracker updates, core-path assignment/clearing, and talent description broadcast flows now render from source screen code while preserving the existing metadata and JSON-backed path semantics
- the app shell now renders a source-owned path screen while continuing to use the existing externally loaded path art and path definitions from `data/assets.json` and `data/paths`

Current verification completed:
- syntax check passed for:
  - [src/screens/PathScreen.js](./src/screens/PathScreen.js)
  - [assets/index.js](./assets/index.js)

---

## Phase 5: Rebuild Pools And Chat Screens In Source

- [x] Replace bundle-owned pools and chat screens with source components.
- [x] Preserve current roll output shape and metadata format.
- [x] Keep GM-specific state and chat behavior compatible with the existing extension.

### Relevant context

- Pools screen:
  - [assets/index.js:11818](./assets/index.js:11818)
- Chat screen:
  - [assets/index.js:12146](./assets/index.js:12146)
- Current pools/chat helpers:
  - [src-like/pools.js](./src-like/pools.js)
  - [src-like/chat.js](./src-like/chat.js)
  - [src-like/metadata.js](./src-like/metadata.js)
- GM and chat metadata keys:
  - [src-like/metadata.js](./src-like/metadata.js)
- Coverage:
  - [tests/pools.spec.js](./tests/pools.spec.js)
  - [tests/talents.spec.js](./tests/talents.spec.js)
  - [tests/character-sheet.spec.js](./tests/character-sheet.spec.js)

### Deliverable

Source-owned screen/component files for:
- `PoolsScreen`
- `ChatScreen`
- any supporting row/editor/render helpers for named pools, custom rolls, and chat entries

This phase should end with pools and chat behavior readable in source code and no longer dependent on bundle-owned screen rendering.

### Suggested implementation steps

- Rebuild story odds, custom roll, pool depletion, named pool creation/edit/removal, crucible generation, and PC target broadcast in source components.
- Rebuild chat rendering and chat message submission in source components.
- Preserve current metadata shapes for:
  - pools
  - chat entries
  - GM suspense
- Preserve current output semantics used by the tests:
  - roll entry shape
  - description entry shape
  - named pool thorn-effect text

### Verify and test

- Verify pools screen controls still render correctly.
- Verify story rolls, custom rolls, named pool rolls, crucible, and PC broadcasts still write expected chat metadata.
- Verify chat still renders and message send/clear behavior still works.
- Run:
  - `npx playwright test tests/pools.spec.js`
  - `npx playwright test tests/talents.spec.js`
  - `npx playwright test tests/character-sheet.spec.js`
- Run the full suite:
  - `npm run test:e2e`

Current implementation completed in:
- [src/screens/PoolsAndChat.js](./src/screens/PoolsAndChat.js)

Supporting integration updated in:
- [assets/index.js](./assets/index.js)
- [docs/developer-guide.md](./docs/developer-guide.md)

Phase 5 result:
- pools screen rendering, named pool row editing, filtered roll chat preview, and chat screen rendering are now source-owned
- suspense updates, crucible generation, PC target broadcast, custom roll flow, named pool roll flow, chat message append, and clear-chat actions now render from source screen code while preserving the existing metadata and chat entry formats
- the app shell now renders source-owned pools and chat screens, leaving no bundle-owned top-level screen implementation on the critical runtime path

Current verification completed:
- syntax check passed for:
  - [src/screens/PoolsAndChat.js](./src/screens/PoolsAndChat.js)
  - [assets/index.js](./assets/index.js)

---

## Phase 6: Remove Bundle-Owned UI Runtime And Finalize Developer Workflow

- [x] Make the source tree the sole maintained runtime implementation.
- [x] Reduce `assets/index.js` to a build artifact or remove it from active maintenance.
- [x] Finalize repository documentation for future source-based development.

### Relevant context

- Current runnable bundle:
  - [assets/index.js](./assets/index.js)
- Current minimal repo tooling:
  - [package.json](./package.json)
- Current developer docs:
  - [docs/runtime-map.md](./docs/runtime-map.md)
  - [docs/developer-guide.md](./docs/developer-guide.md)
  - [README.md](./README.md)

### Deliverable

A repository where:
- new feature work and bug fixes are performed in `src/`
- bundle-owned screen code is no longer the development source of truth
- developer docs explain the source runtime, architecture, and verification workflow

Depending on the build approach chosen during implementation, this may mean:
- replacing [assets/index.js](./assets/index.js) as a maintained source file, or
- treating it only as generated output from the reconstructed source tree

### Suggested implementation steps

- Remove remaining direct maintenance dependencies on bundle-owned UI logic.
- Update docs to describe the new source architecture instead of the hybrid extraction shape.
- Expand [README.md](./README.md) with:
  - local run instructions
  - test instructions
  - source layout
  - metadata/data ownership notes
- Ensure all transitional files are clearly marked or removed if obsolete.

### Verify and test

- Verify developers can understand the runtime from `src/` and docs alone.
- Verify the extension still loads correctly from the maintained source output.
- Run the full suite:
  - `npm run test:e2e`

Current implementation completed in:
- [README.md](./README.md)
- [docs/source-architecture.md](./docs/source-architecture.md)

Supporting maintenance-boundary updates completed in:
- [docs/developer-guide.md](./docs/developer-guide.md)
- [assets/index.js](./assets/index.js)
- [src-like/metadata.js](./src-like/metadata.js)
- [src-like/data-loader.js](./src-like/data-loader.js)
- [src-like/app-shell.js](./src-like/app-shell.js)
- [src-like/character-model.js](./src-like/character-model.js)
- [src-like/path-talent.js](./src-like/path-talent.js)
- [src-like/pools.js](./src-like/pools.js)
- [src-like/chat.js](./src-like/chat.js)
- [package.json](./package.json)

Phase 6 result:
- repository documentation is now source-first and explains the maintained runtime from `src/*` rather than the recovered bundle
- `assets/index.js` is now explicitly marked as a recovered compatibility runtime instead of an active feature-development target
- transitional `src-like/*` modules are now explicitly marked as compatibility code
- developer workflow now includes source-first maintenance guidance and focused Playwright scripts for category-level verification

Current verification completed:
- syntax check passed for:
  - [package.json](./package.json)
  - [src-like/metadata.js](./src-like/metadata.js)
  - [src-like/data-loader.js](./src-like/data-loader.js)
  - [src-like/app-shell.js](./src-like/app-shell.js)
  - [src-like/character-model.js](./src-like/character-model.js)
  - [src-like/path-talent.js](./src-like/path-talent.js)
  - [src-like/pools.js](./src-like/pools.js)
  - [src-like/chat.js](./src-like/chat.js)
  - [assets/index.js](./assets/index.js)

---

## Completion Criteria

- [x] The extension has a readable `src/` tree that is the primary maintained implementation.
- [x] New source modules use explicit JSDoc contracts for shared entities and screen APIs.
- [x] App shell, character, path/talent, pools, and chat screens are source-owned and no longer require bundle-level editing.
- [x] External path content remains authoritative through [data/assets.json](./data/assets.json) and [data/paths](./data/paths).
- [x] The full Playwright suite passes from [tests](./tests) after each completed phase.
- [x] Repository documentation reflects the source runtime rather than the recovery-only hybrid state.
