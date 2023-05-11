import browser from "webextension-polyfill";

async function main() {
  const tab = await browser.tabs.getCurrent();

  if (tab.id) {
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["/content/insert-dom.js"],
    });
  }
}

// main();
