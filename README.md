# Grimwild Recovered Extension

This repository is now a normal source-built app. The maintained implementation lives in [src](./src), not in recovered bundle artifacts.
Originaly this was downloaded as minimezed javascript files using network manager in browser when using Owlbear Rodeo original extension built by Alyx. Who is unfortunately not responding to messages. LLM was used to recover files, build tests and clean code to have it readable.

Original application was built with Grimwild rules version 1.2, saved in branch [rules-v1.2](../../tree/rules-v1.2). The Grimwild 1.4 version is preserved in branch [rules-v1.4](../../tree/rules-v1.4).
The current branch contains Grimwild Community Edition Preview 5.2. Older saved characters are unsupported; create a new character and manually re-enter any information you want to keep.

## Source of truth

Maintain code in:
- application shell: [src/app](./src/app)
- contracts: [src/contracts](./src/contracts)
- core runtime APIs: [src/core](./src/core)
- domain logic: [src/domain](./src/domain)
- browser/runtime bootstrap: [src/runtime](./src/runtime)
- screens: [src/screens](./src/screens)

Content authority:
- path art/id manifest: [src/runtime/assets.js](./src/runtime/assets.js)
- path definitions: [data/paths](./data/paths)

## Runtime layout

Active browser entry flow:
- [index.html](./index.html)
- [chatpopover/index.html](./chatpopover/index.html)
- [src/main.js](./src/main.js)
- [src/chatpopover-main.js](./src/chatpopover-main.js)

Shared bootstrap and adapters:
- [src/runtime/entry.js](./src/runtime/entry.js)
- [src/runtime/react-runtime.js](./src/runtime/react-runtime.js)
- [src/runtime/obr-client.js](./src/runtime/obr-client.js)
- [src/runtime/obr-reference.js](./src/runtime/obr-reference.js)

Route behavior:
- `src/main.js` boots the shared runtime in `main` mode
- `src/chatpopover-main.js` boots the shared runtime in `chatpopover` mode
- `src/runtime/entry.js` also treats the `/chatpopover` URL path as a compatibility override so the popup still renders correctly when a dev server serves that path through the main HTML entry

UI ownership:
- top-level shell: [src/app/AppShell.js](./src/app/AppShell.js)
- character UI: [src/screens/CharacterList.js](./src/screens/CharacterList.js), [src/screens/CharacterSheet.js](./src/screens/CharacterSheet.js)
- path/talent UI: [src/screens/PathScreen.js](./src/screens/PathScreen.js)
- pools/chat UI: [src/screens/PoolsAndChat.js](./src/screens/PoolsAndChat.js)

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

The test runtime uses a mock Owlbear client. A real copied-scene GM/player smoke test is still required before release.

## Maintenance rules

- Add new behavior in `src/*`.
- Treat `index.html`, `chatpopover/index.html`, `src/main.js`, and `src/chatpopover-main.js` as the active entry flow.
- Treat `src/runtime/*` as the maintained browser bootstrap layer.
- Treat `src/runtime/obr-client.js` as the source-owned Owlbear integration boundary.
- Treat the `/chatpopover` path check in `src/runtime/entry.js` as an intentional compatibility safeguard, not accidental routing logic.
- Update `src/runtime/assets.js` and `data/paths/*` together for path content changes.
- Keep Playwright green after every meaningful change.
