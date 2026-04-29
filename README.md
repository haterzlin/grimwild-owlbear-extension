# Grimwild Recovered Extension

This repository is now a normal source-built app. The maintained implementation lives in [src](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src), not in recovered bundle artifacts.

## Source of truth

Maintain code in:
- application shell: [src/app](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/app)
- contracts: [src/contracts](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/contracts)
- core runtime APIs: [src/core](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/core)
- domain logic: [src/domain](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/domain)
- browser/runtime bootstrap: [src/runtime](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime)
- screens: [src/screens](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens)

Content authority:
- path art/id manifest: [src/runtime/assets.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/assets.js)
- path definitions: [data/paths](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/data/paths)

## Runtime layout

Active browser entry flow:
- [index.html](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/index.html)
- [chatpopover/index.html](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/chatpopover/index.html)
- [src/main.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/main.js)
- [src/chatpopover-main.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/chatpopover-main.js)

Shared bootstrap and adapters:
- [src/runtime/entry.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/entry.js)
- [src/runtime/react-runtime.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/react-runtime.js)
- [src/runtime/obr-client.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/obr-client.js)
- [src/runtime/obr-reference.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/obr-reference.js)

Route behavior:
- `src/main.js` boots the shared runtime in `main` mode
- `src/chatpopover-main.js` boots the shared runtime in `chatpopover` mode
- `src/runtime/entry.js` also treats the `/chatpopover` URL path as a compatibility override so the popup still renders correctly when a dev server serves that path through the main HTML entry

UI ownership:
- top-level shell: [src/app/AppShell.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/app/AppShell.js)
- character UI: [src/screens/CharacterList.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/CharacterList.js), [src/screens/CharacterSheet.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/CharacterSheet.js)
- path/talent UI: [src/screens/PathScreen.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/PathScreen.js)
- pools/chat UI: [src/screens/PoolsAndChat.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/PoolsAndChat.js)

Practical rule:
- if a change can be implemented in `src/*`, implement it there

## Local run

Run the app through Vite on `http://127.0.0.1:8000`:

```bash
npm run dev -- --host 127.0.0.1 --port 8000 --strictPort
```

Then install the extension in Owlbear Rodeo from:

```text
http://127.0.0.1:8000/manifest.json
```

For local mock-runtime testing, open:

```text
http://127.0.0.1:8000/?mockOwlbear=1
```

To verify the production build locally:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 8000 --strictPort
```

## Tests

Full suite:

```bash
npm run test:e2e
```

Focused suites:

```bash
npm run test:character-list
npm run test:character-sheet
npm run test:paths
npm run test:talents
npm run test:pools
```

## Maintenance rules

- Add new behavior in `src/*`.
- Treat `index.html`, `chatpopover/index.html`, `src/main.js`, and `src/chatpopover-main.js` as the active entry flow.
- Treat `src/runtime/*` as the maintained browser bootstrap layer.
- Treat `src/runtime/obr-client.js` as the source-owned Owlbear integration boundary.
- Treat the `/chatpopover` path check in `src/runtime/entry.js` as an intentional compatibility safeguard, not accidental routing logic.
- Update `src/runtime/assets.js` and `data/paths/*` together for path content changes.
- Keep Playwright green after every meaningful change.
