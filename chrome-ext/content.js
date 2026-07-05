"use strict";
(() => {
  // src/core.ts
  var SUCCESSION_MS = 300;
  var INPUT_SELECTOR = [
    'input[type="text"]:not([disabled]):not([readonly])',
    'input[type="search"]:not([disabled]):not([readonly])',
    'input[type="email"]:not([disabled]):not([readonly])',
    'input[type="url"]:not([disabled]):not([readonly])',
    'input[type="number"]:not([disabled]):not([readonly])',
    'input[type="password"]:not([disabled]):not([readonly])',
    "input:not([type]):not([disabled]):not([readonly])",
    "textarea:not([disabled]):not([readonly])",
    '[contenteditable="true"]',
    '[contenteditable=""]',
    '[role="textbox"]',
    '[role="searchbox"]',
    '[role="combobox"]'
  ].join(",");
  function initJustType(options) {
    if (window.__justTypeActive) return;
    window.__justTypeActive = true;
    console.log(
      "%c\u2328\uFE0F  JustType is active \u2014 just start typing.",
      "color: #a78bfa; font-weight: bold; font-size: 13px;"
    );
    let pendingKey = null;
    let pendingTime = 0;
    let justTypeTarget = null;
    const inputTimestamps = /* @__PURE__ */ new WeakMap();
    const observer = new MutationObserver((mutations) => {
      const now = Date.now();
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(INPUT_SELECTOR)) inputTimestamps.set(node, now);
          for (const el of node.querySelectorAll(INPUT_SELECTOR)) {
            inputTimestamps.set(el, now);
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener(
      "mousedown",
      () => {
        justTypeTarget = null;
      },
      { capture: true, passive: true }
    );
    window.addEventListener(
      "keydown",
      (e) => {
        var _a;
        if (e.key === "Escape" && justTypeTarget && document.activeElement === justTypeTarget) {
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
          const input = findBestInput(inputTimestamps);
          if (!input) return;
          e.preventDefault();
          input.focus();
          justTypeTarget = input;
          insertChar(input, firstChar);
          insertChar(input, e.key);
          (_a = options == null ? void 0 : options.onActivation) == null ? void 0 : _a.call(options);
        } else {
          pendingKey = e.key;
          pendingTime = now;
        }
      },
      true
    );
  }
  function isInputFocused() {
    const el = document.activeElement;
    if (!el || el === document.body || el === document.documentElement) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    if (el.isContentEditable) return true;
    const role = (el.getAttribute("role") || "").toLowerCase();
    return role === "textbox" || role === "searchbox" || role === "combobox";
  }
  function insertChar(input, char) {
    const isEditable = input.isContentEditable || ["textbox", "searchbox", "combobox"].includes(
      (input.getAttribute("role") || "").toLowerCase()
    );
    if (isEditable) {
      document.execCommand("insertText", false, char);
      return;
    }
    const formInput = input;
    const proto = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(proto, "value");
    const start = typeof formInput.selectionStart === "number" ? formInput.selectionStart : formInput.value.length;
    const end = typeof formInput.selectionEnd === "number" ? formInput.selectionEnd : formInput.value.length;
    const newValue = formInput.value.slice(0, start) + char + formInput.value.slice(end);
    if (descriptor == null ? void 0 : descriptor.set) {
      descriptor.set.call(formInput, newValue);
    } else {
      formInput.value = newValue;
    }
    formInput.selectionStart = formInput.selectionEnd = start + char.length;
    formInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
  function findBestInput(inputTimestamps) {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    let bestRecent = null;
    let bestFallback = null;
    for (const el of document.querySelectorAll(INPUT_SELECTOR)) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.bottom < -100 || rect.top > vh + 100) continue;
      if (rect.right < 0 || rect.left > vw) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (parseFloat(style.opacity) === 0) continue;
      const ts = inputTimestamps.get(el);
      if (ts !== void 0) {
        if (!bestRecent || ts > bestRecent.ts) bestRecent = { el, ts };
      } else {
        const area = rect.width * rect.height;
        if (!bestFallback || area > bestFallback.area) bestFallback = { el, area };
      }
    }
    return (bestRecent == null ? void 0 : bestRecent.el) ?? (bestFallback == null ? void 0 : bestFallback.el) ?? null;
  }

  // src/content.ts
  if (window.__justTypeActive) {
    console.log(
      "%c\u2328\uFE0F  JustType npm package detected \u2014 extension is dormant.",
      "color: #a78bfa; font-weight: bold; font-size: 13px;"
    );
  } else {
    initJustType({
      onActivation: () => {
        var _a, _b;
        (_b = (_a = chrome.storage) == null ? void 0 : _a.local) == null ? void 0 : _b.get({ justTypeCount: 0 }, (data) => {
          var _a2, _b2;
          (_b2 = (_a2 = chrome.storage) == null ? void 0 : _a2.local) == null ? void 0 : _b2.set({ justTypeCount: data.justTypeCount + 1 });
        });
      }
    });
  }
})();
