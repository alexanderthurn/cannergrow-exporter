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

  function openReport(username) {
    window.open(
      'https://dev.werteherren.de/calculator/cannergrow-rendite-rechner-pro.html?inject=wh&username='+username,
      '_blank'
    );
  }

  function openTaxReport(username) {
    window.open(
      'https://dev.werteherren.de/calculator/cannergrow-steuer-helfer.html?inject=wh&username='+username,
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
    return tab;
  }

  async function deleteData(username) {
    await browser.runtime.sendMessage({action: 'delete', username: username});
  }

  async function abortExtraction() {
    await browser.runtime.sendMessage({action: 'abort'});
  }
  
  async function canExtract() {
    var canExtractResult = await browser.runtime.sendMessage({ action: 'canExtract' }).then((response) => {
      console.log('canExtract response', response)
      return response.ok
      }).catch((ex) => {
        console.log('canExtract ex', ex)
      })


    return canExtractResult
  }

  async function extractData() {


    //showElement('whPluginActionsCannergrow', );
    var canExtractResult = await canExtract()
    if (!canExtractResult) {
      openCannergrowBackend()
    } else {
      await browser.runtime.sendMessage({ action: 'extract' }).then((response) => {
        console.log('extractData response', response)
      }).catch((ex) => {
        console.log('extractData ex', ex)
      })
    }
  }

  

  async function canInject() {
    var canInjectResult =  browser.tabs.sendMessage((await getCurrentTab()).id, { action: 'canInject' }).then((response) => {
      console.log('canInject response', response)
      return response.ok
      }).catch((ex) => {
        console.log('canInject ex', ex)
      })


    return canInjectResult
  }

  async function injectData() {
    await browser.tabs.sendMessage((await getCurrentTab()).id, { action: 'inject' })
  }

  async function downloadData(username) {
    console.log('download username', username)
    var { whData } = await browser.storage.local.get('whData');
    if (whData !== null) {
      saveObjectAsFile('cannergrow-'+username+'.json', whData.cannergrow[username]);
    } else {
      console.log('Keine Daten gefunden');
    }
  }

  async function updateView() {
    var tab = await getCurrentTab();
    var {whStatus} = await browser.runtime.sendMessage({action: 'getStatus'})
    var { whData } = await browser.storage.local.get('whData');
    var { whSession } = await browser.storage.local.get('whSession');
    var loggedIn = whSession?.cannergrow?.loggedin

    if (whData) {

      var countTotal = 0
      var countTotalComplete = 0;
      if (whData?.cannergrow) {
        countTotal= Object.keys(whData?.cannergrow).length;
        for (var i = 0; i < countTotal; i++) {
          var entry = whData.cannergrow[Object.keys(whData.cannergrow)[i]];
          countTotalComplete += entry.isComplete ? 1 : 0;
        }
      }
      
     

      var resultHTML ='<b>Gefundene Datens&auml;tze</b>'

      for (let index = 0; index < countTotal; index++) {

        let username =
          whData.cannergrow &&
          Object.keys(whData.cannergrow).length > 0 &&
          Object.keys(whData.cannergrow)[index];
        let data = whData?.cannergrow[username];
        
        if (data.isComplete) {

          let members = [];
          let membersTotal = 0;
          for (var i = 1; i < 8; i++) {
            let arr = data['layer' + i]?.data;
            if (arr) {
              membersTotal += arr.length;
              members = members.concat(arr);
            }
          }
      
          resultHTML += `<div id="whPluginResult${index}">
            <table>
              <tr>
                <td>Username: </td>
                <td><b>${username}</b></td>
              </tr>
              <tr>
                <td>Letzter Sync: </td>
                <td>${(data?.date && niceDate(data.date) || 'Nie')}</td>
              </tr>
              <tr>
                <td>Transaktionen:</td>
                <td>${(data?.transactions?.data?.length || '0')}/${(data?.transactions?.total || '')}</td>
              </tr>
              <tr>
                <td>Pflanzen:</td>
                <td>${(data?.plants?.data?.length || '0')}/${(data?.plants?.total || '0')}</td>
              </tr>
              <tr>
                <td>Team:</td>
                <td>${(members?.length || '0')}/${(membersTotal || '0')}</td>
              </tr>
            </table>
            <div>
              <button onclick="console.log(\'hallo\')" id="btnDownloadData${index}" type="button">
                <i class="fas fa-save"></i> Download</button>
              <button id="btnDeleteData${index}"  type="button"><i class="fas fa-trash"></i>L&ouml;schen</button>
              <button id="btnTaxReport${index}" type="button"><i class="fas fa-chart-bar"></i>&nbsp;Steuer-Report<br /></button><br />
              <button id="btnReport${index}" type="button"><i class="fas fa-chart-line"></i>&nbsp;Rendite-Prognose<br /></button><br />
            </div>
          </div>`
        }
      }

      
      document.getElementById('whPluginResult').innerHTML = resultHTML;
      for (var index = 0; index < countTotal; index++) {

        let username =
          whData.cannergrow &&
          Object.keys(whData.cannergrow).length > 0 &&
          Object.keys(whData.cannergrow)[index];
        let data = whData?.cannergrow[username];
        
        if (data.isComplete) {
          document.getElementById('btnDownloadData' + index).onclick = () => {downloadData(username)}
          document.getElementById('btnDeleteData' + index).onclick = () => {deleteData(username)};
          document.getElementById('btnTaxReport' + index).onclick = () => {openTaxReport(username)};
          document.getElementById('btnReport' + index).onclick = () => {openReport(username)};
        }
      }


    }

    if (whStatus?.isRunning) {
      document.getElementById('whLoaderMessage').innerText = ((whStatus.percentage && parseInt(whStatus.percentage * 100) + ' %' + ' - ') || '') +
        'Extrahiere ' +
        (whStatus.message || '');
    } 

    showElement('whLoader', whStatus?.isRunning);
    showElement('whPluginContent', !whStatus?.isRunning);
    showElement('whPluginResult', countTotal > 0 && countTotal == countTotalComplete);
    showElement('whPluginTutorial', !loggedIn)
  }

  window.onload = async function () {

    console.log('werteherren popup script');
    document.getElementById('btnSyncData').onclick = extractData;
    document.getElementById('btnAbortSync').onclick = abortExtraction



    await updateView();

    browser.storage.onChanged.addListener(function (changes, area) {
      updateView();
    });
  };
})();
