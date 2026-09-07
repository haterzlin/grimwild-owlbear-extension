# Migration plan: Grimwild CE Preview 5.2 → Preview 5.3

Status: **Phases 1–2 complete; phases 3–4 not started**. Baseline inspected on 2026-09-06 at commit `1ddd776` (`move explanations from sheet to log`).

Keep the current architecture, manual resource tracking, catalogue, and Playwright tests. Do not add dependencies, a general talent automation engine, or saved-character conversion. This follows the earlier decision to **not support older character versions**, including 5.2 after the cutover.

## 1. Verified baseline and source authority

The starting point is the completed **CE Preview 5.2 implementation**, not the original 4.2 folder or an unfinished phase of the previous migration:

- [manifest.json](manifest.json) identifies CE Preview 5.2 / `5.2.0`; [metadata.js](src/core/metadata.js) accepts `ce-p5.2` characters.
- [README.md](README.md) documents the current version and unsupported-character policy. The previous migration document has been removed; this is an independent plan.
- The catalogue has 17 regular paths with seven non-core talents each, plus Adventurer, and 11 background talents: 18 picker entries and 130 non-core talents in total. No new paths are needed for 5.3.
- [data-loader.js](src/core/data-loader.js) loads path JSON and then replaces `details` with matching entries from [path-details.json](data/path-details.json). Those overrides currently cover Artificer, Psion, Summoner, Swashbuckler, and Witch. Updating overridden inline details alone would have no visible effect.
- [paths.js](src/domain/paths.js) copies catalogue talents and trackers into saved characters. Editing catalogue descriptions does not update existing saved talent snapshots.
- [characters.js](src/domain/characters.js), [AppShell.js](src/app/AppShell.js), and [CharacterList.js](src/screens/CharacterList.js) already filter unsupported records and preserve the surrounding metadata. Reuse that boundary.

Sources, in priority order:

1. **Target rules:** [GWCE P5.3 Pages.pdf](<../ce-5.3/GWCE P5.3 Pages.pdf>) (abbreviated **P53** below). Its title page says *Community Edition – Preview 5.3 (Final)*; it is still a preview, not a claim that the illustrated release has shipped. Citations below use the Pages PDF's page numbers, not spread indices.
2. **Actual baseline rules:** [GWCE P5.2 Pages.pdf](<../ce-5/GWCE P5.2 Pages.pdf>) (**P52**). Compare these directly with P53 to separate new changes from pre-existing omissions.
3. **Target sheets:** [Character Sheets P5.3.pdf](<../ce-5.3/Character Sheets P5.3.pdf>) (**S53**), supporting tracker/layout evidence, not authority over conflicting rules text.
4. **Change log:** [CE Change Log.pdf](<../ce-5.3/CE Change Log.pdf>). It combines changes from multiple previews and the older edition; it is not a standalone 5.2 → 5.3 checklist.
5. [ce-5/sheet](../ce-5/sheet) and [5.2 sheets](<../ce-5/Character Sheets (P5.2).pdf>) are supporting **old** UI/content references only. There is no corresponding 5.3 HTML sheet folder or 5.3 Collected Talents PDF in the supplied sources. Do not treat the older Collected Talents as new content.

The target Spreads PDF is an alternate layout; Printable Story Kits do not imply a new story-kit subsystem in this extension. Do not modify source PDFs or translated sheets as part of this migration.

## 2. Rules-to-code changes

Unless otherwise stated, page references compare P52 and P53 at the same page. Text changes must reach both the displayed talent and its chat broadcast; expanded guidance must reach the effective `details` source.

| Change and source | Affected files / minimal implementation | Acceptance check |
| --- | --- | --- |
| **Infusion:** start with **3**, not 2, major arcana. Rebuilding does not restore uses; vantage effects can continue. [P53 p.54](<../ce-5.3/GWCE P5.3 Pages.pdf#page=54>) | [artificer.json](data/paths/artificer.json); effective Artificer guidance in [path-details.json](data/path-details.json). Retain existing free-text trackers. | New core and broadcast say 3; growth remains +1 major arcana and +2 touchstones at levels 2/4/6. Rebuilding is not described as a refresh. |
| **Arcana guidance:** limited effects normally refresh per session; revised setup/secondary-effect wording and unlimited-use limitations. [P53 pp.40–42](<../ce-5.3/GWCE P5.3 Pages.pdf#page=40>) | Update relevant Artificer help in the same files where that advice is exposed. No arcana evaluator. | No copied guidance promises a lower tier simply because an effect is unlimited. |
| **Animate Objects:** example trick `rideable` becomes `retrieve`. [P53 p.55](<../ce-5.3/GWCE P5.3 Pages.pdf#page=55>) | Artificer details, where the example list is displayed. | Effective detail list uses the target examples. |
| **Kindred Spirits:** story roll determines attitude; Thread can establish a bond. [P53 p.63](<../ce-5.3/GWCE P5.3 Pages.pdf#page=63>) | [druid.json](data/paths/druid.json), description only. | Does not instruct the player to roll an existing bond. |
| **Control:** guidance adds hindering an oversized enemy another way. Its once/session interrupt/perfect-Spark/push rule is unchanged. [P53 p.65](<../ce-5.3/GWCE P5.3 Pages.pdf#page=65>) | [fighter.json](data/paths/fighter.json), only if extending the displayed guidance. | Keep the current talent mechanics and Use checkbox; do not invent a Control pool from the inconsistent sidebar reference. |
| **Oathbreaker:** replace Oathsworn with **Adventurer's Talented**, not a non-core talent or Warlock's Pact; redemption retains **one** gained path talent, once only. [P53 p.68](<../ce-5.3/GWCE P5.3 Pages.pdf#page=68>) | [paladin.json](data/paths/paladin.json), inline details; retain [adventurer.json](data/paths/adventurer.json). Use existing manual path/talent editing. | Guidance contains the new substitution and retention limit; no old Pact alternative. No automated oath/redemption state machine. |
| **Psychic Warrior:** +1d follow-up also triggers on becoming **rattled**. Shift Form clarifies appearance rather than a different basic shape. [P53 p.71](<../ce-5.3/GWCE P5.3 Pages.pdf#page=71>) | [psion.json](data/paths/psion.json), and relevant effective details if duplicated. | Psychic Warrior lists vex, rattled, and increased instability. **Tumultuous Mind is not the changed talent** and keeps its existing vex-transfer rule. |
| **Quarry:** once/session; one special d6 added when the Ranger or an ally researches, locates, or attacks the quarry. A Quarry 6 can add a critical effect. Growth adds quarry selections/session, not pool dice. **Survivalist** replaces Prowler, with scouting, animal handling, traps, and environmental defense benefits. [P53 p.72](<../ce-5.3/GWCE P5.3 Pages.pdf#page=72>) | [ranger.json](data/paths/ranger.json): replace core text, label target and uses clearly with existing tracker types. See manual-roll decision below. | No 2d diminishing Quarry pool, twice/session baseline, defense-against-quarry bonus, or Spark-on-6 wording. Growth at 3/6 is +1 selection each. |
| **Animal Companion:** GM may permit taking it again for 3 extra tricks and another hurt box. **Scout Ahead:** adds escape route; removes interrupt option. [P53 p.73](<../ce-5.3/GWCE P5.3 Pages.pdf#page=73>) | Ranger talent text and trackers. One companion card with editable tricks/flaws and damage capacity/current damage supports the exception without duplicate cards. | Base companion still has 3 tricks, 2 flaws, 3d for tricks/1d otherwise, and 2 damage boxes. GM-approved training can record 3 additional tricks and another hurt box. Scout Ahead stays a 3d montage with GM Suspense. |
| **Expertise:** 2 **Competence points**, spend 1 for a potent feat; no 4d bonus pool. Revised above-board/below-table skills; growth adds 1 Competence/session and 1 skill at 3/6. [P53 pp.74–75](<../ce-5.3/GWCE P5.3 Pages.pdf#page=74>) | [rogue.json](data/paths/rogue.json): core, clear Competence tracker, skill list/detail text. | Base 2 and growth are correct; no pool roll/depletion wording. Skills: blend in, charm, investigate, negotiate, network, parkour; ambush, deception, dismantle, provoke, sleight of hand, stealth. |
| **According to Plan → Mastermind:** listed preparations, fixed **3d** montage, +1 Thread/session and GM Suspense retained. [P53 p.75](<../ce-5.3/GWCE P5.3 Pages.pdf#page=75>) | Rogue talent entry; preserve alphabetical ordering and existing Thread tracker. | Mastermind selectable/broadcastable; old title absent; no Expertise bonus die. Options include contact, decoy, reinforcements, interrupt, swipe/stash item. |
| **Wrath:** next **action**, not next spell. [P53 p.77](<../ce-5.3/GWCE P5.3 Pages.pdf#page=77>) | [sorcerer.json](data/paths/sorcerer.json), description only. | Immediate-lash-out condition and bonus/potency remain; non-spell action is allowed. |
| **Summoner Fallout:** expanded consequences when anchors break. [P53 p.79](<../ce-5.3/GWCE P5.3 Pages.pdf#page=79>) | Summoner section of [path-details.json](data/path-details.json), not its overridden inline details. | Guidance includes possible fallout and avoiding trouble on a perfect; no new anchor automation. |
| **Magus:** once/session enchant a weapon with a trait; end enchantment while using it for a potent effect; weapon is a spell touchstone. Patron's reduced story-roll odds clarified as temporary. [P53 pp.82–83](<../ce-5.3/GWCE P5.3 Pages.pdf#page=82>) | [warlock.json](data/paths/warlock.json): talent, a Use checkbox and optional trait field using existing tracker types, relevant patron guidance. | No perfect-then-push secondary effect or freely changing magical style. Checkbox and trait survive reload. |
| **Wonder Magnet:** wild surge on **any action**, not only spellcasting. [P53 p.85](<../ce-5.3/GWCE P5.3 Pages.pdf#page=85>) | [witch.json](data/paths/witch.json), plus effective details if duplicated. | Text/broadcast allows non-spell actions; leave existing manual surge workflow. |
| **Weapon Styles become optional**, moving out of core rules/creation into Game Options. [P53 p.176](<../ce-5.3/GWCE P5.3 Pages.pdf#page=176>), versus [P52 p.20](<../ce-5/GWCE P5.2 Pages.pdf#page=20>) | [CharacterSheet.js](src/screens/CharacterSheet.js): retain existing field as `Weapon Style (optional)`. Adjust its label-dependent test in [character-sheet.spec.js](tests/character-sheet.spec.js). | Blank is valid; no automatic mechanical effect; no extra settings system. This is deliberately not an exact visual copy of S53. |

### Pre-existing content defects, not new 5.3 mechanics

- [rolls.js](src/runtime/rolls.js) says to **spend Spark to avoid a disaster**. Both [P52 p.11](<../ce-5/GWCE P5.2 Pages.pdf#page=11>) and [P53 p.11](<../ce-5.3/GWCE P5.3 Pages.pdf#page=11>) say the PC **takes Spark**. Correct the guidance. Also include the critical fallback of taking Spark when no bonus comes to mind ([P53 p.10](<../ce-5.3/GWCE P5.3 Pages.pdf#page=10>)). Keep Spark adjustment manual; do not automatically award it on every custom/story/pool roll.
- Psion growth currently says an instability slot at `0d`; both books say **0t** ([P53 p.70](<../ce-5.3/GWCE P5.3 Pages.pdf#page=70>)). Fix that unit while updating Psion.
- Animal Companion currently has only a Mark tracker, not a complete companion record. Adding its basic damage/trick tracking is existing-coverage work needed to represent the new training exception, not a new base damage rule.

### What stays unchanged

Do not rewrite the general action/thorn/critical algorithm, harm modifiers, marks, Spark/Thread counters, XP/level workflow, named pools, metadata keys, OBR transport, or chat architecture. No substantive replacement is required for Bard, Berserker, Cleric, Monk, Swashbuckler, Wizard, Adventurer, or the 11 background talents. Review their displayed content against P53 for minor copy corrections, but do not churn whole files for punctuation or PDF line wrapping. The current test suite is a regression baseline, not proof of rulebook fidelity.

## 3. Conflicts and review decisions

| Issue | Proposed decision / remaining question |
| --- | --- |
| Cumulative log lists earlier talent moves/renames. | Compare books first. Keep Druid's Primordial Bonds/Primal Growth and Witch's Herbalism as P53 actually prints them; do not replay previous migrations. |
| S53 Witch sheet still says **Words of Power** while P53 p.84 says **Hidden Magic**. | Book wins for the core talent name; retain the words-of-power tracker concept. S53 Artificer now says Infusion, resolving the older sheet's Ingenuity discrepancy. |
| Broad take-once advice versus Animal Companion's explicit exception on p.73. | Specific rule wins. Default: one card with editable training/damage notes, not a second companion. Keep generic duplicate-talent prevention in `paths.js` and `PathScreen.js`; record GM-approved extra training manually. Review whether dedicated retake UX is wanted before expanding scope. |
| Quarry die identity matters: a 6 has a special effect even when the normal outcome is not a critical. Current roller stores only undifferentiated d6. | **Default: manual resolution**, consistent with existing non-automated talents. Roll a separate custom 1d (not a depleting pool), identify it as Quarry, and combine its raw face with the action dice/thorns at the table. Document that the separate roll's normal outcome is not the combined result and that a Quarry critical effect does not itself grant critical immunity to thorns. A dedicated labelled Quarry die and recomputed chat outcome would be a separate, explicitly approved enhancement touching both roller and callers; simply adding an anonymous bonus die is insufficient. |
| Optional Weapon Styles disappear from the main S53 layout. | Keep the already-optional field with an explicit optional label. Remove it only if matching the PDF layout is preferred over retaining this existing feature. |
| Control sidebar still refers to “roll the pool,” but its talent has no pool. Some cross-references are stale (e.g. bonus dice reference versus actual p.53). | Follow the explicit talent rule; do not infer new mechanics from stray references. Use actual Pages PDF destinations when adding links. |
| Harm prose and sheet shorthand require table interpretation. | No new automated recovery interpretation in this migration; keep the existing manual workflow. |

These are defaults for review, not permission to expand the implementation. The most consequential product decision is whether manual Quarry resolution is sufficient for the release.

## 4. Saved-character compatibility

**Accept only fresh `ce-p5.3` characters after release.** This intentionally makes 5.2 characters unsupported as well as all older, unversioned, unknown-version, or structurally invalid records.

- Change the existing `CE_RULES_VERSION` constant to `ce-p5.3`; reuse the current shape checks and supported-character filtering. Do not add a second schema framework.
- Do not convert, alias old talents, refresh old snapshots, auto-stamp old records, or introduce migrations/backups/import tooling. In particular, do not map According to Plan into Mastermind or old Quarry/Competence pools into new resources.
- Leave unsupported records intact in scene metadata. They cannot be opened or edited as supported characters. Show the existing warning updated for 5.3, with manual recreation guidance.
- Creating, editing, and deleting a supported character must not overwrite unsupported records or other players' records. Preserve chat, pools, and unrelated metadata; do not rename the metadata namespace.
- New characters receive the current marker and fresh target catalogue snapshots. Old data can be manually re-entered by the user, but changing an old record's marker alone is not a supported upgrade.
- Keep the version flip and new catalogue in one release. Staging catalogue changes on a development branch is not a deployable intermediate compatibility state.

## 5. Ordered implementation phases

All phases below are **not started**. Execute and review them separately; do not deploy intermediate phases.

### Phase 0 — Lock the baseline and agreed scope

Affected files: this plan; existing tests only if a small missing baseline assertion is useful.

- Reconfirm HEAD, source versions, catalogue counts, and the completed 5.2 compatibility boundary before editing.
- Confirm the manual Quarry, one-card companion training, optional Weapon Style, and no-5.2-support defaults above.
- Run `npm run test:e2e -- --reporter=line` and `npm run build`; record results rather than fixing unrelated failures silently.

Acceptance: baseline recorded, conflicts have explicit defaults or decisions, and no implementation or source-file edits are disguised as planning.

### Phase 1 — Update the target catalogue and effective guidance

Affected files: `data/paths/{artificer,druid,paladin,psion,ranger,rogue,sorcerer,warlock,witch}.json`, `data/path-details.json`; `fighter.json` only for the relevant guidance. Tests: `tests/paths.spec.js`, `tests/talents.spec.js`.

- Apply the table's substantive content changes and Psion unit correction. Preserve sorted talent order and existing data shapes.
- Update the actual effective detail source, including Paladin's inline Oathbreaker and Summoner's overridden guidance.
- Add focused assertions in existing suites for new core text, renamed Mastermind, retained talent counts, and key removed mechanics. Check rendered/broadcast content as well as fetched JSON.

Acceptance: all 18 paths load; all 17 regular paths still have seven talents; background count stays 11; no old Quarry pool, old Competence pool, or old Magus trigger is displayed. Run `npm run test:paths` and `npm run test:talents`.

**Status: complete (2026-09-07).** Updated the nine target path catalogues, Fighter's Control guidance, effective Artificer details, and overridden Summoner details. Added focused catalogue and rendered broadcast assertions. The current source has no separate Animate Objects example list; the target `retrieve` example is represented in its command guidance. Magus trackers remain deferred to Phase 2 so this phase only changes its rule text.

Validation:

- `npm run test:paths -- --reporter=line`: **passed, 9/9**.
- `npm run test:talents -- --reporter=line`: **passed, 6/6**.
- `npm run build`: **passed** (Vite 7.3.2, 53 modules).
- JSON parsing and catalogue checks: **passed**; 18 paths, 17 seven-talent regular paths, and 11 background talents.
- The first test attempt could not bind the configured local server (`listen EPERM`); a concurrent retry also hit port 8000 contention. Both suites passed after using the user-started local server.

Deviations: none from the phase 1 acceptance scope. Manual Quarry handling, companion/tracker representation, Magus trackers, disaster guidance, optional Weapon Style, and version cutover remain deferred to later phases.

### Phase 2 — Trackers and minimal UI/roll guidance

Affected files: Ranger/Rogue/Warlock JSON; `src/screens/CharacterSheet.js`, `src/runtime/rolls.js`; existing character-sheet, talent, and pool tests. Add changes to other runtime files only if a reviewed decision requires them.

- Represent Quarry target/uses, Competence, Magus use/trait, and companion training/damage using existing tracker types. Do not automatically reset sessions, enforce levels, or infer GM approval.
- Keep a single companion talent; editable capacity/notes must permit the GM-approved extra hurt box without a blanket duplicate-talent exception.
- Relabel Weapon Style as optional. Put clear manual Quarry instructions in the relevant talent/help text.
- Correct disaster and critical guidance without changing dice math or auto-adjusting Spark.

Acceptance: changed trackers initialize independently and persist after reload; ordinary duplicate protection remains; companion base and upgraded damage capacity are representable. A manual Quarry example with action dice `[4]` and Quarry `[6]` is explained as a perfect with an added critical effect, not automatically a critical. Deterministic roll tests verify disaster guidance, unchanged thorn cuts/critical immunity, and no unexpected resource writes. Run `npm run test:character-sheet`, `npm run test:talents`, and `npm run test:pools`.

**Status: complete (2026-09-07).** Added current/max tracker fields for Quarry uses, Competence, and companion hurt capacity; editable Quarry target, companion tricks/flaws, and Magus trait fields; and a Magus use checkbox. The existing single-companion and duplicate-talent flows remain unchanged. Weapon Style is explicitly optional. Roll guidance now says to take Spark for a disaster and when no critical bonus comes to mind, while criticals remain unaffected by thorn cuts.

Validation:

- `npm run test:character-sheet -- --reporter=line`: **passed, 11/11**.
- `npm run test:talents -- --reporter=line`: **passed, 7/7**; focused tracker rerun also passed after the final Quarry text assertion.
- `npm run test:pools -- --reporter=line`: **passed, 11/11**; focused deterministic roll rerun also passed after the final no-resource-write assertion.
- `npm run build`: **passed** (Vite 7.3.2, 53 modules).
- Deterministic roll coverage confirms `[6, 6]` with an `[8]` thorn remains Critical, and `[1]` with an `[8]` thorn becomes Disaster with the corrected Spark guidance.

Deviations: no source or rules deviations. The automated mock Owlbear page resets its in-memory scene on a full browser reload, so tracker coverage verifies initialization and scene-metadata persistence during the test session; true cross-process reload persistence remains part of the Phase 4 real-Owlbear smoke test.

### Phase 3 — Cut over version and compatibility messaging

Affected files: `src/core/metadata.js`, `src/screens/CharacterList.js`, `manifest.json`, `README.md`, `tests/character-list.spec.js`, `tests/helpers/characters.js` if needed. Inspect existing domain/AppShell behavior; change it only for a demonstrated gap.

- Set rules marker `ce-p5.3`, manifest display to CE Preview 5.3 and app version to `5.3.0`. Update user-facing release guidance.
- Extend the existing mixed-metadata test with valid 5.3, valid-but-unsupported 5.2, older/unversioned, future-version, and malformed current-version records. Preserve explicit old-version fixtures rather than mechanically replacing every `5.2` string.
- Exercise create, update, reload, and supported-character deletion while asserting unsupported records and other metadata remain intact.

Acceptance: only structurally valid current-version characters are editable; new saves carry `ce-p5.3`; the warning names 5.3; there is no migration path or silent deletion. Run `npm run test:character-list` and the full suite.

### Phase 4 — Release verification and handoff

Affected files: existing tests only for uncovered regression cases, README and this document for status/evidence. No separate test framework.

- Run the full suite and production build from the final tree. Check shipped data and manifest, not just dev-server content.
- In a copied Owlbear scene, smoke-test as GM and player: unsupported 5.2 warning, new character, Ranger/Rogue/Warlock trackers, talent broadcast, ordinary rolls, manual Quarry resolution, companion training notes, pools/chat, save/reopen, and preservation of other records.
- Check path details after production loading and confirm there are no missing assets or accidental requests to obsolete content.
- Record each phase's completion, command results, source deviations, and remaining manual limitations here. Publish only after review; this plan does not authorize deployment.

Acceptance: all automated checks pass; real-OBR smoke results are recorded or explicitly remain a release blocker; reviewer accepts the manual-workflow limitations.

## 6. Planning validation

- Local P52/P53 rulebooks were compared directly, including core rules and all path pages, with S53 and the cumulative log used as supporting checks.
- Baseline `npm run build`: **passed** (Vite 7.3.2, 53 modules).
- Baseline `npm run test:e2e -- --reporter=line`: not rerun; Phase 1 used its two scoped suites as specified.
- No real-Owlbear smoke test was performed during planning. No application code, character records, or rule sources were changed.
