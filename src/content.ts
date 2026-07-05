import { initJustType } from './core';

if ((window as any).__justTypeActive) {
  console.log(
    '%c⌨️  JustType npm package detected — extension is dormant.',
    'color: #a78bfa; font-weight: bold; font-size: 13px;'
  );
} else {
  initJustType({
    onActivation: () => {
      chrome.storage?.local?.get({ justTypeCount: 0 }, (data) => {
        chrome.storage?.local?.set({ justTypeCount: data.justTypeCount + 1 });
      });
    },
  });
}
