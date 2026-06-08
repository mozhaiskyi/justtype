function main() {
  'use strict';

  console.log(
    '%c⌨️  JustType is active — just start typing.',
    'color: #a78bfa; font-weight: bold; font-size: 13px;'
  );

  const SUCCESSION_MS = 300;

  let pendingKey: string | null = null;
  let pendingTime = 0;
  let justTypeTarget: HTMLElement | null = null;

  function isInputFocused(): boolean {
    const el = document.activeElement;
    if (!el || el === document.body || el === document.documentElement) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if ((el as HTMLElement).isContentEditable) return true;
    const role = (el.getAttribute('role') || '').toLowerCase();
    return role === 'textbox' || role === 'searchbox' || role === 'combobox';
  }

  function findBestInput(): HTMLElement | null {
    const selector = [
      'input[type="text"]:not([disabled]):not([readonly])',
      'input[type="search"]:not([disabled]):not([readonly])',
      'input[type="email"]:not([disabled]):not([readonly])',
      'input[type="url"]:not([disabled]):not([readonly])',
      'input[type="number"]:not([disabled]):not([readonly])',
      'input[type="password"]:not([disabled]):not([readonly])',
      'input:not([type]):not([disabled]):not([readonly])',
      'textarea:not([disabled]):not([readonly])',
      '[contenteditable="true"]',
      '[contenteditable=""]',
      '[role="textbox"]',
      '[role="searchbox"]',
      '[role="combobox"]',
    ].join(',');

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    let best: HTMLElement | null = null;
    let bestScore = -1;

    for (const el of document.querySelectorAll<HTMLElement>(selector)) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.bottom < -100 || rect.top > vh + 100) continue;
      if (rect.right < 0 || rect.left > vw) continue;

      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      if (parseFloat(style.opacity) === 0) continue;

      const score = rect.width * rect.height;
      if (score > bestScore) {
        bestScore = score;
        best = el;
      }
    }

    return best;
  }

  function insertChar(input: HTMLElement, char: string): void {
    const isEditable =
      input.isContentEditable ||
      ['textbox', 'searchbox', 'combobox'].includes(
        (input.getAttribute('role') || '').toLowerCase()
      );

    if (isEditable) {
      document.execCommand('insertText', false, char);
      return;
    }

    const formInput = input as HTMLInputElement | HTMLTextAreaElement;
    const proto =
      input instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(proto, 'value');

    const start =
      typeof formInput.selectionStart === 'number'
        ? formInput.selectionStart
        : formInput.value.length;
    const end =
      typeof formInput.selectionEnd === 'number'
        ? formInput.selectionEnd
        : formInput.value.length;
    const newValue = formInput.value.slice(0, start) + char + formInput.value.slice(end);

    if (descriptor?.set) {
      descriptor.set.call(formInput, newValue);
    } else {
      formInput.value = newValue;
    }

    formInput.selectionStart = formInput.selectionEnd = start + char.length;
    formInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  document.addEventListener(
    'mousedown',
    () => {
      justTypeTarget = null;
    },
    { capture: true, passive: true }
  );

  window.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && justTypeTarget && document.activeElement === justTypeTarget) {
        justTypeTarget.blur();
        justTypeTarget = null;
        pendingKey = null;
        e.preventDefault();
        return;
      }

      if (isInputFocused()) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key.length !== 1) return;

      const now = Date.now();

      if (pendingKey !== null && e.key !== pendingKey && now - pendingTime < SUCCESSION_MS) {
        const firstChar = pendingKey;
        pendingKey = null;
        pendingTime = 0;

        const input = findBestInput();
        if (!input) return;

        e.preventDefault();
        input.focus();
        justTypeTarget = input;
        insertChar(input, firstChar);
        insertChar(input, e.key);
      } else {
        pendingKey = e.key;
        pendingTime = now;
      }
    },
    true
  );
}

main();
