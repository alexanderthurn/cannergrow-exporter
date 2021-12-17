
/* This script injects the whData json into an input element */

// inject json into an input field with id whData
async function injectData() {
    var { whData } = await browser.storage.local.get('whData');
    if (whData && document.getElementById('whData')) {
        document.getElementById('whData').value = JSON.stringify(whData)
        document.getElementById('whData').dispatchEvent(new Event('change'));
    }
}

// data should be injected
browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'inject') {
        injectData();
    }
});


window.onload = function() {
   if (window.location.href.indexOf('inject=wh') >= 0) {
      injectData();
   }
}