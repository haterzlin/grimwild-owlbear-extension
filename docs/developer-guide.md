# Developer Guide

This document describes the maintained developer workflow after the source reconstruction phases.

## Maintained runtime

Primary maintained implementation:
- [../src](../src)

Source entrypoints and ownership:
- app shell:
  - [../src/app/AppShell.js](../src/app/AppShell.js)
- source screens:
  - [../src/screens/CharacterList.js](../src/screens/CharacterList.js)
  - [../src/screens/CharacterSheet.js](../src/screens/CharacterSheet.js)
  - [../src/screens/PathScreen.js](../src/screens/PathScreen.js)
  - [../src/screens/PoolsAndChat.js](../src/screens/PoolsAndChat.js)
- contracts:
  - [../src/contracts/index.js](../src/contracts/index.js)
  - [../src/contracts/app.js](../src/contracts/app.js)
  - [../src/contracts/entities.js](../src/contracts/entities.js)
- core and domain APIs:
  - [../src/core](../src/core)
  - [../src/domain](../src/domain)

## Compatibility code

Compatibility layer that still exists:
- [../assets/index.js](../assets/index.js)
  - recovered compatibility runtime artifact
  - use only when the maintained source runtime needs bridging into the current artifact

## Canonical edit targets

Use these directories by default:
- shared contracts: `src/contracts/*`
- app/runtime wiring: `src/app/*` and `src/core/*`
- domain state and patch logic: `src/domain/*`
- UI and screen behavior: `src/screens/*`
- path content and art mapping: `data/assets.json` and `data/paths/*`

## Verification workflow

Recommended workflow:
1. make the smallest source-level change possible in `src/*`
2. run the most relevant Playwright suite first
3. run the full suite after the focused suite passes

Useful commands:
- `npm run test:character-list`
- `npm run test:character-sheet`
- `npm run test:paths`
- `npm run test:talents`
- `npm run test:pools`
- `npm run test:e2e`

## Additional reference

For the source architecture and maintenance boundary, see:
- [source-architecture.md](./source-architecture.md)
- [runtime-map.md](./runtime-map.md)
