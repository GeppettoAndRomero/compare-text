# compare-text

Paste two texts and see a highlighted, line-by-line diff, entirely in your browser.
Text is processed on your device and never uploaded. Open source, works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

Two texts ("Original" and "Changed") are diffed with [jsdiff](https://github.com/kpdecker/jsdiff)'s
`diffLines`, entirely on the main thread — no server, no Web Worker needed for ordinary
text sizes. Added lines are marked with a leading `+` on a green background, removed
lines with a leading `-` on a red, struck-through background, and unchanged lines are
left plain. The marker is real text, not just color, so the result stays legible without
relying on color alone.

This is a **line-level** diff only — word- or character-level highlighting inside a
changed line is out of scope for this tool (see issue #70).

## Features

- Two-textarea input, live line-level diff as you type (debounced)
- `+N lines added, -M lines removed` summary count
- Copy the full diff to the clipboard, or clear both sides
- Optional: drag a plain-text file (`.txt`, `.md`, `.log`, `.csv`) onto either side to
  load it
- A friendly warning (not a hard limit) for very large inputs (~5MB+)
- Works offline (PWA), installable

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
```

Stack: Astro + Preact + TypeScript. Diffing is a pure function in `src/utils/diffEngine.ts`.

## Browser support

Works in current Chrome, Edge, Firefox and Safari. No WebAssembly, no Web Worker, and no
special browser API beyond the Clipboard API (used only for the "Copy diff" button —
everything else, including the diff itself, works without it).

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
