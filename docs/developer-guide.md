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

Active entry flow:
- [../index.html](../index.html)
- [../chatpopover/index.html](../chatpopover/index.html)
- [../src/main.js](../src/main.js)
- [../src/chatpopover-main.js](../src/chatpopover-main.js)

Route ownership:
- `src/main.js` owns the main extension boot path
- `src/chatpopover-main.js` owns the chat popover boot path
- `src/runtime/entry.js` is the shared bootstrap used by both

Maintained bootstrap code:
- [../src/runtime](../src/runtime)
  - source-owned browser bootstrap, runtime helpers, style map, and roll wiring

Owlbear runtime adapter:
- [../src/runtime/obr-client.js](../src/runtime/obr-client.js)
  - source-owned message client for the small Owlbear API subset this extension uses
- [../src/runtime/obr-reference.js](../src/runtime/obr-reference.js)
  - parses `obrref` from the current URL

Standard React bridge:
- [../src/runtime/react-runtime.js](../src/runtime/react-runtime.js)
  - compatibility wrapper around `react`, `react-dom/client`, and `react/jsx-runtime`
  - keep using this until the screen factory pattern is replaced

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
