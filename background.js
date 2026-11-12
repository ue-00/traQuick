console.log("✅ Unified background loaded");

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request?.type === "fetchMessage" && request.messageId) {
    fetch(`https://q.trap.jp/api/v3/messages/${request.messageId}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: String(err) }));
    return true; // async response
  }
});
