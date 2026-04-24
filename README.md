# Grimwild Recovered Extension

This repository now uses a source-first maintenance model.

What to maintain:
- application code in [src](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src)
- source contracts in [src/contracts](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/contracts)
- source runtime/core APIs in [src/core](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/core)
- source screens in [src/screens](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/screens)
- external path content in [data/assets.json](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/data/assets.json) and [data/paths](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/data/paths)

What is transitional:
- [src-like](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src-like) is compatibility glue kept during reconstruction
- [assets/index.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/assets/index.js) is a recovered compatibility runtime, not the preferred place to implement features

## Runtime layout

- Top-level app shell: [src/app/AppShell.js](/home/lmlich/Dokumenty/rpg/GrimWild/recovered/grimwild-extension/src/app/AppShell.js)
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

- Add new behavior in `src/*`, not `src-like/*`.
- Treat `src-like/*` as transitional adapters until they can be deleted.
- Treat `assets/index.js` as a compatibility artifact and integration bridge.
- Update `data/assets.json` and `data/paths/*` for path content changes instead of editing embedded path data.
- Keep Playwright green after every meaningful change.
