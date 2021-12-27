console.log('popup');

(function () {
  'use strict';

  function showElement(elemId, visible) {
    if (visible === undefined || visible === true) {
      var elem = document.getElementById(elemId);
      elem.classList.contains('invisible') && elem.classList.remove('invisible');
    } else {
      hideElement(elemId)
    }
   
  }

  function hideElement(elemId) {
    var elem = document.getElementById(elemId);
    !elem.classList.contains('invisible') && elem.classList.add('invisible');
  }

  function niceDate(dateString) {
    return (
      new Date(dateString).toLocaleDateString('de-DE', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }) +
      '&nbsp;&nbsp;' +
      new Date(dateString).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }

  function openReport() {
    window.open(
      'https://dev.werteherren.de/calculator/cannergrow-rendite-rechner-pro.html?inject=wh',
      '_blank'
    );
  }

  function openTaxReport() {
    window.open(
      'https://dev.werteherren.de/calculator/cannergrow-steuer-helfer.html?inject=wh',
      '_blank'
    );
  }

  function openCannergrowBackend() {
    window.open(
      'https://cannergrow.com/r/XJ7QY3',
      '_blank'
    );
  }

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

  async function getCurrentTab() {
    var tab = await browser.tabs
      .query({ currentWindow: true, active: true })
      .then((tabs) => tabs[0]);
    console.log('tab', tab);
    return tab;
  }

  async function deleteData() {
    await browser.runtime.sendMessage({action: 'deleteAll'});
  }

  async function abortExtraction() {
    await browser.runtime.sendMessage({action: 'abort'});
  }
  
  async function extractData() {
    console.log('extractData')
    await browser.runtime.sendMessage({ action: 'extract' }).then((response) => {
      console.log('extractData response', response)
    }).catch((ex) => {
      console.log('extractData ex', ex)
    })
  }

  async function canExtract() {
    var canExtractResult = await browser.runtime.sendMessage({ action: 'canExtract' }).then((response) => {
      console.log('canExtract response', response)
      return response.ok
      }).catch((ex) => {
        console.log('canExtract ex', ex)
      })


    console.log('canExtract', canExtractResult)
    return canExtractResult
  }

  async function canInject() {
    var canInjectResult =  browser.tabs.sendMessage((await getCurrentTab()).id, { action: 'canInject' }).then((response) => {
      console.log('canInject response', response)
      return response.ok
      }).catch((ex) => {
        console.log('canInject ex', ex)
      })


    console.log('canInject', canInjectResult)
    return canInjectResult
  }

  async function injectData() {
    await browser.tabs.sendMessage((await getCurrentTab()).id, { action: 'inject' })
  }

  async function downloadData() {
    var { whData } = await browser.storage.local.get('whData');
    if (whData !== null) {
      saveObjectAsFile('cannergrow.json', whData);
    } else {
      console.log('Keine Daten gefunden');
    }
  }

  async function updateView() {
    var tab = await getCurrentTab();
    console.log('updateView', tab);
    var {whStatus} = await browser.runtime.sendMessage({action: 'getStatus'})
    console.log('updateView status', whStatus);
    var { whData } = await browser.storage.local.get('whData');
    var { whSession } = await browser.storage.local.get('whSession');
    var loggedIn = whSession?.cannergrow?.loggedin

    if (whData) {
      var username =
        whData.cannergrow &&
        Object.keys(whData.cannergrow).length > 0 &&
        Object.keys(whData.cannergrow)[0];
      var data = whData?.cannergrow[username];
      var countTotal = 0
      var countTotalComplete = 0;
     

      
      if (whData?.cannergrow) {
        countTotal= Object.keys(whData?.cannergrow).length;
        for (var i = 0; i < countTotal; i++) {
          var entry = whData.cannergrow[Object.keys(whData.cannergrow)[i]];
          countTotalComplete += entry.isComplete ? 1 : 0;
        }
      }

      console.log('whData', whData, data, countTotal, countTotalComplete)
      var members = [];
      var membersTotal = 0;
      for (var i = 1; i < 8; i++) {
        var arr = data['layer' + i]?.data;
        console.log('arr', arr)
        if (arr) {
          membersTotal += arr.length;
          members = members.concat(arr);
        }
      }

      document.getElementById('spanUsername').innerHTML = username;
      document.getElementById('spanLastUpdate').innerHTML =
        (data?.date && niceDate(data.date)) || 'Nie';
      document.getElementById('spanTransactionsLength').innerText =
        (data?.transactions?.data?.length || '0') +
        '/' +
        (data?.transactions?.total || '');
      document.getElementById('spanPlantsLength').innerText =
        (data?.plants?.data?.length || '0') +
        '/' +
        (data?.plants?.total || '0');
      document.getElementById('spanMembersLength').innerText =
        (members?.length || '0') +
        '/' +
        (membersTotal || '0');
    }

    if (whStatus?.isRunning) {
      document.getElementById('whLoaderMessage').innerText = ((whStatus.percentage && parseInt(whStatus.percentage * 100) + ' %' + ' - ') || '') +
        'Loading ' +
        (whStatus.message || '');
    } 

    showElement('whLoader', whStatus?.isRunning);
    showElement('whPluginContent', !whStatus?.isRunning);
    showElement('whPluginResult', countTotal > 0 && countTotal == countTotalComplete);
    showElement('whPluginTutorial', !loggedIn)
    showElement('whPluginActionsCannergrow', await canExtract());
    showElement('whPluginActionsWerteherren', tab?.url?.indexOf('werteherren.de') > -1);

  }

  window.onload = async function () {
    console.log('werteherren popup script');
    document.getElementById('btnDeleteData').onclick = deleteData;
    document.getElementById('btnDownloadData').onclick = downloadData;
    document.getElementById('btnReport').onclick = openReport;
    document.getElementById('btnTaxReport').onclick = openTaxReport;
    document.getElementById('btnCannergrowBackend').onclick = openCannergrowBackend;
    
    document.getElementById('btnInjectData').onclick = injectData;
    document.getElementById('btnSyncData').onclick = extractData;
    document.getElementById('btnAbortSync').onclick = abortExtraction

    await updateView();

    browser.storage.onChanged.addListener(function (changes, area) {
      console.log('change received!');
      updateView();
    });
  };
})();
