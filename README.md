# Grimwild Recovered Extension

This repository now uses a source-first maintenance model.

What to maintain:
- application code in [src](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src)
- source contracts in [src/contracts](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/contracts)
- source runtime/core APIs in [src/core](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/core)
- source screens in [src/screens](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens)
- path asset manifest in [src/runtime/assets.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/assets.js)
- external path content in [data/paths](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/data/paths)

Runtime boundary:
- [index.html](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/index.html) and [chatpopover/index.html](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/chatpopover/index.html) are the active browser entry pages
- [src/main.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/main.js) boots the main extension route explicitly
- [src/chatpopover-main.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/chatpopover-main.js) boots the chat popover route explicitly
- [src/runtime/entry.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/entry.js) is the maintained browser bootstrap
- [src/runtime/react-runtime.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/react-runtime.js) bridges the current screen factories onto standard `react` / `react-dom`
- [src/runtime/obr-client.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/obr-client.js) is the live Owlbear adapter

## Runtime layout

- Top-level app shell: [src/app/AppShell.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/app/AppShell.js)
- Source bootstrap: [src/runtime/entry.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/entry.js)
- Runtime adapters: [src/runtime](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime)
- Character screens: [src/screens/CharacterList.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/CharacterList.js), [src/screens/CharacterSheet.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/CharacterSheet.js)
- Path/talent screens: [src/screens/PathScreen.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/PathScreen.js)
- Pools/chat screens: [src/screens/PoolsAndChat.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/PoolsAndChat.js)

Source architecture details live in [docs/source-architecture.md](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/docs/source-architecture.md).

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
- Update `src/runtime/assets.js` and `data/paths/*` together for path content changes.
- Keep Playwright green after every meaningful change.
