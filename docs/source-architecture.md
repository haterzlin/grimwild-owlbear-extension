# Source Architecture

This document describes the maintained source runtime for the Grimwild extension.

## Source of truth

The maintained implementation is the `src/` tree:
- app shell:
  - [../src/app/AppShell.js](../src/app/AppShell.js)
- contracts:
  - [../src/contracts/index.js](../src/contracts/index.js)
  - [../src/contracts/app.js](../src/contracts/app.js)
  - [../src/contracts/entities.js](../src/contracts/entities.js)
- core runtime APIs:
  - [../src/core/metadata.js](../src/core/metadata.js)
  - [../src/core/data-loader.js](../src/core/data-loader.js)
  - [../src/core/app-shell-state.js](../src/core/app-shell-state.js)
- domain logic:
  - [../src/domain/characters.js](../src/domain/characters.js)
  - [../src/domain/paths.js](../src/domain/paths.js)
  - [../src/domain/pools.js](../src/domain/pools.js)
  - [../src/domain/chat.js](../src/domain/chat.js)
- screens:
  - [../src/screens/CharacterList.js](../src/screens/CharacterList.js)
  - [../src/screens/CharacterSheet.js](../src/screens/CharacterSheet.js)
  - [../src/screens/PathScreen.js](../src/screens/PathScreen.js)
  - [../src/screens/PoolsAndChat.js](../src/screens/PoolsAndChat.js)

## Runtime layers

The active browser entry flow is now:

- [../index.html](../index.html)
  - main extension HTML entry page used by Vite and local serving
- [../chatpopover/index.html](../chatpopover/index.html)
  - chat popover HTML entry page used by Vite and local serving
- [../src/main.js](../src/main.js)
  - main source entry module
  - calls the shared runtime bootstrap in `main` mode
- [../src/chatpopover-main.js](../src/chatpopover-main.js)
  - chat popover source entry module
  - calls the shared runtime bootstrap in `chatpopover` mode
- [../src/runtime/entry.js](../src/runtime/entry.js)
  - maintained source-owned browser bootstrap
  - wires OBR, React runtime, assets, data loading, screen factories, and root render
  - receives explicit route mode from the entry module instead of inferring it from `window.location`
- [../src/runtime/react-runtime.js](../src/runtime/react-runtime.js)
  - standard React compatibility wrapper for the current screen factory shape
- [../src/runtime/obr-client.js](../src/runtime/obr-client.js)
  - thin source-owned Owlbear message client for the API subset this extension uses
- [../src/runtime/obr-reference.js](../src/runtime/obr-reference.js)
  - `obrref` parser for room/origin discovery

Practical rule:
- if a change can be implemented in `src/*`, implement it there

## Runtime ownership

Current ownership split:
- bootstrap, runtime assets, dice/chat roll wiring, CSS-class mapping, and OBR resolution:
  - [../src/runtime](../src/runtime)
- app bootstrap, readiness, subscriptions, screen routing, unread state, and local backup/restore:
  - [../src/app/AppShell.js](../src/app/AppShell.js)
- character UI:
  - [../src/screens/CharacterList.js](../src/screens/CharacterList.js)
  - [../src/screens/CharacterSheet.js](../src/screens/CharacterSheet.js)
- path and talent UI:
  - [../src/screens/PathScreen.js](../src/screens/PathScreen.js)
- pools and chat UI:
  - [../src/screens/PoolsAndChat.js](../src/screens/PoolsAndChat.js)

## Data ownership

Metadata contracts and patch builders:
- [../src/core/metadata.js](../src/core/metadata.js)
- [../src/domain/characters.js](../src/domain/characters.js)
- [../src/domain/paths.js](../src/domain/paths.js)
- [../src/domain/pools.js](../src/domain/pools.js)
- [../src/domain/chat.js](../src/domain/chat.js)

Path identity and art mapping are authoritative in:
- [../src/runtime/assets.js](../src/runtime/assets.js)

Path definitions remain authoritative in:
- [../data/paths](../data/paths)

## Verification workflow

Run the most relevant suite first:
- `npm run test:character-list`
- `npm run test:character-sheet`
- `npm run test:paths`
- `npm run test:talents`
- `npm run test:pools`

Then run:
- `npm run test:e2e`

## Maintenance policy

- `src/*` is the maintained implementation.
- `src/runtime/*` is the maintained browser bootstrap layer.
- `src/runtime/obr-client.js` is the live Owlbear integration boundary.
- `index.html`, `chatpopover/index.html`, `src/main.js`, and `src/chatpopover-main.js` define the active entry flow.
- Documentation should assume developers can understand the app from `src/*` plus `docs/*` without reading the recovered bundle first.
