# Grimwild Recovered Extension

This repository now uses a source-first maintenance model.

What to maintain:
- application code in [src](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src)
- source contracts in [src/contracts](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/contracts)
- source runtime/core APIs in [src/core](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/core)
- source screens in [src/screens](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens)
- path asset manifest in [src/runtime/assets.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/assets.js)
- external path content in [data/paths](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/data/paths)

Compatibility boundary:
- [assets/index.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/assets/index.js) is a thin compatibility entrypoint
- [src/runtime/entry.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/entry.js) is the maintained browser bootstrap
- [src/vendor](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/vendor) contains the still-vendored recovered runtime dependencies that power the source entry

## Runtime layout

- Top-level app shell: [src/app/AppShell.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/app/AppShell.js)
- Source bootstrap: [src/runtime/entry.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime/entry.js)
- Runtime adapters: [src/runtime](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/runtime)
- Character screens: [src/screens/CharacterList.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/CharacterList.js), [src/screens/CharacterSheet.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/CharacterSheet.js)
- Path/talent screens: [src/screens/PathScreen.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/PathScreen.js)
- Pools/chat screens: [src/screens/PoolsAndChat.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens/PoolsAndChat.js)

Source architecture details live in [docs/source-architecture.md](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/docs/source-architecture.md).

## Local run

Serve the repository root on `http://localhost:8000`. One simple option:

```bash
python3 -c "from http.server import HTTPServer, SimpleHTTPRequestHandler as SHTH; c = type('CORSRequestHandler', (SHTH,), {'end_headers': lambda self: [self.send_header('Access-Control-Allow-Origin', '*'), self.send_header('Access-Control-Allow-Methods', 'GET'), self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate'), SHTH.end_headers(self)]}); HTTPServer(('localhost', 8000), c).serve_forever()"
```

Then install the extension in Owlbear Rodeo from:

```text
http://localhost:8000/manifest.json
```

For local mock-runtime testing, open:

```text
http://127.0.0.1:8000/?mockOwlbear=1
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
- Treat `assets/index.js` as a thin compatibility artifact only.
- Treat `src/runtime/*` as the maintained browser bootstrap layer.
- Treat `src/vendor/*` as vendored runtime code that should only change when source runtime wiring requires it.
- Update `src/runtime/assets.js` and `data/paths/*` together for path content changes.
- Keep Playwright green after every meaningful change.
