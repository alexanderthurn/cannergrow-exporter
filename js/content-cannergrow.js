console.log("werteherren content script");


async function extractData() {
  var token = JSON.parse(localStorage.getItem("vuex"))?.token?.access_token;
  var username = token && document.getElementsByClassName("user-block-name")[0].innerText.split(",")[1].trim();
  browser.storage.local.set({whSession: {cannergrow: {loggedin: token ? true : false, token: token, username: username }}})
  console.log('session extracted', token, {whSession: {cannergrow: {loggedin: token ? true : false, token: token, username: username }}})
}

window.onload = async function () {
 extractData()
}


browser.storage.onChanged.addListener(function (changes, area) {
  console.log('changes', changes, area)
  //updateData()
});