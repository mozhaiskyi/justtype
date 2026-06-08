## JustType - tool

Start typing anywhere — JustType finds the right input and routes your text. No clicking. No missed shortcuts.

-----

You know the feeling. There's a search box right there. You start typing. Nothing happens — because you forgot to click first.
JustType fixes that.
Start typing on any webpage, even with nothing focused, and JustType intelligently routes your keystrokes to the nearest visible input. No configuration. No hotkeys to remember. It just works.
The magic is in the timing.
The magic is in the timing.
JustType understands the difference between a keyboard shortcut and the beginning of a thought. It never breaks your existing shortcuts — spacebar still plays, J and L still seek, every shortcut on every site works exactly as before. But the moment JustType sees you're writing something, it gets out of the way and puts your words exactly where they belong.

Works everywhere:
— YouTube (J, L shortcuts still work — until you start typing)
— Google, Reddit, GitHub, Notion, Linear, any site with inputs
— Comment boxes, search bars, chat fields, rich text editors

Zero config. Zero data collected. Zero friction.

JustType runs quietly in the background on every page. No account. No permissions to your data. No settings to configure. Install it and forget it exists — until the moment it saves you.

Just type.

## UX description

- scan all focusable text fields: input[text], textarea, contenteditable, role="textbox" — exclude password, hidden, disabled
- exclude fields not visible in viewport

- listen for keydown events globally
- ignore if any text field is already focused
- ignore non-printable keys (Backspace, Escape, Ctrl/Meta combos)
- if user click esc, unfocus field that was focused with tool

- on first printable key:
  - save the character
  - start 150ms timer
  - if timer fires → treat as shortcut → do nothing, let page handle it
  - if second printable key arrives before timer → it's typing →
      focus the most relevant field → replay all buffered characters
