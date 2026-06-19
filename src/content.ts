import { initJustType } from './core';

initJustType({
  onActivation: () => {
    chrome.storage.local.get({ justTypeCount: 0 }, (data) => {
      chrome.storage.local.set({ justTypeCount: data.justTypeCount + 1 });
    });
  },
});
