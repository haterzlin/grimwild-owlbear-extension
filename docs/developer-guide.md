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

## Runtime bootstrap

Maintained bootstrap code:
- [../src/runtime](../src/runtime)
  - source-owned browser bootstrap, runtime helpers, style map, and roll wiring

Thin artifact layer:
- [../assets/index.js](../assets/index.js)
  - thin compatibility runtime artifact
  - use only when the maintained source runtime needs bridging into the extension entrypoint

Vendored runtime code:
- [../src/vendor](../src/vendor)
  - recovered runtime dependencies kept as isolated vendor modules
  - do not use as the default place for new feature work

## Canonical edit targets

Use these directories by default:
- shared contracts: `src/contracts/*`
- app/runtime wiring: `src/app/*` and `src/core/*`
- browser bootstrap wiring: `src/runtime/*`
- domain state and patch logic: `src/domain/*`
- UI and screen behavior: `src/screens/*`
- path asset manifest: `src/runtime/assets.js`
- path definitions: `data/paths/*`

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
