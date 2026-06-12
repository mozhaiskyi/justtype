# JustType

There's a text box on your screen. You start typing. Nothing happens — it wasn't focused. You reach for the mouse, click, try again.

Sound familiar? Annoying every time.

JustType fixes that. It detects when you're typing and focuses the right field. Invisible until you need it, then exactly where you want it.

But wait — what about shortcuts? Spacebar plays. J and L seek. Route every keystroke to an input and those break.
You can have both.

JustType knows the difference between typing and a shortcut. The moment it's sure you're writing something, it finds the most relevant input on the page and puts your words there.

Zero config. Zero data. Works everywhere.

Just type.

---

## The idea

Inspired by [this insight from Tiago](https://youtube.com/shorts/_RHiFAxISuM?si=S3BOVS1T4d4L5_FW): wait 150ms after the first keypress. If a second printable character arrives within that window, it's almost certainly typing — not a shortcut. Focus the field and replay everything buffered so far. The delay is imperceptible to humans but large enough to distinguish intent.

---

## Build

Prerequisites: **Node.js** and **npm**.

```bash
npm install
npm run build
```

TypeScript source lives in `src/`. The compiled output goes to `chrome-ext/`.

To watch for changes during development:

```bash
npm run watch
```

---

## Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right)
3. Click **Load unpacked**
4. Select the `chrome-ext/` directory

After rebuilding (`npm run build`), click the refresh icon on the extension card to reload it.
