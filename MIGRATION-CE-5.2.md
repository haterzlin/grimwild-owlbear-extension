# Migration plan: Grimwild 1.4 → Community Edition Preview 5.2

Status: **Phase 2 complete; Phase 3 implementation not started.**

Inspected on 2026-09-05 against extension commit `bc33c55`; character-support scope simplified on 2026-09-06. This document is the implementation handoff. Check off phases only after their acceptance checks pass; record deviations and validation results here. Two subagents investigated rules and extension behavior independently. Both returned partial findings before a workspace credit limit stopped them; the lead verified those findings and completed this plan from the local sources.

## 1. Baseline, source authority, and scope

The folder name `4.2` is misleading: [its rules PDF, PDF page 3](../4.2/rules.pdf#page=3) explicitly identifies **First Edition, Version 1.4**. The extension [README](README.md), [manifest](manifest.json), and commit `9e0db06` (`migrate to rules version 1.4 with backward compatibility layer`) agree. Existing compatibility fixtures additionally represent saved **1.2** characters. This is a **1.4 → CE P5.2** rules/code upgrade, not a verified rules-4.2 migration. **User decision, 2026-09-06: support only new CE P5.2 characters; older character versions are unsupported and must be recreated manually.**

All page references below are **one-based PDF page numbers**. In `GWCE P5.2 Pages.pdf`, they coincide with printed page numbers. In the original rules, printed page 12 is PDF page 14. Links target the Pages edition to avoid confusing spread numbers with page numbers.

Source precedence adopted in Phase 0 (2026-09-06):

1. [GWCE P5.2 Pages.pdf](../ce-5/GWCE%20P5.2%20Pages.pdf): primary rules and path-content authority, explicitly Preview 5.2 on page 1. The Spreads PDF is an alternate layout, not a different upgrade target.
2. [Character Sheets (P5.2).pdf](../ce-5/Character%20Sheets%20%28P5.2%29.pdf): tracker/layout reference and the sheet-only Adventurer option. Disagreements with the book are recorded below.
3. [English HTML sheets](../ce-5/sheet/adventurer.html): reusable content and tracker guidance, not an instruction to rebuild the extension as printable sheets. The [sheet README](../ce-5/sheet/README.md) identifies them as CE 5.2.
4. [Collected Talents.pdf](../ce-5/Collected%20Talents.pdf): cross-check only where consistent with the book; it contains at least one extra talent.
5. [CE Change Log.pdf](../ce-5/CE%20Change%20Log.pdf): a discovery checklist, not exact P5.2 replacement text. Its heading is “1.4 (Original) to Current CE Version,” and some entries disagree with P5.2.

The migration should update the extension's existing character sheet, path/talent catalogue, automated basic rolls, pool guidance, and CE-only character persistence. Include the 17 named book paths, the sheet's Adventurer option, and the 11 Background talents. Do not migrate or support older saved characters or their legacy/custom talent records. A complete optional Legacy talent picker is outside this plan. Keep English UI, React/Vite, current Owlbear integration, metadata namespaces, and Playwright. No framework replacement, sheet-generator changes, translation work, new art dependency, or automatic implementation of every talent effect is needed.

## 2. Source conflicts and adopted decisions

| ID | Evidence | Adopted treatment |
| --- | --- | --- |
| S1 | `4.2` directory versus explicit version 1.4 in the old PDF, README, and history. | Use 1.4 in migration documentation. Do not rename the reference directory. Resolved by source evidence. |
| S2 | Change log p1 says any pool dropping no dice offers a secondary effect or player push. [Book p18](../ce-5/GWCE%20P5.2%20Pages.pdf#page=18) limits player push/pivot to **task pools**; for other pools the GM can spend suspense to drop 1d. | Follow book p18. Generic pool output must describe the conditional choices, not automatically award an effect on every pool. |
| S3 | Change log p2 says Druid Primordial Bonds becomes Primordial Forces. [Book p63](../ce-5/GWCE%20P5.2%20Pages.pdf#page=63) and [Druid HTML](../ce-5/sheet/druid.html) retain **Primordial Bonds**, add **Primal Growth**, and omit Herbalism from Druid. | Use the book's seven talents. Do not use the log's Primordial Forces name for the current Druid catalogue. Herbalism now appears under Witch, p85. |
| S4 | [Book p54](../ce-5/GWCE%20P5.2%20Pages.pdf#page=54) names Artificer core **Infusion**; [sheet PDF p2](../ce-5/Character%20Sheets%20%28P5.2%29.pdf#page=2) and [HTML](../ce-5/sheet/artificer.html) use **Ingenuity**. The book also explicitly includes all arcana functions among its touchstones. | Use Infusion and the book's full wording; borrow tracker layout from the sheets. |
| S5 | [Book p84](../ce-5/GWCE%20P5.2%20Pages.pdf#page=84) names Witch core **Hidden Magic**; [sheet PDF p17](../ce-5/Character%20Sheets%20%28P5.2%29.pdf#page=17) and [HTML](../ce-5/sheet/witch.html) call it **Words of Power**. | Use Hidden Magic as the talent name and Words of Power as its tracker label. |
| S6 | [Collected Talents p1](../ce-5/Collected%20Talents.pdf#page=1) includes **Chosen Eidolon**, absent from [Summoner p79](../ce-5/GWCE%20P5.2%20Pages.pdf#page=79) and its HTML sheet. | Exclude it from the standard P5.2 catalogue unless expressly selected as supplemental content. |
| S7 | [Book p27](../ce-5/GWCE%20P5.2%20Pages.pdf#page=27) describes dropping on harm that would make you Desperate a second time; p28 says taking any harm while Desperate drops you. | Keep harm progression and Dropped adjudication manual. Add the unambiguous Desperate tracker and +1t rule; do not encode a damage state machine until this is resolved. |
| S8 | The [sheet PDF p1](../ce-5/Character%20Sheets%20%28P5.2%29.pdf#page=1) and Adventurer HTML define **Talented**; the book's path list p45 does not include Adventurer. | Include it as an explicitly sheet-sourced option: two extra starting non-core talents, plus one extra at levels 3 and 6. Do not confuse an unassigned path with Adventurer. |
| S9 | Change log p1 says talents can only be taken once. No equivalent explicit blanket sentence was located in the main P5.2 character-creation/Paths & Talents sections. Existing code allows duplicate additions. | Adopted rule: block new duplicate selections, based on the change log. This is a changelog-sourced decision, not a book quote. |
| S10 | Change log understates Wizard changes: [book p87](../ce-5/GWCE%20P5.2%20Pages.pdf#page=87) also has Countermagic and Specialty School; Familiar is under Witch p85. | Audit complete talent lists against the book instead of applying only listed renames. |

Implementation decisions recorded in Phase 0, adopting the plan's defaults under the request to implement this phase:

- **Character versions — decided:** CE P5.2 only. No import, automatic conversion, mapping tables, conversion UI, or older-character compatibility. Users create new CE characters; section 5 defines the minimal storage boundary.
- **Automation scope:** retain editable trackers and manual talent adjudication. Psion instability, Panache dice, Quarry bonus dice, Sorcerer twists, spell expenditure, and session resets will not become automatic merely because the paths are added. If full automation is desired, plan it separately before promising that behavior.
- **Optional content:** include Adventurer and Background talents, but omit a Legacy picker and optional rules such as Vigor, Armor, wealth, token initiative, and stat progression by default. These are not mandatory CE mechanics; see book pp174–179.
- **Source policy:** use the book-first resolutions above: S4 Infusion; S5 Hidden Magic with Words of Power trackers; S6 omit Chosen Eidolon; S7 manual harm progression; S8 include sheet-sourced Adventurer; S9 disallow new duplicate talents using the changelog rule. S7's wording conflict remains unresolved but does not block manual harm controls. None requires changing the supplied PDFs or sheets.

## 3. Existing implementation and verification baseline

The maintained flow is [main.js](src/main.js) / [chatpopover-main.js](src/chatpopover-main.js) → [runtime/entry.js](src/runtime/entry.js) → [AppShell.js](src/app/AppShell.js) → existing screens/domain functions. `DEFAULT_PATH_ASSETS` supplies the keys loaded by [data-loader.js](src/core/data-loader.js), so adding a JSON file alone does not make a path selectable. Preserve the `/chatpopover` route compatibility override.

- Catalogue: **12 core paths and 84 non-core talents**, in [data/paths](data/paths). All 12 have seven path talents. Descriptions, optional details, and trackers are data-driven. Existing tracker types are `checkbox`, `field`, `fieldSmall`, `fieldSmallLong`, and `fieldTwo`; reuse them before adding types.
- Character data: [createEmptyCharacter](src/domain/characters.js) contains the CE `rulesVersion` marker, four stats/marks, Bloodied/Rattled/Desperate, `story1/2` backing Thread, `spark1/2`, `weaponStyle`, XP, backgrounds/wises, arcs, traits/desires, bonds, complete selected talent objects, and biography.
- Persistence: [metadata.js](src/core/metadata.js) stores records under the existing character/pool/chat/GM namespaces. [AppShell](src/app/AppShell.js) filters to valid `ce-p5.2` records on load and saves the selected CE record directly after its debounced edit. Unsupported records remain in the scene record map.
- The former [path normalization](src/domain/paths.js) that matched old tracker names/positions and rewrote saved talents was removed in Phase 1. New talent selections still use `initializeTalent`; saved CE talent and tracker values are not rewritten on load/save.
- A read-only reproduction with `LEGACY_1_2_MESSY_CHARACTERS` confirmed an existing loss: Paladin `Tenet 1 = "Never abandon a companion"` is consumed by positional checkbox matching, leaving `Tenet #1` blank. [compatibility.spec.js](tests/compatibility.spec.js), test “normalizes messy legacy fixtures…”, fills a replacement before checking and does not catch the lost original value. This is a historical finding, not a required legacy fix under the revised scope; retire that compatibility code and its tests.
- Recovery today is a rolling, single localStorage backup written on GM metadata changes. It contains character/pool/chat data, checks room identity but not scene identity on restore, and omits GM state. It is **not** an immutable pre-migration snapshot. No user-facing character import/export flow was found.

Historical validation during analysis (2026-09-05; superseded by Phase 0 results below):

- `npm run build`: **passed**; production bundle generated using the existing build.
- `npm run test:e2e -- --reporter=line`: sandbox could not start the local server; rerun outside the sandbox discovered **34 tests**. A recorded failure in `tests/character-list.spec.js:11` calls `window.__grimwildTestApi.setCharacters` before the API exists. The retained `.last-run.json` records this failed test. The suite is **not green**; no complete passing-test total is claimed here.
- The likely test issue is readiness timing: this test calls the mock API immediately after navigation, while compatibility tests first wait for CHARACTER LIST. Confirm that cause before making a small test correction. The failed snapshot showed “No Scene found”; do not assume the application itself passed every startup scenario.
- Browser tests use a mock Owlbear runtime; a real Owlbear scene and multiplayer smoke test remain release checks. No production scene data was modified during analysis.

## 4. Rules-to-code change table

“Manual” means the extension exposes the relevant text/tracker while the table decides the fictional effect. It does not mean omitting required new content.

| Area | Verified rule change / invariant | Code and minimal planned change | Acceptance evidence |
| --- | --- | --- | --- |
| Thread | [Old PDF p17](../4.2/rules.pdf#page=17) Story currency → [CE p25](../ce-5/GWCE%20P5.2%20Pages.pdf#page=25) Thread; still two base uses/session. | [CharacterSheet](src/screens/CharacterSheet.js), relevant path JSON. Change visible currency labels/text; retain `story1/2` storage names. Use Thread labels in new talent templates; no old tracker mapping. | New CE characters' check states survive load/save. “Story roll,” “Story Arcs,” and GM Story buttons remain correctly named. Extra Thread from talents remains separately trackable. |
| Marks and harm | [Old PDF p18](../4.2/rules.pdf#page=18) harm applies to all rolls; [CE p27](../ce-5/GWCE%20P5.2%20Pages.pdf#page=27) Bloodied applies to Brawn/Agility, Rattled to Wits/Presence, Desperate adds +1t to all rolls. Marks add +1t independently and then clear. | [characters](src/domain/characters.js), [contracts](src/contracts/entities.js), [CharacterSheet](src/screens/CharacterSheet.js). Add `desperate: false`. Correct `AttributeStat`: current `Brawling` comparison misses Brawn marks; `else if` incorrectly suppresses marks under harm. Calculate by stat identity and stack applicable modifiers. | Four-stat matrix with each harm, both harms, marks, and Desperate. Relevant harm + mark + Desperate gives 3t. Irrelevant harm gives none. Only the rolled stat's mark clears, even when harmed. |
| Other character rolls | [CE pp16,27](../ce-5/GWCE%20P5.2%20Pages.pdf#page=16): story rolls can have thorns; Desperate applies to all of the character's rolls, not the GM's unrelated oracle/pool rolls. | [PoolsAndChat](src/screens/PoolsAndChat.js), [AppShell](src/app/AppShell.js), [runtime/rolls](src/runtime/rolls.js). Keep generic GM Story rolls; make player story/power-roll modifiers expressible with the existing custom dice/thorn controls and clear guidance. Do not infer an actor from the displayed sender name or auto-add harm twice to manually entered thorn totals. | A Desperate player's non-stat roll can be made with the correct extra thorn; an unrelated GM Story roll stays unchanged. Document manual modifier entry outside attribute shortcuts. |
| Weapon styles | [CE pp20,46](../ce-5/GWCE%20P5.2%20Pages.pdf#page=20) explicitly track weapon descriptors; [HTML](../ce-5/sheet/adventurer.html) supplies a panel. | Add one `weaponStyle: ""` free-text field in characters/contracts/CharacterSheet. | New CE characters start with an empty field; entered text persists without changing biography. |
| Existing identity and XP | [CE pp20–22,26,31,46](../ce-5/GWCE%20P5.2%20Pages.pdf#page=31): four stats, backgrounds/wises, traits/desires/bonds, level 1–7; cumulative XP thresholds remain 2,5,9,14,20,27. | Retain fields and threshold functions. Existing free text can hold several wises/arcs; clarify labels/help rather than restructuring saved arrays. Character creation still needs editable stats, not a new builder. | Existing XP boundary, identity, bond, and free-text tests pass. CE character edits and reloads preserve XP/stats. |
| Criticals/disasters | [Old PDF p14](../4.2/rules.pdf#page=14) and [CE pp10–11](../ce-5/GWCE%20P5.2%20Pages.pdf#page=10) retain dice thresholds, cuts, and critical immunity. CE explicitly offers Spark as fallback; disaster wording is worst-case consequences plus Spark. | Preserve outcome algorithm in [rolls.js](src/runtime/rolls.js). Update hardcoded critical/disaster help there and in CharacterSheet; replace “Double the risk.” Do not automatically award/spend currency. | Deterministic dice: multiple 6s ignore cuts; 7/8 thorn cuts stepwise to Disaster; guidance includes Spark without altering stored counters. |
| Pools | [Old PDF p15](../4.2/rules.pdf#page=15) → [CE pp18–19](../ce-5/GWCE%20P5.2%20Pages.pdf#page=18): retain 1–3 removal and 2/4/8 sizes; extend task push/pivot beyond a 1d pool; other pool no-drop response uses GM suspense. | [domain/pools](src/domain/pools.js) `buildNamedPoolRollEntry` currently says “Take secondary effect” for every unchanged pool. Correct named and custom pool guidance consistently. Retain editable values and manual push/mark/suspense changes; no automatic pool typing needed. | Named and custom pools with no drops show conditional task/other-pool guidance; normal depletion persists; zero-dice rolls do not misleadingly award an effect. |
| Power/bonus pools | [CE pp19,53](../ce-5/GWCE%20P5.2%20Pages.pdf#page=19): bonus dice must not refill a diminishing pool or count toward its dropped dice. | Keep power/resource quantities in talent trackers and named pools. Existing custom “pool” mode treats every rolled die as pool dice: explicitly document rolling bonus dice separately; do not present it as combined bonus-pool automation. | Manual workflow can record base pool depletion separately from bonus dice. No automatic consumption/reset based on talent text. |
| Vantage, potency, magic | [CE pp12–13,24,32–38](../ce-5/GWCE%20P5.2%20Pages.pdf#page=24): no universal 3t impossibility, potency does not simply erase thorns, invocations replace ritual rites; no-risk spell exceptions are talent-specific (Sorcerer still always rolls, p76). | Update relevant path descriptions and existing hints. Keep GM adjudication; do not add a vantage calculator, blanket thorn cancellation, or generic spell-resource engine. Cleric **rite pools** remain valid terminology. | Search/review active catalogue for obsolete cantrip, ritual, potency, and currency wording; omit obsolete legacy catalogue entries. Custom rolls with 3+ thorns remain possible. |
| Talent uniqueness | Change log p1, subject to S9; [CE p52](../ce-5/GWCE%20P5.2%20Pages.pdf#page=52) permits cross-path talent selection. | Guard [addTalentToCharacter](src/domain/paths.js) and disable/explain duplicate choices in [PathScreen](src/screens/PathScreen.js). Compare current catalogue identities; no legacy aliases or fuzzy matching. | Duplicate direct domain call and UI click do not add another; cross-path addition works. CE selections remain individually editable and removable. |
| Path catalogue | [CE pp45,54–87](../ce-5/GWCE%20P5.2%20Pages.pdf#page=45) + sheet Adventurer. | Update existing JSON; add six JSON files (five new-to-extension book paths plus Adventurer). Register keys in [assets.js](src/runtime/assets.js). Reuse existing Artificer/Psion images; use a deliberate existing-image fallback for missing art. | Exactly 18 intended core options, correct core assignment, all seven talents on each named book path, no missing fetches/images; Adventurer has its own core and cross-path choices. |
| Background talents | [CE pp88–89](../ce-5/GWCE%20P5.2%20Pages.pdf#page=88): 11 talents available to all paths. | One talent-only JSON collection (proposed `data/background-talents.json`), loaded through the existing loader and exposed in the existing talent picker. Include it in lookup/duplicate checks, not the core-path/art registry. | All 11 selectable from any path, persist and broadcast; “Background” never becomes an assignable core path. |
| GM tools | [CE pp92–93](../ce-5/GWCE%20P5.2%20Pages.pdf#page=92): Story odds remain 1/2/3d. Existing crucible uses the same word sets, although some positions differ in the book. | Keep current odds and random word selection; the app does not expose d66 coordinates, so table reordering adds no benefit. Retain Suspense counter and PC targeting. | Existing Story, crucible, target-PC, pool, and popover tests continue to pass. |
| Out-of-scope rules chapters | GM move descriptions, monsters, exploration, optional rules, and story kits have expanded. | The extension does not currently expose those rulebooks or engines. Do not add new screens just to mirror every chapter. Update any affected talent references that are already shown. | Release notes accurately describe supported sheet/catalogue/roll behavior and manual limitations. |

### Path content inventory

Read both pages for each path, including core growth and selected-talent trackers. This is an inventory for new CE templates; no saved-state conversion is required. The book has **119 non-core entries across 17 named paths**, plus **11 Background talents**. Adventurer adds a core option, not another seven-talent list.

| Path / data file | P5.2 authority | Required content and tracker changes |
| --- | --- | --- |
| [Bard](data/paths/bard.json) | [pp56–57](../ce-5/GWCE%20P5.2%20Pages.pdf#page=56) | Bardsong → Inspiration (3/session, growth at 2/4/6). Remove Influence from current picker, add Folk Hero. Jack of All Trades now has a 3d pool, not a permanent stat increase. Create fresh Inspiration and Jack of All Trades trackers. |
| [Berserker](data/paths/berserker.json) | [pp58–59](../ce-5/GWCE%20P5.2%20Pages.pdf#page=58) | Update Frenzy and full talent wording/trackers; Warsongs → Warcry, two uses/session. Create use trackers matching CE semantics. Keep canonical ID `berserker`; the HTML filename is misspelled `berseker.html`. |
| [Cleric](data/paths/cleric.json) | [pp60–61](../ce-5/GWCE%20P5.2%20Pages.pdf#page=60) | Channel Divinity: one 6d major rite and two 4d minor rites, +1d each at 3/6. Provide deity/tenet fields and fresh rite choices. Healer revised; Iron Will becomes a 2d resource pool. |
| [Druid](data/paths/druid.json) | [pp62–63](../ce-5/GWCE%20P5.2%20Pages.pdf#page=62) | Wild Shape becomes 2d resource pool per scene, +1d at 3/6. Current list: Augury, Awaken, Kindred Spirits, Primal Growth, Primordial Bonds, True Shape, Windcaller. Herbalism moves to Witch; Verdant Whispers leaves this list. Do not apply the conflicting log rename. |
| [Fighter](data/paths/fighter.json) | [pp64–65](../ce-5/GWCE%20P5.2%20Pages.pdf#page=64) | Weapon Mastery retains its name but changes from mastery dice to +1d in style and 2 mastery/scene, +1 at 3/6. Provide a fighting-style field and fresh mastery-use tracker. Bulwark becomes a 2d resource pool. |
| [Monk](data/paths/monk.json) | [pp66–67](../ce-5/GWCE%20P5.2%20Pages.pdf#page=66) | Keep Discipline with verified CE text; remove Flow State and Primordial Forces from current picker, add Redirect and Resonance; update Tether and other text/trackers. Only the CE talent list is selectable. |
| [Paladin](data/paths/paladin.json) | [pp68–69](../ce-5/GWCE%20P5.2%20Pages.pdf#page=68) | Verify Oathsworn, Smite, growth, affirmation and tenets. Aegis/Guardian exchange responsibilities; use CE effects and correctly named Tenet fields. |
| [Ranger](data/paths/ranger.json) | [pp72–73](../ce-5/GWCE%20P5.2%20Pages.pdf#page=72) | Hunter's Mark → Quarry: twice/session, 2d bonus pool, +1d at 3/6; include Prowler. Track target and uses without conflating them with pool dice. Update companion and other path text. |
| [Rogue](data/paths/rogue.json) | [pp74–75](../ce-5/GWCE%20P5.2%20Pages.pdf#page=74) | Expertise: choose three skills, 4d Competence, growth at 3/6 adds skill and die. Trap Sense leaves current picker; add Distraction. According to Plan applies to broader flashbacks. Provide fields for the new skill choices. |
| [Sorcerer](data/paths/sorcerer.json) | [pp76–77](../ce-5/GWCE%20P5.2%20Pages.pdf#page=76) | Provide chosen magical twist and paths/techniques fields. Always-risk exception remains. Subtle Casting → Metamagic with changed use/effect; Wisps and other talent wording change. Twists remain manual. |
| [Warlock](data/paths/warlock.json) | [pp82–83](../ce-5/GWCE%20P5.2%20Pages.pdf#page=82) | Pact retains its name but gains changeable Eldritch Talents and an 8d Patience pool. Provide patron/nature/desire/bond fields. Hex leaves current picker; add Affliction. Replace Eldritch Weaponry with Magus and Ritualist with Blood Rituals in the catalogue. |
| [Wizard](data/paths/wizard.json) | [pp86–87](../ce-5/GWCE%20P5.2%20Pages.pdf#page=86) | Spellcraft: four theorems, four spell uses/two potent uses; growth at 2/4/6. Provide theorem-name and school fields. Current list: Alchemist, Archivist, Colleagues, Component Pouch, Countermagic, Mastered Theorem, Specialty School. Familiar moves to Witch; Arcanist/Arcane Specialty change name and wording; Prepared Spell leaves current picker. |
| Artificer — new `artificer.json` | [pp54–55](../ce-5/GWCE%20P5.2%20Pages.pdf#page=54) | Infusion, touchstones and created arcana; seven path talents. Reuse existing `assets/artificer.webp`. See S4. |
| Psion — new `psion.json` | [pp70–71](../ce-5/GWCE%20P5.2%20Pages.pdf#page=70) | Awakened Mind uses bastions and instability, not legacy power points. Track the 0t/1t/2t progression and growth using existing fields/checkboxes. Reuse `assets/psion.webp`. |
| Summoner — new `summoner.json` | [pp78–79](../ce-5/GWCE%20P5.2%20Pages.pdf#page=78) | Vassal, 4d power pool, aspect choices and separate vassal mark/harm. Seven talents; omit Chosen Eidolon under S6. Do not treat vassal harm as PC harm. |
| Swashbuckler — new `swashbuckler.json` | [pp80–81](../ce-5/GWCE%20P5.2%20Pages.pdf#page=80) | Panache starts at 2/scene, grows at 2/4/6, and may exceed maximum when gained from cuts. Use an editable numeric tracker rather than a hard-capped checkbox row. Include Quick Wit and seven talents. Positive Panache dice are not ordinary cutting thorns; adjudicate manually at this scope. |
| Witch — new `witch.json` | [pp84–85](../ce-5/GWCE%20P5.2%20Pages.pdf#page=84) | Hidden Magic: six words with burned state, +2 at 2/4/6, plus Ritualist guidance. Seven talents include Familiar and Herbalism moved from existing paths. See S5. |
| Adventurer — new `adventurer.json` | [sheet PDF p1](../ce-5/Character%20Sheets%20%28P5.2%29.pdf#page=1), [HTML](../ce-5/sheet/adventurer.html) | Talented: two additional starting non-core selections; extra talent at 3/6. Explain entitlement; do not automatically choose talents or alter XP. |
| Background — new talent-only collection | [pp88–89](../ce-5/GWCE%20P5.2%20Pages.pdf#page=88) | Aquatic, Clout, Crowd Favorite, Cultural Weapon, Flight, Pint-Sized, Regeneration, Salt of the Earth, Simple Deduction, Teamwork, Thieves' Cant. Add applicable pools/choices/uses using existing trackers. |

For every JSON update, check `coreTalent`, `pathTalent`, `details`, `other`, growth levels, and tracker names/types/counts. New characters initialize talents from CE templates; ordinary saves/reloads retain their stored values without legacy normalization.

## 5. CE-only character storage

**Decided by the user on 2026-09-06: older character versions are not supported.** Players must create new CE P5.2 characters and manually re-enter any information they want to keep.

- Add `rulesVersion: "ce-p5.2"` when creating a character. Load/edit only records with that exact marker and a valid current shape. Missing or different versions are unsupported; do not infer versions or stamp old records as CE.
- Leave unsupported records untouched in scene metadata and omit them from the editable character list. If present, show one short notice explaining that older characters must be recreated. New CE saves must merge into the existing record map so that filtering the list never deletes other records.
- Remove older-character template normalization and its load/save callers. Initialize new talents from CE templates; save and reload their current values directly. Keep basic input validation and error handling for CE records.
- No conversion wizard, legacy rendering/editing, tracker/name aliases, migration snapshots, export/import workflow, or legacy recovery drill. Do not add 1.4 fixtures or repair the historical Paladin conversion bug.
- Retain the existing metadata namespaces and ordinary CE fields. Keep `story1/2` backing Thread if that saves code; the field spelling is not a compatibility promise. New characters initialize `desperate: false` and `weaponStyle: ""`.
- Keep scene pools, chat, and GM Suspense outside this character-version change. Old backups must not bypass the CE-only character check, and normal CE writes must not erase unsupported records. Do not redesign the backup system for character migration.
- Retire tests/fixtures that assert support for older characters. Replace them with a small CE persistence check and one unsupported-version boundary check. Document the breaking change in README/release notes; no automatic deletion of existing data is authorized.

## 6. Ordered implementation phases

Each phase is one reviewable change or a small sequence of commits. Preserve unrelated user edits. Run focused existing suites while working and the full suite/build at the phase boundary; do not install a new test framework. New fixture data should be anonymized/synthetic and should not be generated solely from the new templates it is supposed to verify.

### Phase 0 — Pin sources and establish a reliable baseline

- [x] Record decisions S4–S9 and optional-content/automation defaults above; update the plan if the user chooses differently.
- [x] Reproduce the character-list mock-readiness failure, then make the smallest justified test correction. Keep it separate from CE behavior changes.
- [x] Identify older-character compatibility tests/fixtures for removal in Phase 1. Keep shared helpers and tests for current behavior; do not create new legacy fixtures.

Affected files: this plan, [tests/character-list.spec.js](tests/character-list.spec.js), [tests/helpers/characters.js](tests/helpers/characters.js) only if necessary.

Acceptance: record a successful build and complete baseline suite result. Preserve any remaining reproduced failures with their cause rather than weakening assertions. Record the exact source policy and the CE-only character decision.

Phase 0 findings and removal inventory (2026-09-06):

- Current HEAD remains `bc33c55`; README/manifest still describe 1.4 and the catalogue still contains 12 paths/84 non-core talents. CE-only storage has not been implemented. The plan was already untracked when work started; preserve it as the handoff document.
- `src/main.js` asynchronously imports the mock before booting the runtime; `runtime/entry.js` then loads path data and renders the shell. Navigation alone does not guarantee mock readiness. Every other character-seeding suite waits for CHARACTER LIST; only the character-list regression omitted that wait.
- The original focused test passed once and then 5/5 repeated runs. A temporary 300 ms delay on `**/test/mock-obr.js` reproduced the exact undefined `setCharacters` failure. Adding the existing CHARACTER LIST visibility assertion passed under the same delay (1/1). The diagnostic delay was removed; the permanent test diff is one assertion, with all row-action checks intact.
- Phase 1 retirement targets: all six tests in `tests/compatibility.spec.js`; the single “normalizes legacy paladin tracker labels from saved 1.2 data” test and fixture import in `tests/paths.spec.js`; `tests/fixtures/legacy-1-2-characters.js` (imported only by those two suites); `package.json`'s `test:compatibility` script and its README command. These were retired in Phase 1. The other four path tests, `tests/helpers/characters.js`, debug helpers, and the mock runtime remain.
- Scope decisions are recorded in section 2. Source checks reconfirmed the book's Infusion/Hidden Magic names and the changelog's single-selection rule. Character support remains CE-only; optional content and manual-automation defaults are unchanged.
- Deviation: the intermittent failure required a temporary delayed module response to reproduce reliably; normal repeated runs alone did not fail. Browser tests require execution outside this sandbox because its local web server cannot start inside it. No application code, rules data, or later-phase behavior changed.

### Phase 1 — Use CE-only characters and remove legacy support

- [x] Implement the CE marker and supported-record check from section 5 at the existing load/save boundary; show a short recreate-character notice when unsupported records are present.
- [x] Remove legacy normalization, spelling aliases, and template-rewriting callers. Retain current talent initialization and direct CE persistence.
- [x] Remove the legacy-only compatibility suite/fixtures and legacy Paladin test in the paths suite; remove unused package test commands or imports. Keep current-behavior coverage and add the minimal CE persistence/version-boundary checks.

Affected files: [domain/characters.js](src/domain/characters.js), [domain/paths.js](src/domain/paths.js), [core/metadata.js](src/core/metadata.js), [AppShell.js](src/app/AppShell.js), [contracts/entities.js](src/contracts/entities.js), [tests/compatibility.spec.js](tests/compatibility.spec.js) and its legacy fixtures (retire), [tests/paths.spec.js](tests/paths.spec.js), [tests/character-sheet.spec.js](tests/character-sheet.spec.js), [tests/character-list.spec.js](tests/character-list.spec.js), [tests/helpers/characters.js](tests/helpers/characters.js), [package.json](package.json). Reuse the existing mock runtime.

Acceptance: new CE characters receive the marker and preserve notes, selections, and tracker values across save/reload. Unversioned, 1.2, 1.4, and unknown-version records cannot be edited as CE; malformed current records are handled without crashing or overwriting them. Creating/editing a CE character in a mixed scene leaves unsupported records, pools, chat, and GM data unchanged. No conversion or legacy-template fallback remains. Recheck CE persistence against the final templates after phases 3–4; do not release intermediate 1.4 content under a CE label.

Phase 1 completion (2026-09-06):

- `createEmptyCharacter` now writes `rulesVersion: "ce-p5.2"`. The existing metadata load boundary only exposes records with that exact marker and the required current shape; unsupported records remain untouched and trigger “Some saved characters are unsupported. Recreate them for CE Preview 5.2.”
- Character creation and update patches merge into the existing record map and reject unsupported/malformed writes. Existing talent initialization is retained for newly selected templates; saved CE talent and tracker objects now reload directly without template or spelling normalization.
- Retired `tests/compatibility.spec.js`, `tests/fixtures/legacy-1-2-characters.js`, the legacy Paladin path test, the compatibility npm script, and its README command. The `/chatpopover` routing compatibility wording remains because it refers to runtime routing, not saved character versions.
- Validation: `npm run build` passed; `npm run test:character-list` passed (2/2); `npm run test:e2e` passed (28/28). The full suite was run outside the sandbox because binding the configured Vite server to `127.0.0.1:8000` fails inside it with `listen EPERM`; no application test failure was observed.
- Deviations: none from the Phase 1 scope. The validity boundary checks the CE marker, integer id, string name/path, bond/talent arrays, and nullable/object core talent; it deliberately does not validate every nested field because malformed records are excluded and preserved for manual recovery.

### Phase 2 — Update shared sheet and basic roll behavior

- [x] Add Thread presentation, Desperate, Weapon Style, and current critical/disaster help.
- [x] Correct all four stat-roll harm/mark combinations at the shared attribute-roll boundary. Keep non-stat manual modifiers explicit and do not change GM oracle rolls implicitly.
- [x] Correct no-drop guidance for named and custom pools under S2; retain manual push/pivot, marks, and suspense spending.

Affected files: [CharacterSheet.js](src/screens/CharacterSheet.js), [runtime/rolls.js](src/runtime/rolls.js), [domain/characters.js](src/domain/characters.js), [domain/pools.js](src/domain/pools.js), [PoolsAndChat.js](src/screens/PoolsAndChat.js), [contracts/entities.js](src/contracts/entities.js), [tests/character-sheet.spec.js](tests/character-sheet.spec.js), [tests/pools.spec.js](tests/pools.spec.js). Adjust existing CSS only if required to fit/access the new controls.

Acceptance: table-driven stat/mark/harm cases, deterministic critical/cut/disaster outcomes, retained XP boundaries, Thread/Weapon Style/Desperate persistence, unchanged GM Story odds, and correct conditional pool help. Test at the existing manifest's **500×600** popover size, including labels and keyboard access. One compact domain check may supplement Playwright for logic not reliably observable through the UI; no mirrored test framework.

Phase 2 completion (2026-09-06):

- Added `desperate` and `weaponStyle` to new CE characters, contracts, and the character sheet. Renamed the visible Story currency to Thread while retaining `story1/2` storage, and updated critical/disaster help to describe greater effect options and Spark as the disaster fallback.
- Moved stat-roll modifier calculation to one shared `getAttributeRollModifiers` function. Bloodied applies only to Brawn/Agility, Rattled only to Wits/Presence, Desperate adds +1t to every character attribute roll, and a marked rolled stat adds +1t then clears its mark. GM Story rolls remain unchanged; other player modifiers stay manual.
- Replaced unconditional named-pool “Take secondary effect” output with conditional task-pool push/pivot and other-pool GM Suspense guidance. Custom pool depletion keeps its existing editable reduction behavior and now shows the same guidance when no dice drop.
- Validation: `npm run test:e2e -- --workers=1` passed **31/31**; `npm run test:character-sheet` passed **11/11**; `npm run test:pools` passed **10/10**; `npm run build` passed. Added focused checks for the stat matrix, CE field persistence, and no-drop guidance.
- Deviations: no functional deviations. Browser tests require execution outside the sandbox because Vite binding to `127.0.0.1:8000` fails inside it with `listen EPERM`. No later phase was started.

### Phase 3 — Refresh the twelve existing paths

- [ ] Update all twelve JSON files against the two book pages per path, including details/other text and trackers, using section 4's inventory.
- [ ] Initialize fresh CE trackers for every core/talent; place Herbalism and Familiar under Witch when that path is added. No old-to-new mappings.
- [ ] Add duplicate-selection protection if S9 is adopted, while retaining cross-path selection.

Affected files: [data/paths](data/paths), [domain/paths.js](src/domain/paths.js), [PathScreen.js](src/screens/PathScreen.js), [tests/paths.spec.js](tests/paths.spec.js), [tests/talents.spec.js](tests/talents.spec.js), [tests/character-sheet.spec.js](tests/character-sheet.spec.js).

Acceptance: each existing path assigns the correct CE core; its seven current talents and growth text match source; every populated tracker type persists and broadcasts correctly. Exercise fresh Bard/Fighter/Cleric/Warlock creation and CE tracker persistence explicitly. Tests expecting old names or counts change only where the source requires it. No silent stat changes from changed talent text.

Treat this as a staged implementation, not a partially released mixed-rules catalogue. Ship the CE release only after all planned templates and checks are complete.

### Phase 4 — Add remaining paths and Background talents

- [ ] Add Artificer, Psion, Summoner, Swashbuckler, Witch, and Adventurer JSON; register core paths and intentional art fallbacks.
- [ ] Load Background talents as a talent-only collection and reuse the current picker/cards. Do not make it a core path.
- [ ] Give new resources/choices editable trackers suitable for their meaning, including uncapped Panache, burned words, instability, vassal damage, arcana, and bonus Thread. Check visual layouts against PDF/HTML without copying conflicting names.

Affected files: six new `data/paths/*.json` files, proposed `data/background-talents.json`, [runtime/assets.js](src/runtime/assets.js), [core/data-loader.js](src/core/data-loader.js), [runtime/entry.js](src/runtime/entry.js), [domain/paths.js](src/domain/paths.js), [PathScreen.js](src/screens/PathScreen.js), [tests/paths.spec.js](tests/paths.spec.js), [tests/talents.spec.js](tests/talents.spec.js), [tests/character-sheet.spec.js](tests/character-sheet.spec.js).

Acceptance: 18 core options; 119 book path-talent entries plus 11 Background entries; Adventurer has no fabricated talent list. All options load in the production build, display without missing images, assign/save/reload, allow cross-path talent picks, and broadcast descriptions. Background never appears as a core choice. Panache can exceed starting allowance. Psion/Witch/Summoner controls preserve distinct meanings. Document manual dice/effect handling; do not claim these abilities are automatically resolved.

### Phase 5 — Verify migration end to end and prepare release

- [ ] Run the complete suites and production build; verify character list, sheets, path/talent edits, pools/chat, popover routing, and CE character creation/save/reload together.
- [ ] Audit current content against the pinned source and conflicts; remove obsolete active catalogue wording.
- [ ] Test a copied real Owlbear scene with GM and player clients: new CE character creation, save/reload, another user's update, scene changes, local backup behavior, and popover. Verify that unsupported records remain untouched and cannot be opened as CE.
- [ ] Update README with rules baseline/target, the requirement to recreate older characters manually, manual mechanics, source choices, and test commands. Update manifest release version using a valid application-version convention and describe the rules as **CE Preview 5.2**; do not imply a final CE release.

Affected files: [README.md](README.md), [manifest.json](manifest.json), this plan; existing tests/source only for failures uncovered by integration checks.

Acceptance: complete passing test/build results recorded; CE fields and tracker values persist; unsupported records are not modified; production static JSON/assets and both entry routes verified; human source review complete; real Owlbear/multiplayer check recorded or explicitly identified as still pending. Release/deployment is a subsequent action, not part of this analysis request.

## 7. Handoff and completion criteria

Implement phases in order: **0 → 1 → 2 → 3 → 4 → 5**. After the shared storage rules settle, content transcription for disjoint path JSON can be delegated, but one owner should integrate `domain/paths.js`, `AppShell.js`, and the picker. Do not have multiple agents independently redesign the saved format.

Suggested implementation instruction: “Implement Phase N of `MIGRATION-CE-5.2.md`. Verify its assumptions against the current code and cited PDFs, preserve existing work, run the listed checks, and update this document with results and deviations. Do not start later phases unless needed for that phase's acceptance.”

The migration is done when current catalogue/automated basic behavior match the chosen P5.2 sources, new CE characters save/reload correctly, older characters are excluded without being overwritten, all intended sheet options are usable, and tests plus the real-scene check pass. Narrative adjudication and the explicitly listed manual talent mechanics remain manual by design. Phase 1 is complete; later phases remain outstanding.
