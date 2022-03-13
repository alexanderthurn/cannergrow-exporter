(function() {
  'use strict';
  /*var ref=document.createElement('script')
  ref.setAttribute("type","text/javascript")
  ref.setAttribute("src","https://unpkg.com/webextension-polyfill@0.8.0/dist/browser-polyfill.min.js")
  document.getElementsByTagName("head")[0].appendChild(ref)
*/

 /**
   * @param {String} HTML representing a single element
   * @return {Element}
   */
  function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }


  function whGetTokenAndUsername() {
    var token = JSON.parse(localStorage.getItem('vuex'))?.token?.access_token;
    var loggedin = token ? true : false;
    var username
    
    try {
      username =
      token &&
      document
        ?.getElementsByClassName('user-block-name')[0]
        ?.innerText?.split(',')[1]
        .trim();
    } catch (ex) {
      username = null
    }
   
  
    return { loggedin: loggedin, token: token, username: username };
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

  


window.onload = function() {

  console.log('werteherren plugin inject')

 
  var isRunning = false;
  var hasDownload = false

  function download(username) {
  }
  function extract(username) {
    if (!isRunning) {
      isRunning = true;  
      hasDownload = false
      updateView()

      window.setTimeout(function() {
        hasDownload = true
        isRunning = false;        
        updateView()
      }, 2000)
    }
  }

  

  function updateView() {

    if (isRunning) {
      document.getElementById('whExtractButtonText').innerText = 'Sync läuft ...'
    } else {

      if (hasDownload) {
        document.getElementById('whExtractButtonText').innerText = '30.01.2022 - 14:12'
      } else {
        document.getElementById('whExtractButtonText').innerText = 'Sync starten'
      }
    }

    if (hasDownload) {
        document.getElementById('whDownloadButtonOuter').style.visibility = 'visible'
        document.getElementById('whTaxButtonOuter').style.visibility = 'visible'
        document.getElementById('whRenditeButtonOuter').style.visibility = 'visible'
        document.getElementById('whTaxButtonOuter').style.height = 'auto'
        document.getElementById('whRenditeButtonOuter').style.height = 'auto'
    } else {
      document.getElementById('whDownloadButtonOuter').style.visibility = 'collapse'
      document.getElementById('whTaxButtonOuter').style.visibility = 'collapse'
      document.getElementById('whRenditeButtonOuter').style.visibility = 'collapse'
      document.getElementById('whTaxButtonOuter').style.height = '0'
      document.getElementById('whRenditeButtonOuter').style.height = '0'
    }

  }

  function injectIfPossible() {
    var navs = document.getElementsByClassName('nav-heading');
    if(!document.getElementById('whPluginOuter') && navs.length > 0) {
   
      var imageUrl = browser.runtime.getURL('images/CGRWH128.png');
      var elemExtract = htmlToElement('<li id="whExtractButtonOuter" style="margin-bottom: -10px"><a id="whExtractButton" href="/dashboard"><span id="whExtractButtonText"></span></a></li>')
      var elemDownload = htmlToElement('<li id="whDownloadButtonOuter" style="margin-bottom: -20px"><a id="whDownloadButton" href="/dashboard"><img style="width:40px; margin-left: -4px; margin-right: 10px" src="'+imageUrl+'" /><span id="whExtractButtonText">Download</span></a></li>')
      var elemTaxTool = htmlToElement('<li id="whTaxButtonOuter" style="margin-bottom: -20px"><a id="whTaxButton" href="/dashboard"><img style="width:40px; margin-left: -4px; margin-right: 10px" src="'+imageUrl+'" /><span id="whExtractButtonText">Steuer-Tool</span></a></li>')
      var elemRenditeTool = htmlToElement('<li id="whRenditeButtonOuter" style="margin-bottom: -10px"><a id="whRenditeButton" href="/dashboard"><img style="width:40px; margin-left: -4px; margin-right: 10px" src="'+imageUrl+'" /><span id="whExtractButtonText">Rendite-Tool</span></a></li>')
      var elemHeader = htmlToElement('<li class="whOuter nav-heading" id="whPluginOuter"><span>Werteherren</span></li>')
      navs[0].parentElement.insertBefore(elemRenditeTool, navs[0])
      navs[0].parentElement.insertBefore(elemTaxTool, elemRenditeTool)
      navs[0].parentElement.insertBefore(elemDownload, elemTaxTool)
      navs[0].parentElement.insertBefore(elemExtract, elemDownload)
      navs[0].parentElement.insertBefore(elemHeader, elemExtract)
  
      var username = whGetTokenAndUsername().username

      document.getElementById('whExtractButton').onclick =(event) => {extract(username); event.preventDefault();return false;};          
      document.getElementById('whTaxButton').onclick = (event) => {openTaxReport(username); event.preventDefault();return false;};
      document.getElementById('whRenditeButton').onclick = (event) => {openReport(username); event.preventDefault();return false;};
      document.getElementById('whDownloadButton').onclick = (event) => {download(username); event.preventDefault();return false;};
      console.log('found and injected')
      updateView()

    } 
    window.setTimeout(injectIfPossible, 500)
  }
  
  
  injectIfPossible()
}

})();