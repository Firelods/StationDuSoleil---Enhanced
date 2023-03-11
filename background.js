// Listen for the "install" event, which is triggered when the service worker is installed
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
});

// Listen for the "activate" event, which is triggered when the service worker is activated
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

// Listen for the "message" event, which is triggered when a message is received from a content script or another extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle the "ping" message
  if (message.action === "ping") {
    // Send a response to acknowledge that the service worker is running
    sendResponse(true);
  } else if (message.action === "getCity") {
    // Send a response to acknowledge that the service worker is running
    sendResponse(true);
  } else if (message.action == "openPopup") {
    // open the popup extension page
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html"),
      type: "popup",
      width: 750,
      height: 750,
    });
  } else if (message.action == "getCity") {
    // send the list of city to the popup
    sendResponse(listCity);
  }
});
