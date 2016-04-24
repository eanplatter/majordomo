function doThing() {
  return 'document.body.style.backgroundColor="red"'
}

module.exports = chrome.tabs.executeScript({
    code: doThing()
});
