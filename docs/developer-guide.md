# Developer Guide

This document describes the current refactor shape of the recovered Grimwild extension.

## Current runtime model

The extension still runs from the recovered production bundle:
- [../assets/index.js](../assets/index.js)

The bundle now delegates more domain logic into source-like helper modules:
- metadata and persistence:
  - [../src-like/metadata.js](../src-like/metadata.js)
- external data loading:
  - [../src-like/data-loader.js](../src-like/data-loader.js)
- app-shell bootstrap and routing:
  - [../src-like/app-shell.js](../src-like/app-shell.js)
- character model and character-list operations:
  - [../src-like/character-model.js](../src-like/character-model.js)
- path and talent operations:
  - [../src-like/path-talent.js](../src-like/path-talent.js)
- pools and chat operations:
  - [../src-like/pools.js](../src-like/pools.js)
  - [../src-like/chat.js](../src-like/chat.js)

## What is still bundle-owned

The following are still primarily rendered and composed inside [../assets/index.js](../assets/index.js):
- screen JSX layout
- CSS class usage
- low-level interaction wiring inside each screen
- dice/thorn random roll routines already embedded in the recovered bundle

This is intentional. The current refactor goal is readability and safer maintenance, not a full rewrite.

## Source of truth for path content

Path art and path definitions come from external JSON:
- [../data/assets.json](../data/assets.json)
- [../data/paths](../data/paths)

For Community Edition updates, prefer editing those files rather than editing embedded bundle data.

## Test harness

The local regression harness is already in place:
- Playwright config:
  - [../playwright.config.js](../playwright.config.js)
- mock Owlbear runtime:
  - [../test/mock-obr.js](../test/mock-obr.js)
- test suites:
  - [../tests](../tests)

Recommended workflow for refactors:
1. make the smallest domain-level change possible
2. run the most relevant category first
3. run the full suite only after the category passes

Examples:
- `npx playwright test tests/paths.spec.js`
- `npx playwright test tests/pools.spec.js`
- `npm run test:e2e`

## Recommended next migration direction

If the codebase is refactored further, use this order:
1. keep moving non-UI state mutations into `src-like/*`
2. extract reusable view models and action helpers
3. only then reconstruct actual React component files for each screen
4. keep the bundle runnable until a replacement render layer reaches test parity

## Practical rule

If a behavior can be expressed as:
- metadata patch building
- entity creation/removal/update
- chat entry creation
- path/talent selection logic
- pool mutation logic

it should live in `src-like/*`, not as anonymous inline logic inside the bundle.
