// prettier-ignore
(function(a,b){if("function"==typeof define&&define.amd)define("webextension-polyfill",["module"],b);else if("undefined"!=typeof exports)b(module);else{var c={exports:{}};b(c),a.browser=c.exports}})("undefined"==typeof globalThis?"undefined"==typeof self?this:self:globalThis,function(a){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");a.exports=(a=>{const b={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(b).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class c extends WeakMap{constructor(a,b=void 0){super(b),this.createItem=a}get(a){return this.has(a)||this.set(a,this.createItem(a)),super.get(a)}}const d=a=>a&&"object"==typeof a&&"function"==typeof a.then,e=(b,c)=>(...d)=>{a.runtime.lastError?b.reject(new Error(a.runtime.lastError.message)):c.singleCallbackArg||1>=d.length&&!1!==c.singleCallbackArg?b.resolve(d[0]):b.resolve(d)},f=a=>1==a?"argument":"arguments",g=(a,b)=>function(c,...d){if(d.length<b.minArgs)throw new Error(`Expected at least ${b.minArgs} ${f(b.minArgs)} for ${a}(), got ${d.length}`);if(d.length>b.maxArgs)throw new Error(`Expected at most ${b.maxArgs} ${f(b.maxArgs)} for ${a}(), got ${d.length}`);return new Promise((f,g)=>{if(b.fallbackToNoCallback)try{c[a](...d,e({resolve:f,reject:g},b))}catch(e){console.warn(`${a} API method doesn't seem to support the callback parameter, `+"falling back to call it without a callback: ",e),c[a](...d),b.fallbackToNoCallback=!1,b.noCallback=!0,f()}else b.noCallback?(c[a](...d),f()):c[a](...d,e({resolve:f,reject:g},b))})},h=(a,b,c)=>new Proxy(b,{apply(b,d,e){return c.call(d,a,...e)}});let i=Function.call.bind(Object.prototype.hasOwnProperty);const j=(a,b={},c={})=>{let d=Object.create(null),e=Object.create(a);return new Proxy(e,{has(b,c){return c in a||c in d},get(e,f){if(f in d)return d[f];if(!(f in a))return;let k=a[f];if("function"==typeof k){if("function"==typeof b[f])k=h(a,a[f],b[f]);else if(i(c,f)){let b=g(f,c[f]);k=h(a,a[f],b)}else k=k.bind(a);}else if("object"==typeof k&&null!==k&&(i(b,f)||i(c,f)))k=j(k,b[f],c[f]);else if(i(c,"*"))k=j(k,b[f],c["*"]);else return Object.defineProperty(d,f,{configurable:!0,enumerable:!0,get(){return a[f]},set(b){a[f]=b}}),k;return d[f]=k,k},set(b,c,e){return c in d?d[c]=e:a[c]=e,!0},defineProperty(a,b,c){return Reflect.defineProperty(d,b,c)},deleteProperty(a,b){return Reflect.deleteProperty(d,b)}})},k=a=>({addListener(b,c,...d){b.addListener(a.get(c),...d)},hasListener(b,c){return b.hasListener(a.get(c))},removeListener(b,c){b.removeListener(a.get(c))}}),l=new c(a=>"function"==typeof a?function(b){const c=j(b,{},{getContent:{minArgs:0,maxArgs:0}});a(c)}:a);let m=!1;const n=new c(a=>"function"==typeof a?function(b,c,e){let f,g,h=!1,i=new Promise(a=>{f=function(b){m||(console.warn("Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",new Error().stack),m=!0),h=!0,a(b)}});try{g=a(b,c,f)}catch(a){g=Promise.reject(a)}const j=!0!==g&&d(g);if(!0!==g&&!j&&!h)return!1;const k=a=>{a.then(a=>{e(a)},a=>{let b;b=a&&(a instanceof Error||"string"==typeof a.message)?a.message:"An unexpected error occurred",e({__mozWebExtensionPolyfillReject__:!0,message:b})}).catch(a=>{console.error("Failed to send onMessage rejected reply",a)})};return j?k(g):k(i),!0}:a),o=({reject:b,resolve:c},d)=>{a.runtime.lastError?a.runtime.lastError.message==="The message port closed before a response was received."?c():b(new Error(a.runtime.lastError.message)):d&&d.__mozWebExtensionPolyfillReject__?b(new Error(d.message)):c(d)},p=(a,b,c,...d)=>{if(d.length<b.minArgs)throw new Error(`Expected at least ${b.minArgs} ${f(b.minArgs)} for ${a}(), got ${d.length}`);if(d.length>b.maxArgs)throw new Error(`Expected at most ${b.maxArgs} ${f(b.maxArgs)} for ${a}(), got ${d.length}`);return new Promise((a,b)=>{const e=o.bind(null,{resolve:a,reject:b});d.push(e),c.sendMessage(...d)})},q={devtools:{network:{onRequestFinished:k(l)}},runtime:{onMessage:k(n),onMessageExternal:k(n),sendMessage:p.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:p.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},r={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return b.privacy={network:{"*":r},services:{"*":r},websites:{"*":r}},j(a,q,b)})(chrome)}else a.exports=browser});

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* 

  ------------------------------------------------------------------------------------------ HELPER ------------------------------------------------------------------------------------------

*/

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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

/* 

  ------------------------------------------------------------------------------------------ STATE OF SERVICE WORKER ------------------------------------------------------------------------------------------

*/

var whSession = {
  isRunning: false,
  shouldCancel: false,
  loggedin: false,
  username: '',
  token: '',
};

function isCancelled() {
  if (whSession.shouldCancel) {
    return true;
  }

  if (!whSession.isRunning) {
    return true;
  }

  if (!isLoggedIn()) {
    return true;
  }

  return false;
}

function isLoggedIn() {
  return whSession.loggedin;
}

function getUsername() {
  return whSession.username;
}

function getToken() {
  return whSession.token;
}

async function getDataForCurrentUser() {
  var username = getUsername();
  if (!username) {
    console.log('cant getDataForCurrentUser, no username');
    return null;
  }

  var { whData } = await browser.storage.local.get('whData');
  if (!whData?.cannergrow) {
    whData = { cannergrow: {} };
  }

  if (!whData.cannergrow[username]) {
    whData.cannergrow[username] = {};
    whData.cannergrow[username].username = username;
    whData.cannergrow[username].version = '1';
    whData.cannergrow[username].isComplete = false;
  }

  return whData.cannergrow[username];
}

async function saveDataForCurrentUser(d) {
  var username = getUsername();
  if (!username) {
    console.log('cant saveData, no username');
    return null;
  }
  var { whData } = await browser.storage.local.get('whData');
  if (!whData?.cannergrow) {
    whData = { cannergrow: {} };
  }
  whData.cannergrow[username] = d;
  await browser.storage.local.set({ whData: whData }).then(() => {
    console.log('saved successfull', whData);
  });
}

async function getStatusForCurrentUser() {
  /* , options.basePercentage + (d[name].data.length / responseJson.meta.total) * 0.1 */

  var whStatus = {
    isComplete: false,
    percentage: 0,
    message: '',
    shouldCancel: whSession.shouldCancel,
    isRunning: whSession.isRunning,
  };
  var data = await getDataForCurrentUser();
  if (data) {
    if (data.team && data.transactions && data.plants) {
      whStatus.percentage = 1.0;
      whStatus.message = 'complete';
      whStatus.isComplete = true;
    } else if (!data.transactions) {
      whStatus.percentage = 0.0;
      whStatus.message = 'transactions';
    } else if (!data.plants) {
      whStatus.percentage = 0.1;
      whStatus.message = 'plants';
    } else {
      for (var i = 1; i < 7; i++) {
        if (!data['layer' + i]) {
          whStatus.percentage = 0.1 + 0.1 * i;
          whStatus.message = 'layer' + i;
          break;
        }
      }
    }
  } else {
    whStatus.percentage = 0;
    whStatus.message = '?';
    whStatus.isComplete = false;
  }

  return whStatus;
}

/* 

  ------------------------------------------------------------------------------------------ BADGE SECTION ------------------------------------------------------------------------------------------

*/

async function updateView() {
  console.log('updateView');
  var { whData } = await browser.storage.local.get('whData');
  var whStatus = await getStatusForCurrentUser();

  // 0 - 100% black if username is known and it is fetching currently
  // '' if nothing is fetching and nothing was fetched before
  // 100% green if all entries are complete and up2date and nothing is fetching currently
  // 100% yellow if all entries are complete, but not up2date and nothing is fetching currently
  // ? red if username not known and not all entries are complete

  if (whStatus?.isRunning) {
    browser.action.setBadgeText({
      text:
        (whStatus.percentage && parseInt(whStatus.percentage * 100) + ' %') ||
        '',
    });
    browser.action.setBadgeBackgroundColor({ color: '#000000' });
  } else if (!whData?.cannergrow) {
    browser.action.setBadgeText({ text: '' });
  } else if (whData?.cannergrow) {
    var countTotal = Object.keys(whData.cannergrow).length;
    var countTotalComplete = 0;
    var oldestTimestamp = null;
    for (var i = 0; i < countTotal; i++) {
      var entry = whData.cannergrow[Object.keys(whData.cannergrow)[i]];
      countTotalComplete += entry.isComplete ? 1 : 0;
      if (i === 0 || oldestTimestamp > entry.timestamp) {
        oldestTimestamp = entry.timestamp;
      }
    }

    if (countTotal === 0) {
      browser.action.setBadgeText({ text: '' });
    } else if (countTotal === countTotalComplete) {
      browser.action.setBadgeText({ text: '100%' });
      var now = new Date();

      if (now.getTime() - oldestTimestamp > 1000 * 60 * 60) {
        browser.action.setBadgeBackgroundColor({ color: '#228800' });
      } else {
        browser.action.setBadgeBackgroundColor({ color: '#002200' });
      }
    } else {
      browser.action.setBadgeBackgroundColor({ color: '#880000' });
      browser.action.setBadgeText({
        text:
          (whStatus?.percentage &&
            parseInt(whStatus?.percentage * 100) + ' %') ||
          '?',
      });
    }
  } else {
    browser.action.setBadgeBackgroundColor({ color: '#880000' });
    browser.action.setBadgeText({ text: '!' });
  }
}

/* 

  ------------------------------------------------------------------------------------------ BADGE SECTION ------------------------------------------------------------------------------------------

*/

async function fetchData() {
  if (isCancelled()) {
    return;
  }

  console.log('werteherren fetch data');

  var optionsFast = { lengthCheck: true };
  var d = await getDataForCurrentUser();
  d.isComplete = false;
  await saveDataForCurrentUser(d);

  await fetchListOfResources(
    'https://api.cannergrow.com/api/wallet/transactions?page=',
    'transactions',
    'data',
    'label',
    0,
    optionsFast
  );
  await fetchListOfResources(
    'https://api.cannergrow.com/api/growing/plants?page=',
    'plants',
    'data',
    'label',
    0,
    optionsFast
  );
  for (var i = 0; i < 7; i++) {
    d = await getDataForCurrentUser();
    console.log(i, d['layer' + i]?.data, d['layer' + i]?.data?.length > 0);
    if (i === 0 || (d['layer' + i]?.data && d['layer' + i]?.data.length > 0)) {
      await fetchListOfResources(
        'https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=' +
          (i + 1) +
          '&page=',
        'layer' + (i + 1),
        'data',
        'id',
        0,
        optionsFast
      );
    }
  }

  await fetchSingleResource('https://api.cannergrow.com/api/user/team', 'team');

  console.log('done fetching');
  if (isCancelled()) {
    return;
  }
  console.log('finalising');

  var d = await getDataForCurrentUser();
  d.isComplete = true;
  addTimestamp(d);
  await saveDataForCurrentUser(d);
  console.log('finalising complete');
}

/* 

  ------------------------------------------------------------------------------------------ EXTRACT SECTION ------------------------------------------------------------------------------------------

*/

async function fetchListOfResources(
  url,
  name,
  responseKey,
  matchKey,
  index,
  options
) {
  if (isCancelled()) {
    return;
  }

  await sleep(50);
  console.log('fetchRs', url + index);
  var response = await fetch(url + index, {
    headers: new Headers({ Authorization: 'Bearer ' + getToken() }),
  });
  var text = await response.text();
  var responseJson = JSON.parse(text);

  var d = await getDataForCurrentUser();
  if (!d[name]) {
    d[name] = {
      total: 0,
      data: [],
    };
  }

  if (!isCancelled()) {
    if (responseJson[responseKey].length > 0) {
      responseJson[responseKey].forEach((tx) => {
        if (!d[name].data.find((x) => x[matchKey] === tx[matchKey])) {
          d[name].data.push(tx);
        }
      });
    }
    d[name].total = responseJson.meta.total;
    await saveDataForCurrentUser(d);

    if (
      (options &&
        options.lengthCheck &&
        d[name].data.length === responseJson.meta.total) ||
      responseJson.data.length === 0
    ) {
      // we are complete, nothing more to do
    } else {
      await fetchListOfResources(
        url,
        name,
        responseKey,
        matchKey,
        index + 1,
        options
      );
    }
  }
}

async function fetchSingleResource(url, name) {
  if (isCancelled()) {
    return;
  }

  await sleep(50);
  console.log('fetchRs', url);

  var response = await fetch(url, {
    headers: new Headers({ Authorization: 'Bearer ' + getToken() }),
  });
  var text = await response.text();
  var responseJson = JSON.parse(text);

  if (!isCancelled()) {
    var d = await getDataForCurrentUser();
    d[name] = responseJson;
    await saveDataForCurrentUser(d);
  }
}

/* 

  ------------------------------------------------------------------------------------------ LISTENER ------------------------------------------------------------------------------------------

*/

browser.storage.onChanged.addListener(async function (changes, area) {
  //console.log('werteherren service worker badge listener', changes, area);
  updateView();
});

browser.runtime.onMessage.addListener(async (message) => {
  //console.log('werteherren service worker message listener', message);

  if (message.action === 'setSession') {
    console.log('background setSession');
    whSession.username = message.username;
    whSession.token = message.token;
    whSession.loggedin = message.loggedin;
    updateView();
  } else if (message.action === 'extract') {
    if (!whSession.isRunning) {
      try {
        whSession.isRunning = true;
        await fetchData();
      } catch (ex) {
        console.log('background extract exception', ex);
      } finally {
        whSession.isRunning = false;
        shouldCancel = false;
      }
    } else {
      console.log('already running');
    }
  } else if (message.action === 'abort') {
    shouldCancel = true;
  } else if (message.action === 'deleteAll') {
    await browser.storage.local.remove(['whData']);
  } else if (message.action === 'delete') {
    var { whData } = await browser.storage.local.get('whData');
    delete whData.cannergrow[message.username];
    browser.storage.local.set({ whData: whData });
  } else if (message.action === 'getStatus') {
    return Promise.resolve({ whStatus: await getStatusForCurrentUser() });
  } else if (message.action === 'canExtract') {
    return Promise.resolve({
      ok: whSession.username && whSession.token && whSession.loggedin,
    });
  }
});

browser.runtime.onInstalled.addListener(() => {
  console.log('werteherren service worker onInstalled');
});

browser.runtime.onSuspend.addListener(() => {
  console.log('werteherren service worker onSuspend');
});

console.log('werteherren service worker init');
updateView();

/*

https://api.cannergrow.com/api/user/team/layers

*/