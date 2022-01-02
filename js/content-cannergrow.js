console.log('werteherren content script');

function whGetTokenAndUsername() {
  var token = JSON.parse(localStorage.getItem('vuex'))?.token?.access_token;
  var loggedin = token ? true : false
  var username =
    token &&
    document
      ?.getElementsByClassName('user-block-name')[0]
      ?.innerText?.split(',')[1]
      .trim();

  return {loggedin: loggedin, token: token, username: username};
}

async function setSession() {
  var session = whGetTokenAndUsername()
  var username = session.username
  var token = session.token
  var loggedin = session.loggedin
  browser.runtime.sendMessage({ action: 'setSession', username: username, token: token, loggedin: loggedin });
}

async function whUpdateView() {
  var {whStatus} = await browser.runtime.sendMessage({action: 'getStatus'})
  
  console.log('whStatus', whStatus)
  var elemLoader = document.getElementById('whLoaderOverlay')

  if (whStatus?.isRunning && !elemLoader) {
    var imageUrl = browser.runtime.getURL('images/werte-herren-logo.svg');

    document.getElementsByTagName('body')[0].innerHTML += "" +
    '<div id="whLoaderOverlay" class="wh-overlay">'+
    '  <a href="javascript:void(0)" class="wh-closebtn" onclick="document.getElementById(\'whLoaderOverlay\').style.visibility=\'collapse\'">&times;</a>'+
    '  <div class="wh-overlay-content">'+
    '<img src="'+imageUrl+'" class="wh-logo"></img><br /><br />'+
    '    <h1 class="wh-text" id="whLoaderMessage"></h1>'+
    '    <h3 class="wh-text">Please wait until finished</h3>'+
    '  </div>'+
    '</div>'
  } else if (!whStatus?.isRunning && elemLoader) {
    elemLoader.remove();
  }
  

  if (whStatus?.isRunning) {
    document.getElementById('whLoaderMessage').innerText = ((whStatus.percentage && parseInt(whStatus.percentage * 100) + ' %' + ' - ') || '') +
      'Loading ' +
      (whStatus.message || '');
  } 
}


// data should be injected
browser.runtime.onMessage.addListener(async (message) => {
  console.log('message', message)

  var response = { unknown: true}
 

  if (message.action === 'extract') {
    if (token && username && loggedin) {
      browser.runtime.sendMessage({ action: 'extract' });
      response = {ok: true}
    } else {
      response = {ok: false, token: token, username: username, loggedin: loggedin}
    }
  } 

  console.log('response', response)
  return Promise.resolve(response)
});



window.addEventListener('load', (event) => {
  setSession();


 whUpdateView();
})


browser.storage.onChanged.addListener(function (changes, area) {
  console.log('change received!');
  whUpdateView();
});