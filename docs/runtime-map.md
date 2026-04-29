# Grimwild Runtime Map

This document is the Phase 1 bundle-era map for the recovered Grimwild Owlbear Rodeo extension.

It is now a historical reference for the original recovered bundle analysis, not the current maintained runtime.

Current source-first runtime references:
- [source-architecture.md](./source-architecture.md)
- [developer-guide.md](./developer-guide.md)
- [../src/runtime/entry.js](../src/runtime/entry.js)
- [../src/runtime/assets.js](../src/runtime/assets.js)

## Runtime shape

- Framework: `React`
- Likely original bundler: `Vite`
- Current browser entry pages:
  - [../index.html](../index.html)
  - [../chatpopover/index.html](../chatpopover/index.html)
- Historical analyzed bundle artifact: removed pre-refactor `assets/index.js`
- HTML shell: [../index.html](../index.html)
- Manifest: [../manifest.json](../manifest.json)

The current extension is source-owned in `src/*`. The line references below were captured before the source-first runtime rewrite and are preserved only for bundle forensics.

Some bundle-era references below mention an older external asset-map file that has since been removed. The current path asset manifest is [../src/runtime/assets.js](../src/runtime/assets.js).

## Entry points

- Owlbear manifest entry:
  - [../manifest.json](../manifest.json)
  - `action.popover` points to `/`
- HTML shell:
  - [../index.html](../index.html)
  - loads [../src/main.js](../src/main.js) in the maintained runtime
- Historical bundle app boot:
  - `loadExternalGrimwildData().finally(...)`
  - `createRoot(...).render(...)`

## Stable aliases for major bundle symbols

These names should be used in future refactor notes and extracted modules.

| Bundle symbol | Stable alias | Purpose | Link |
| --- | --- | --- | --- |
| `SE` | `AppShell` | Top-level runtime, Owlbear wiring, screen switching, subscriptions, unread badge logic | [index.js:13573](../assets/index.js:13573) |
| `EE` | `CharacterList` | Character list screen, add/delete character actions | [index.js:13483](../assets/index.js:13483) |
| `vE` | `CharacterRow` | Single row in the character list | [index.js:13342](../assets/index.js:13342) |
| `Jp` | `CharacterSheet` | Main character editor screen | [index.js:12396](../assets/index.js:12396) |
| `bE` | `PathScreen` | Core path and talents screen | [index.js:13266](../assets/index.js:13266) |
| `Ch` | `PathPicker` | Grid of available paths | [index.js:13189](../assets/index.js:13189) |
| `yE` | `CorePathView` | Displays selected core path and its details | [index.js:13092](../assets/index.js:13092) |
| `gE` | `PathTalentPicker` | Shows talents for the selected path | [index.js:13215](../assets/index.js:13215) |
| `xs` | `TalentCard` | Shared talent/details card renderer | [index.js:12939](../assets/index.js:12939) |
| `Qp` | `PoolsScreen` | Pools UI, custom rolls, named pools, crucible/PC actions | [index.js:11809](../assets/index.js:11809) |
| `_h` | `ChatScreen` | Chat/messages screen | [index.js:12172](../assets/index.js:12172) |
| `AE` | `createEmptyCharacter` | Default character record factory | [index.js:13445](../assets/index.js:13445) |
| `re` | `writeSceneMetadata` | Metadata write helper with timestamp update | [index.js:13543](../assets/index.js:13543) |
| `loadExternalGrimwildData` | `loadExternalData` | Loads art and per-path JSON from `/data` | [index.js:13551](../assets/index.js:13551) |

## Core runtime data

### JSON-backed path data

- Path art map:
  - current source manifest: [../src/runtime/assets.js](../src/runtime/assets.js)
- Per-path content:
  - [../data/paths](../data/paths)

Current path ids from [../src/runtime/assets.js](../src/runtime/assets.js):
- `bard`
- `berserker`
- `cleric`
- `druid`
- `fighter`
- `monk`
- `paladin`
- `ranger`
- `rogue`
- `sorcerer`
- `warlock`
- `wizard`

### Runtime tables

- `Ns`
  - current art map by path id
  - initially empty, then filled by [loadExternalData](../assets/index.js:13551)
- `vr`
  - current path table by path id
  - initially empty, then filled by [loadExternalData](../assets/index.js:13551)

### Default character shape

The runtime shape created by [createEmptyCharacter](../assets/index.js:13445) is also mirrored in [../tests/helpers/characters.js](../tests/helpers/characters.js).

Important fields:
- identity:
  - `id`, `name`, `player`, `path`
- background/story:
  - `background1`, `background2`, `wise1`, `wise2`
  - `groupArc`, `characterArc`, `bio`
- attributes:
  - `brawn`, `agility`, `wits`, `presence`
  - `brawnMark`, `agilityMark`, `witsMark`, `presenceMark`
  - `bloodied`, `rattled`
- progression:
  - `story1`, `story2`, `spark1`, `spark2`
  - `experience`
- personality:
  - `trait1`, `trait2`, `notTrait`
  - `desire1`, `desire2`, `notDesire`
- relations and abilities:
  - `bonds`
  - `talents`
  - `coreTalent`

## Metadata keys

These are the important Owlbear scene metadata keys used by the runtime.

| Key | Meaning | Main readers/writers |
| --- | --- | --- |
| `grimwild.character.extension/metadata` | character records by id | `CharacterList`, `CharacterSheet`, `PathScreen`, `AppShell` |
| `grimwild.pool.extension/metadata` | pool records by id | `PoolsScreen`, `AppShell` |
| `grimwild.extension/metadata` | chat entries grouped by player id | `ChatScreen`, `PathScreen`, `PoolsScreen`, `CharacterSheet`, `AppShell` |
| `grimwild.gm.extension/metadata` | GM state such as suspense | `PoolsScreen`, `AppShell` |
| `grimwild.date.extension/metadata` | last write timestamp for sync precedence | `writeSceneMetadata`, localStorage restore logic in `AppShell` |

Primary metadata write helper:
- [../assets/index.js:13543](../assets/index.js:13543)

## Screen responsibilities

### AppShell

Main responsibilities in [../assets/index.js:13573](../assets/index.js:13573):
- scene readiness handling
- Owlbear subscriptions
- selected character state
- screen selection:
  - `character`
  - `path`
  - `pool`
  - `chat`
- unread chat badge logic
- localStorage backup and restore
- chat popover launch

Owned React state includes:
- scene ready flag
- unread count
- player name/id/role
- merged chat arrays
- selected character
- GM state
- current screen
- loaded characters and pools

### CharacterList

Main responsibilities in [../assets/index.js:13483](../assets/index.js:13483):
- create new empty character via `createEmptyCharacter`
- delete character from scene metadata
- render the list of current characters
- open a selected character

`CharacterRow` responsibilities in [../assets/index.js:13342](../assets/index.js:13342):
- render name/path summary
- render path art if available
- render `Open`
- render delete `×`

### CharacterSheet

Main responsibilities in [../assets/index.js:12396](../assets/index.js:12396):
- edit core character fields
- attributes and marks
- bloodied/rattled
- story/spark
- experience
- traits and desires
- bonds
- arcs and notes
- attribute rolling to chat

### PathScreen

Main responsibilities in [../assets/index.js:13266](../assets/index.js:13266):
- choose core path if missing
- show current core path
- show/update core talent
- expand/collapse path details
- show existing talents
- add talent from current or another path
- broadcast talent descriptions to chat

Subparts:
- `PathPicker` at [index.js:13189](../assets/index.js:13189)
- `CorePathView` at [index.js:13092](../assets/index.js:13092)
- `PathTalentPicker` at [index.js:13215](../assets/index.js:13215)
- `TalentCard` at [index.js:12939](../assets/index.js:12939)

### PoolsScreen

Main responsibilities in [../assets/index.js:11809](../assets/index.js:11809):
- story odds buttons
- custom dice/thorns roll
- custom pool depletion
- named pools add/remove/edit/roll
- crucible generation
- PC target broadcast
- suspense / GM controls

### ChatScreen

Main responsibilities in [../assets/index.js:12172](../assets/index.js:12172):
- render description and roll entries
- show player-specific chat context
- use current chat metadata loaded by `AppShell`

## External data loading flow

Current runtime boot flow:
1. [../assets/index.js:13912](../assets/index.js:13912) calls `loadExternalGrimwildData()`
2. the current source runtime derives path ids from [../src/runtime/assets.js](../src/runtime/assets.js)
3. it fetches each path from [../data/paths](../data/paths)
4. it populates the runtime path tables
5. only then does React render the app

This means the source asset manifest is authoritative for path ids/art mapping, while `data/paths/*` remains authoritative for path definitions.

## Test coverage map

### Harness

- Playwright config: [../playwright.config.js](../playwright.config.js)
- Mock Owlbear runtime: [../test/mock-obr.js](../test/mock-obr.js)
- Package script: [../package.json](../package.json)

### Coverage by area

| Area | Tests | Link |
| --- | --- | --- |
| character list row visibility | long-name empty-path row keeps `Open`, `×`, and `-` visible | [../tests/character-list.spec.js](../tests/character-list.spec.js) |
| character sheet basics | attributes, marks, bloodied/rattled, story/spark, experience, traits, desires, bonds, attribute roll | [../tests/character-sheet.spec.js](../tests/character-sheet.spec.js) |
| core path flow | picker, assign path, change path, details expansion | [../tests/paths.spec.js](../tests/paths.spec.js) |
| talents | add talent, add from another path, remove talent, send description to chat | [../tests/talents.spec.js](../tests/talents.spec.js) |
| pools | render controls, story roll, crucible, PC target, custom roll, custom pool depletion, named pools | [../tests/pools.spec.js](../tests/pools.spec.js) |

## Refactor implications

Safe extraction order:
1. metadata helpers
2. external data loader helpers
3. app shell and screen switching
4. character and path/talent screens
5. pools and chat

Reason:
- app shell is the integration point,
- path data is already externalized,
- tests already exercise the most important user flows.
