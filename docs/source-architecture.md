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

## Compatibility layers

The repository still contains two compatibility layers:

- [../src-like](../src-like)
  - transitional adapters extracted during reconstruction
  - no new feature work should start here
- [../assets/index.js](../assets/index.js)
  - recovered compatibility runtime loaded by the extension entrypoint
  - still required for the current browser-delivered artifact
  - should be touched only when the source runtime needs a compatibility bridge

Practical rule:
- if a change can be implemented in `src/*`, implement it there
- only edit `assets/index.js` when wiring the source runtime into the current artifact

## Runtime ownership

Current ownership split:
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

External path data remains authoritative in:
- [../data/assets.json](../data/assets.json)
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
- `src-like/*` is transitional.
- `assets/index.js` is a compatibility artifact, not the preferred development target.
- Documentation should assume developers can understand the app from `src/*` plus `docs/*` without reading the recovered bundle first.
