console.log('werteherren content script');

function geTokenAndUsername() {
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

async function setSession() {
  var session = geTokenAndUsername()
  var username = session.username
  var token = session.token
  var loggedin = session.loggedin
  browser.runtime.sendMessage({ action: 'setSession', username: username, token: token, loggedin: loggedin });
}

window.onload = () => {
  setSession();
}