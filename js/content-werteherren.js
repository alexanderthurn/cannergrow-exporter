
/* This script injects the whData json into an input element */

// inject json into an input field with id whData
function injectData() {
    browser.storage.local.get("whData").then(async ({ whData }) => {
        if (whData && document.getElementById('whData')) {
            document.getElementById('whData').value = JSON.stringify(whData)
        }
    })
}

// listen for changes on cannergrow tab
browser.storage.onChanged.addListener(function (changes, area) {
    injectData();
});


// wait for the dom to load (maybe not needed?)
window.onload = function() {
    injectData();
}
