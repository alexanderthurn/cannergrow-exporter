
/* This script injects the whData json into an input element */

// inject json into an input field with id whData
async function injectData() {
    var { whData } = await browser.storage.local.get('whData');
    if (whData && document.getElementById('whData')) {
        document.getElementById('whData').value = JSON.stringify(whData)
        document.getElementById('whData').dispatchEvent(new Event('change'));
    }
}

async function canInject() {
    var result = false

    if (document.getElementById('whData')) {
        result = true
    }

    return result
}

browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'inject') {
        injectData();
    } else if (message.action === 'canInject') {
        return Promise.resolve({ ok: canInject()  })
    }
});


window.onload = async function() {
    console.log('werteherren onload', canInject())
    if (canInject() && window.location.href.indexOf('inject=wh') >= 0) {
        injectData();
    }
}