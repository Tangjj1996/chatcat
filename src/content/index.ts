import browser from "webextension-polyfill";

async function main() {
  const tab = await browser.tabs.getCurrent();
  console.log(browser.tabs);

  if (tab.id) {
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["/content/insert-dom.js"],
    });
  }

  browser.tabs.executeScript(undefined, {});
}

main().catch(console.error);
