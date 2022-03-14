// prettier-ignore
(function(a,b){if("function"==typeof define&&define.amd)define("webextension-polyfill",["module"],b);else if("undefined"!=typeof exports)b(module);else{var c={exports:{}};b(c),a.browser=c.exports}})("undefined"==typeof globalThis?"undefined"==typeof self?this:self:globalThis,function(a){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");a.exports=(a=>{const b={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(b).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class c extends WeakMap{constructor(a,b=void 0){super(b),this.createItem=a}get(a){return this.has(a)||this.set(a,this.createItem(a)),super.get(a)}}const d=a=>a&&"object"==typeof a&&"function"==typeof a.then,e=(b,c)=>(...d)=>{a.runtime.lastError?b.reject(new Error(a.runtime.lastError.message)):c.singleCallbackArg||1>=d.length&&!1!==c.singleCallbackArg?b.resolve(d[0]):b.resolve(d)},f=a=>1==a?"argument":"arguments",g=(a,b)=>function(c,...d){if(d.length<b.minArgs)throw new Error(`Expected at least ${b.minArgs} ${f(b.minArgs)} for ${a}(), got ${d.length}`);if(d.length>b.maxArgs)throw new Error(`Expected at most ${b.maxArgs} ${f(b.maxArgs)} for ${a}(), got ${d.length}`);return new Promise((f,g)=>{if(b.fallbackToNoCallback)try{c[a](...d,e({resolve:f,reject:g},b))}catch(e){console.warn(`${a} API method doesn't seem to support the callback parameter, `+"falling back to call it without a callback: ",e),c[a](...d),b.fallbackToNoCallback=!1,b.noCallback=!0,f()}else b.noCallback?(c[a](...d),f()):c[a](...d,e({resolve:f,reject:g},b))})},h=(a,b,c)=>new Proxy(b,{apply(b,d,e){return c.call(d,a,...e)}});let i=Function.call.bind(Object.prototype.hasOwnProperty);const j=(a,b={},c={})=>{let d=Object.create(null),e=Object.create(a);return new Proxy(e,{has(b,c){return c in a||c in d},get(e,f){if(f in d)return d[f];if(!(f in a))return;let k=a[f];if("function"==typeof k){if("function"==typeof b[f])k=h(a,a[f],b[f]);else if(i(c,f)){let b=g(f,c[f]);k=h(a,a[f],b)}else k=k.bind(a);}else if("object"==typeof k&&null!==k&&(i(b,f)||i(c,f)))k=j(k,b[f],c[f]);else if(i(c,"*"))k=j(k,b[f],c["*"]);else return Object.defineProperty(d,f,{configurable:!0,enumerable:!0,get(){return a[f]},set(b){a[f]=b}}),k;return d[f]=k,k},set(b,c,e){return c in d?d[c]=e:a[c]=e,!0},defineProperty(a,b,c){return Reflect.defineProperty(d,b,c)},deleteProperty(a,b){return Reflect.deleteProperty(d,b)}})},k=a=>({addListener(b,c,...d){b.addListener(a.get(c),...d)},hasListener(b,c){return b.hasListener(a.get(c))},removeListener(b,c){b.removeListener(a.get(c))}}),l=new c(a=>"function"==typeof a?function(b){const c=j(b,{},{getContent:{minArgs:0,maxArgs:0}});a(c)}:a);let m=!1;const n=new c(a=>"function"==typeof a?function(b,c,e){let f,g,h=!1,i=new Promise(a=>{f=function(b){m||(console.warn("Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",new Error().stack),m=!0),h=!0,a(b)}});try{g=a(b,c,f)}catch(a){g=Promise.reject(a)}const j=!0!==g&&d(g);if(!0!==g&&!j&&!h)return!1;const k=a=>{a.then(a=>{e(a)},a=>{let b;b=a&&(a instanceof Error||"string"==typeof a.message)?a.message:"An unexpected error occurred",e({__mozWebExtensionPolyfillReject__:!0,message:b})}).catch(a=>{console.error("Failed to send onMessage rejected reply",a)})};return j?k(g):k(i),!0}:a),o=({reject:b,resolve:c},d)=>{a.runtime.lastError?a.runtime.lastError.message==="The message port closed before a response was received."?c():b(new Error(a.runtime.lastError.message)):d&&d.__mozWebExtensionPolyfillReject__?b(new Error(d.message)):c(d)},p=(a,b,c,...d)=>{if(d.length<b.minArgs)throw new Error(`Expected at least ${b.minArgs} ${f(b.minArgs)} for ${a}(), got ${d.length}`);if(d.length>b.maxArgs)throw new Error(`Expected at most ${b.maxArgs} ${f(b.maxArgs)} for ${a}(), got ${d.length}`);return new Promise((a,b)=>{const e=o.bind(null,{resolve:a,reject:b});d.push(e),c.sendMessage(...d)})},q={devtools:{network:{onRequestFinished:k(l)}},runtime:{onMessage:k(n),onMessageExternal:k(n),sendMessage:p.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:p.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},r={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return b.privacy={network:{"*":r},services:{"*":r},websites:{"*":r}},j(a,q,b)})(chrome)}else a.exports=browser});

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* 

  ------------------------------------------------------------------------------------------ HELPER ------------------------------------------------------------------------------------------

*/

(function () {
  'use strict';

  function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

  function niceDate(dateString) {
    return (
      new Date(dateString).toLocaleDateString('de-DE', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }) +
      ' - ' +
      new Date(dateString).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }

  function addTimestamp(data) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var dateToSave =
      year +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
    data.timestamp = now.getTime();
    data.date = dateToSave;
  }


  function whGetTokenAndUsername() {
    var token = JSON.parse(localStorage.getItem('vuex'))?.token?.access_token;
    var loggedin = token ? true : false;
    var username;

    try {
      username =
        token &&
        document
          ?.getElementsByClassName('user-block-name')[0]
          ?.innerText?.split(',')[1]
          .trim();
    } catch (ex) {
      username = null;
    }

    return { loggedin: loggedin, token: token, username: username };
  }

  function openReport(username) {
    window.open(
      'https://dev.werteherren.de/calculator/cannergrow-rendite-rechner-pro.html?inject=wh&username=' +
        username,
      '_blank'
    );
  }

  function openTaxReport(username) {
    window.open(
      'https://dev.werteherren.de/calculator/cannergrow-steuer-helfer.html?inject=wh&username=' +
        username,
      '_blank'
    );
  }

  var runner = null;

  const saveObjectAsFile = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite, undefined, 2)], {
      type: 'text/json',
    });
    const link = document.createElement('a');

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ['text/json', link.download, link.href].join(
      ':'
    );

    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  };

  async function download(username) {
    console.log('download username', username);
    var { whData } = await browser.storage.local.get('whData');
    if (whData !== null) {
      saveObjectAsFile(
        'cannergrow-' + username + '-' + whData.cannergrow[username].date + '.json',
        whData.cannergrow[username]
      );
    } else {
      console.log('Keine Daten gefunden');
    }
  }


  async function fetchUrls(urls, token) {
      try {
          var data = await Promise.all(
              urls.map(
                  url =>
                      fetch(url, {
                        headers: new Headers({ Authorization: 'Bearer ' + token }),
                      }).then(
                          (response) => response.json()
                      )));

          return (data)

      } catch (error) {
          console.log(error)

          throw (error)
      }
  }

  async function startExtraction(username) {
    var token = whGetTokenAndUsername().token;
    var result = {
      layers: '',
      transactions: [],
      plants: []
    }
    var urls = ['https://api.cannergrow.com/api/user/team/layers',
      'https://api.cannergrow.com/api/wallet/transactions?page=1',
      'https://api.cannergrow.com/api/growing/plants?page=1'
    ]
    
    var resps = await fetchUrls(urls, token);
    var data = await resps;
    result.layers = data[0],
    result.transactions = data[1].data
    result.plants = data[2].data

    // tx
    var urlsTransactions = []
    for (var i=2;i <= data[1].meta.last_page; i++) {
      urlsTransactions.push( 'https://api.cannergrow.com/api/wallet/transactions?page=' + i)
    }
    var respsTransactions = await fetchUrls(urlsTransactions, token);
    var dataTransactions = await respsTransactions;
    for (var i=0; i<dataTransactions.length;i++) {
      result.transactions = result.transactions.concat(dataTransactions[i].data)
    }

    //plants
    var urlsPlants = []
    for (var i=2;i <= data[2].meta.last_page; i++) {
      urlsPlants.push( 'https://api.cannergrow.com/api/growing/plants?page=' + i)
    }
    var respsPlants = await fetchUrls(urlsPlants, token);
    var dataPlants = await respsPlants;
    for (var i=0; i<dataPlants.length;i++) {
      result.plants = result.plants.concat(dataPlants[i].data)
    }


    addTimestamp(result)
    result.username = username
    result.version = 2

    var { whData } = await browser.storage.local.get('whData');
    if (!whData || !whData.cannergrow) {
      whData = {cannergrow: {}}
    }
    whData.cannergrow[username] = result;
    await browser.storage.local.set({ whData: whData });
  }

  async function extract(username) {
    runner = startExtraction(username).then(() => {
      runner = null;
      updateView();
    });
    updateView();
  }

  async function deleteData(username) {
    var { whData } = await browser.storage.local.get('whData');
    delete whData.cannergrow[username];
    await browser.storage.local.set({ whData: whData });
    updateView();
  }
  async function isRunning() {
    return runner ? true : false;
  }

  async function hasError() {
    var username = whGetTokenAndUsername().username;
    var { whData } = await browser.storage.local.get('whData');
    var data = whData?.cannergrow[username];

    return typeof data === 'string' ? true : false;
  }

  async function hasDownload() {
    var username = whGetTokenAndUsername().username;
    var { whData } = await browser.storage.local.get('whData');
    var data = whData?.cannergrow[username];
    return data ? true : false;
  }

  async function updateView() {
    var { whData } = await browser.storage.local.get('whData');
    var username = whGetTokenAndUsername().username;
    var data = whData?.cannergrow[username];

    if (await isRunning()) {
      document.getElementById('whExtractButtonText').innerText =
        'Sync läuft ...';
    } else if (await hasError()) {
      document.getElementById('whExtractButtonText').innerText = data;
    } else {
      if (await hasDownload()) {
        document.getElementById('whExtractButtonText').innerText =
          data?.date && niceDate(data.date);
      } else {
        document.getElementById('whExtractButtonText').innerText =
          'Sync starten';
      }
    }

    if (await hasDownload()) {
      document.getElementById('whDownloadButtonOuter').style.visibility =
        'visible';
      document.getElementById('whTaxButtonOuter').style.visibility = 'visible';
      document.getElementById('whRenditeButtonOuter').style.visibility =
        'visible';
      document.getElementById('whTaxButtonOuter').style.height = 'auto';
      document.getElementById('whRenditeButtonOuter').style.height = 'auto';
    } else {
      document.getElementById('whDownloadButtonOuter').style.visibility =
        'collapse';
      document.getElementById('whTaxButtonOuter').style.visibility = 'collapse';
      document.getElementById('whRenditeButtonOuter').style.visibility =
        'collapse';
      document.getElementById('whTaxButtonOuter').style.height = '0';
      document.getElementById('whRenditeButtonOuter').style.height = '0';
    }
  }

  function injectIfPossible() {
    var navs = document.getElementsByClassName('nav-heading');
    if (!document.getElementById('whPluginOuter') && navs.length > 0) {
      var imageUrl = browser.runtime.getURL('images/CGRWH128.png');
      var elemExtract = htmlToElement(
        '<li id="whExtractButtonOuter" style="margin-bottom: -10px"><a class="wh-link-highlight" id="whExtractButton" href="https://werteherren.de"><span id="whExtractButtonText"></span></a></li>'
      );
      var elemDownload = htmlToElement(
        '<li id="whDownloadButtonOuter" style="margin-bottom: -20px"><a id="whDownloadButton" class="wh-link" href="https://werteherren.de"><img class="wh-icon" src="' +
          imageUrl +
          '" /><span id="whExtractButtonText">Download</span></a></li>'
      );
      var elemTaxTool = htmlToElement(
        '<li id="whTaxButtonOuter" style="margin-bottom: -20px"><a id="whTaxButton" class="wh-link" href="https://werteherren.de"><img class="wh-icon" src="' +
          imageUrl +
          '" /><span id="whExtractButtonText">Steuer-Helfer</span></a></li>'
      );
      var elemRenditeTool = htmlToElement(
        '<li id="whRenditeButtonOuter" style="margin-bottom: -10px"><a id="whRenditeButton" class="wh-link" href="https://werteherren.de"><img class="wh-icon" src="' +
          imageUrl +
          '" /><span id="whExtractButtonText">Rendite-Tool</span></a></li>'
      );
      var elemHeader = htmlToElement(
        '<li class="whOuter nav-heading" id="whPluginOuter"><span>Werteherren</span></li>'
      );
      navs[0].parentElement.insertBefore(elemRenditeTool, navs[0]);
      navs[0].parentElement.insertBefore(elemTaxTool, elemRenditeTool);
      navs[0].parentElement.insertBefore(elemDownload, elemTaxTool);
      navs[0].parentElement.insertBefore(elemExtract, elemDownload);
      navs[0].parentElement.insertBefore(elemHeader, elemExtract);

      document.getElementById('whExtractButton').onclick = (event) => {
        var username = whGetTokenAndUsername().username;

        var run = async () => {
          if (!(await isRunning())) {
            if (await hasDownload()) {
              deleteData(username);
            } else {
              extract(username);
            }
          }
        };

        run();

        event.preventDefault();
        return false;
      };
      document.getElementById('whTaxButton').onclick = (event) => {
        var username = whGetTokenAndUsername().username;
        openTaxReport(username);
        event.preventDefault();
        return false;
      };
      document.getElementById('whRenditeButton').onclick = (event) => {
        var username = whGetTokenAndUsername().username;
        openReport(username);
        event.preventDefault();
        return false;
      };
      document.getElementById('whDownloadButton').onclick = (event) => {
        var username = whGetTokenAndUsername().username;
        download(username);
        event.preventDefault();
        return false;
      };
      console.log('found and injected');
      updateView();
    }
    window.setTimeout(injectIfPossible, 500);
  }

  window.onload = function () {
    console.log('werteherren plugin inject');
    injectIfPossible();
  };
})();
