# Source Architecture

This document describes the maintained source runtime for the Grimwild recovered extension.

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

The browser-delivered entry path is now:

- [../assets/index.js](../assets/index.js)
  - thin compatibility entrypoint loaded by the extension entrypoint
  - imports the maintained source bootstrap below
- [../src/runtime/entry.js](../src/runtime/entry.js)
  - maintained source-owned browser bootstrap
  - wires OBR, React runtime, assets, data loading, screen factories, and root render
- [../src/vendor/react-runtime.js](../src/vendor/react-runtime.js)
  - vendored recovered React/render runtime
- [../src/vendor/obr-runtime.js](../src/vendor/obr-runtime.js)
  - vendored recovered Owlbear client runtime

Practical rule:
- if a change can be implemented in `src/*`, implement it there
- only edit `assets/index.js` when wiring the maintained runtime into the extension artifact

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
- `src/vendor/*` is vendored runtime code, not the preferred feature-development target.
- `assets/index.js` is a thin compatibility artifact, not the preferred development target.
- Documentation should assume developers can understand the app from `src/*` plus `docs/*` without reading the recovered bundle first.
