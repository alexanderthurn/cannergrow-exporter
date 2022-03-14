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
        'cannergrow-' + username + '.json',
        whData.cannergrow[username]
      );
    } else {
      console.log('Keine Daten gefunden');
    }
  }

  async function startExtraction(username) {
    return new Promise((resolve, reject) => {
      window.setTimeout(async function () {
        var { whData } = await browser.storage.local.get('whData');
        var data = whData?.cannergrow['werteherren'];
        whData.cannergrow[username] = data;
        await browser.storage.local.set({ whData: whData });
        resolve();
      }, 500);
    });
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
          '" /><span id="whExtractButtonText">Steuer-Tool</span></a></li>'
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
