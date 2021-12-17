console.log("werteherren content script");


async function contentFetchData() {

  
  browser.storage.local.set({ status: {label: 'new', percentage: 0.0  }})

  
  console.log("werteherren fetch data");

  var username = document
    .getElementsByClassName("user-block-name")[0]
    .innerText.split(",")[1]
    .trim();
  var token = JSON.parse(localStorage.getItem("vuex")).token.access_token;
  var { localData } = await browser.storage.local.get("whData");
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
  await fetchListOfResources('https://api.cannergrow.com/api/growing/plants?page=', 'plants', 'data', 'label', 0, localData, username, token, 0.2, listOptions)
  await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer=1&page=', 'layer1', 'data', 'id', 0, localData, username, token, 0.3, listOptions)
  for (var i=1;i<7;i++) {
    d['layer' + i] && d['layer' + i].length > 0 && await fetchListOfResources('https://api.cannergrow.com/api/user/team/members?order_by=team_size&layer='+(i+1)+'&page=', 'layer'+(i+1), 'data', 'id', 0, localData, username, token, 0.3 + i*0.1, listOptions)
  }
  await fetchSingleResource('https://api.cannergrow.com/api/user/team', 'team', 0, localData, username, token, 0.95)

  addTimestamp(d);
  console.log("saving", localData);
  browser.storage.local.set({ whData: localData }).then(() => {
    console.log('saved successfull');
  });
  browser.runtime.sendMessage({action: 'setBadgeText', text: (100 + ' %') || ''})
  browser.storage.local.set({ status: {label: 'complete', percentage: 1.0 }})

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
              d[name] = {
                total: 0,
                data: []
              }
            }

            if (responseJson[responseKey].length > 0) {
    
              responseJson[responseKey].forEach((tx) => {
                  if (!d[name].data.find((x) => x[matchKey] === tx[matchKey])
                  ) {
                    d[name].data.push(tx);
                  }
              });

            }
      
            d[name].total = responseJson.meta.total
      
            console.log("saving", localData);
            browser.storage.local.set({ whData: localData }).then(() => {
              console.log('saved successfull');
            });

            if (
              (options && options.lengthCheck && d[name].data.length === responseJson.meta.total) ||
              responseJson.data.length === 0
            ) {
              console.log('done extracting ' + name);
              delete options.basePercentage
              resolve(localData)
      
            } else {
              sleep(500).then(async () => {
                if (!options.basePercentage) {
                  options.basePercentage = percentage
                }
                await fetchListOfResources(url, name, responseKey, matchKey, index + 1, localData, username, token, options.basePercentage + (d[name].data.length / responseJson.meta.total) * 0.1, options);
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
          var d = localData.cannergrow[username]
          d[name] = responseJson
          console.log('saving ' + name, localData);
          browser.storage.local.set({ whData: localData }).then(() => {
            console.log('saved ' + name);
          });
 
          resolve(localData)
        })
      })
    })
  })  
  return promise;
}

browser.runtime.onMessage.addListener((message) => {
  console.log("message", message);
  
  if (message.action === 'extract') {
    contentFetchData();
  }
});

document.body.addEventListener("click", function() {
  console.log('clicklckkk')
 // myPort.postMessage({greeting: "they clicked the page!"});
});