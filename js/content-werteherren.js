
/* This script injects the whData json into an input element */

// inject json into an input field with id whData
async function injectData() {
    var { whData } = await browser.storage.local.get('whData');
    if (whData && document.getElementById('whData')) {
        document.getElementById('whData').value = JSON.stringify(whData)
        document.getElementById('whData').dispatchEvent(new Event('change'));
    }
}

async function updateSessionAndReturnCanBeApplied() {
    var result = false

    var whSession = await browser.storage.local.get('whSession');
    whSession.werteherren = {injectable: false}
    if (document.getElementById('whData')) {
        whSession.werteherren.injectable = true;
        result = true
    }
    await browser.storage.local.set({whSession: whSession})

    return result
}

// data should be injected
browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'inject') {
        injectData();
    }
});


window.onload = async function() {
    var canInject = await updateSessionAndReturnIfCanBeApplied()
    console.log('werteherren onload', canInject)
    if (canInject && window.location.href.indexOf('inject=wh') >= 0) {
        injectData();
    }
}

window.onhashchange = async function() {
    var canInject = await updateSessionAndReturnIfCanBeApplied()
    console.log('werteherren onhashchange', canInject)
    if (canInject && window.location.href.indexOf('inject=wh') >= 0) {
        injectData();
    }
}