console.log("werteherren content script");
browser.storage.local.set({ status: {label: 'new' }})


async function contentFetchData() {
  
console.log("werteherren fetch data");

  var username = document
    .getElementsByClassName("user-block-name")[0]
    .innerText.split(",")[1]
    .trim();
  var token = JSON.parse(localStorage.getItem("vuex")).token.access_token;

  browser.storage.local.get("whData").then(async ({ whData }) => {
    var localData = whData;
    if (!localData) {
      localData = { cannergrow: {} };
      localData.cannergrow[username] = {};
      localData.cannergrow[username].username = username;
      localData.cannergrow[username].version = "1";
    }

    var listOptions = {lengthCheck: true}
    var d = localData.cannergrow[username]
    browser.storage.local.set({status: {label: 'extracting', percentage: 0.0 }})
    await fetchListOfResources('https://api.cannergrow.com/api/wallet/transactions?page=', 'transactions', 'data', 'label', 0, localData, username, token, 0.1, listOptions)
    await fetchListOfResources('https://api.cannergrow.com/api/growing/plants?page=', 'plants', 'data', 'label', 0, localData, username, token, 0.15, listOptions)
    await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=1&page=', 'members1', 'data', 'id', 0, localData, username, token, 0.2, listOptions)
    d.members1 && d.members1.length > 0 && await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=2&page=', 'members2', 'data', 'id', 0, localData, username, token, 0.25, listOptions)
    d.members2 && d.members2.length > 0 && await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=3&page=', 'members3', 'data', 'id', 0, localData, username, token, 0.3, listOptions)
    d.members3 && d.members3.length > 0 && await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=4&page=', 'members4', 'data', 'id', 0, localData, username, token, 0.35, listOptions)
    d.members4 && d.members4.length > 0 && await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=5&page=', 'members5', 'data', 'id', 0, localData, username, token, 0.4, listOptions)
    d.members5 && d.members5.length > 0 && await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=6&page=', 'members6', 'data', 'id', 0, localData, username, token, 0.45, listOptions)
    d.members6 && d.members6.length > 0 && await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=7&page=', 'members7', 'data', 'id', 0, localData, username, token, 0.5, listOptions)
    await fetchSingleResource('https://api.cannergrow.com/api/user/team', 'team', 0, localData, username, token, 0.6)
    await fetchSingleResource('https://api.cannergrow.com/api/user/team/layers', 'layers', 0, localData, username, token, 0.7)
    await fetchSingleResource('https://api.cannergrow.com/api/growing/plants/rooms', 'rooms', 0, localData, username, token, 0.8)
    await fetchSingleResource('https://api.cannergrow.com/api/growing/plants/overview', 'overview', 0, localData, username, token, 0.9)
    
    
    
    d.members = []
    for (var i=1;i<8;i++) {
      console.log('pushing', i)
      var arr = d['members'+i]
      if (arr) {
        d.members = d.members.concat(arr)
      }
    }
    console.log("saving", localData);
    browser.storage.local.set({ whData: localData }).then(() => {
      console.log('saved successfull');
    });


    browser.storage.local.set({ status: {label: 'complete', percentage: 1.0 }})


  });
}

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
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  data.timestamp = now.getTime();
  data.date = dateToSave;
}

async function fetchListOfResources(url, name, responseKey, matchKey, index, localData, username, token, percentage, options) {
  browser.storage.local.set({status: {label: 'extracting', message: name, percentage: percentage }})

  
  let promise = new Promise((resolve, reject) => {

    sleep(1000).then(() => {
      console.log('fetchRs', url, name, responseKey, matchKey, index, localData, username, token, options)

        fetch(url + index, {
          headers: new Headers({ Authorization: "Bearer " + token }),
        }).then((response) => {
          response.text().then((text) => {
            var responseJson = JSON.parse(text); // data, links, meta, types
            var d = localData.cannergrow[username]
            if (!d[name]) {
              d[name] = []
            }

            if (responseJson[responseKey].length > 0) {
    
              responseJson[responseKey].forEach((tx) => {
                  if (!d[name].find((x) => x[matchKey] === tx[matchKey])
                  ) {
                    d[name].push(tx);
                  }
              });

            }
      
            addTimestamp(d);
            d[name + 'Total'] = responseJson.meta.total
      
            console.log("saving", localData);
            browser.storage.local.set({ whData: localData }).then(() => {
              console.log('saved successfull');
            });
            //browser.action.setBadgeText({text: (percentage && percentage*100 + ' %') || ''});
      
            if (
              (options && options.lengthCheck && d[name].length === responseJson.meta.total) ||
              responseJson.data.length === 0
            ) {
              console.log('done extracting ' + name);
              resolve(localData)
      
            } else {
              sleep(500).then(async () => {
                await fetchListOfResources(url, name, responseKey, matchKey, index + 1, localData, username, token, percentage, options);
                resolve(localData)
              });
            }
          })
        })
    })


    
  })
  
  return promise;
}

async function fetchSingleResource(url, name, index, localData, username, token, percentage) {
  browser.storage.local.set({status: {label: 'extracting', message: name, percentage: percentage  }})

  let promise = new Promise((resolve, reject) => {

    sleep(1000).then(() => {
      console.log('fetchTeam', index, localData, username, token)
      fetch(url, {
        headers: new Headers({ Authorization: "Bearer " + token }),
      }).then((response) => {
        response.text().then((text) => {
          var responseJson = JSON.parse(text);
          addTimestamp(localData.cannergrow[username]);
          var d = localData.cannergrow[username]
          d[name] = responseJson
          console.log('saving ' + name, localData);
          browser.storage.local.set({ whData: localData }).then(() => {
            console.log('saved ' + name);
          });
         // browser.action.setBadgeText({text: (percentage && percentage*100 + ' %') || ''});
          resolve(localData)
        })
      })
    })
  })  
  return promise;
}

browser.runtime.onMessage.addListener((message) => {
  console.log("message", message);
  contentFetchData();
});