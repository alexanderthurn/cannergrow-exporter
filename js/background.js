console.log('werteherren service worker')

/*let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
*/
/*
let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);

  chrome.action.setBadgeText({ text: 'Hi' });

  sendResponse({response: "Response from background script"});
  
}

chrome.runtime.onMessage.addListener(handleMessage);
*/

/*
chrome.runtime.onMessageExternal.addListener( (request, sender, sendResponse) => {
  console.log("Received message from " + sender + ": ", request);
  sendResponse({ received: true }); //respond however you like
});
*/