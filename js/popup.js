console.log("popup");

(function () {
  "use strict";

  window.onload = function () {
    console.log("werteherren popup script");


    function getCurrentTab() {
      return browser.tabs
        .query({ currentWindow: true, active: true })
        .then((tabs) => tabs[0]);
    }

    function niceDate(dateString) {
      return (
        new Date(dateString).toLocaleDateString("de-DE", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }) +
        "&nbsp;&nbsp;" +
        new Date(dateString).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    function deleteData() {
      showElement("whLoader", true);
      document.getElementById('whLoaderMessage').innerText = ''
      browser.storage.local.clear().then(() => {
        updateView();
        showElement("whLoader", false);
      });
    }

    function downloadData() {
      const saveTemplateAsFile = (filename, dataObjToWrite) => {
        const blob = new Blob([JSON.stringify(dataObjToWrite, undefined, 2)], {
          type: "text/json",
        });
        const link = document.createElement("a");

        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["text/json", link.download, link.href].join(
          ":"
        );

        const evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });

        link.dispatchEvent(evt);
        link.remove();
      };

      browser.storage.local.get("whData").then(({ whData }) => {
        if (whData !== null) {
          saveTemplateAsFile("cannergrow.json", whData);
        } else {
          console.log("Keine Daten gefunden");
        }
      });
    }

    function showElement(elemId, show) {
      var elem = document.getElementById(elemId);
      if (!show) {
        elem.classList.add("invisible");
      } else {
        elem.classList.remove("invisible");
      }
    }



    function openReport() {
      window.open(
        "https://dev.werteherren.de/calculator/cannergrow-tax-calculator.html",
        "_blank"
      );
    }

    function updateView() {
      getCurrentTab().then(function (tab) {
        console.log(
          "tab",
          tab.url,
          tab.url.indexOf("backend.cannergrow.com/login")
        );
        if (
          tab.url.indexOf("backend.cannergrow.com") >= 0 &&
          tab.url.indexOf("backend.cannergrow.com/login") < 0 &&
          tab.url.indexOf("backend.cannergrow.com/register") < 0
        ) {

          browser.storage.local.get("status").then( ({status}) => {
            if (status && status.label === 'extracting') {
              showElement("whLoader", true);
              document.getElementById('whLoaderMessage').innerText = ((status.percentage && parseInt(status.percentage*100) + ' %' + ' - ') || '') + 'Loading ' + (status.message || '')
              showElement("whPluginContent", false);
            } else {
              showElement("whLoader", false);
              showElement("whPluginContent", true);
              document.getElementById('whLoaderMessage').innerText = ''
              browser.action.setBadgeText({text: ''});
            }
          })

          browser.storage.local.get("whData").then(({ whData }) => {
            console.log("whData");
            if (whData) {
              var username =
                whData.cannergrow &&
                Object.keys(whData.cannergrow).length > 0 &&
                Object.keys(whData.cannergrow)[0];
              var data = whData.cannergrow[username];

              var members = []
              var membersTotal = 0;
              for (var i=1;i<8;i++) {
                var arr = data['layer'+i]
                if (arr) {
                  membersTotal += arr.length
                  members = members.concat(arr)
                }
              }

    

              document.getElementById("spanUsername").innerHTML = username;
              document.getElementById("spanLastUpdate").innerHTML =
                (data && data.date && niceDate(data.date)) || "Nie";
              document.getElementById("spanTransactionsLength").innerText =
                ((data && data.transactions && data.transactions.length) || "0") + '/' + ((data && data.transactionsTotal) || '');
              document.getElementById("spanPlantsLength").innerText =
                ((data && data.plants && data.plants.length) || '0') + '/' + ((data && data.plantsTotal) || '0');
              document.getElementById("spanMembersLength").innerText =
                ((data && members && members.length) || '0') + '/' + ((data && membersTotal) || '0');

              
              showElement("whPluginResult", true);
              showElement("whPluginResultActionsCannergrow", true);
              showElement("whPluginResultActionsInject", false);
              showElement("whPluginTutorial", false);
            } else {
              showElement("whPluginResult", false);
              showElement("whPluginTutorial", true);
            }

            showElement("whPluginWorking", true);
            showElement("whCorrectPage", true);
            showElement("whLoggedIn", true);
          });
        } else if (tab.url.indexOf("werteherren.de") > -1) {
          showElement("whPluginWorking", true);
          showElement("whPluginResultActionsCannergrow", false);
          showElement("whPluginResultActionsInject", true);
          showElement("whPluginTutorial", false);
          showElement("whPluginSyncArea", false);
          showElement("whLoader", false);
        } else {
          showElement("whPluginTutorial", true);
          showElement("whPluginWorking", false);
          showElement("whLoggedIn", false);
          showElement("whCorrectPage", false);
          showElement("whLoader", false);

          if (tab.url.indexOf("backend.cannergrow.com") > 0) {
            showElement("whCorrectPage", true);
          }
        }
      });
    }

    document.getElementById("btnDeleteData").onclick = deleteData;
    document.getElementById("btnDownloadData").onclick = downloadData;
    document.getElementById("btnReport").onclick = openReport;
    updateView();

    browser.storage.onChanged.addListener(function (changes, area) {
      console.log("change received!");
      updateView();
    });

    document
      .getElementById("btnSyncData")
      .addEventListener("click", async () => {
        console.log('click2')

        getCurrentTab().then((tab) => {
          browser.tabs.sendMessage(tab.id, { action: "fetch" }).then(response => {
            console.log("Message from the content script:");
            console.log(response);
          }).catch((onError) => {console.log('error', onError)});
        })
  
      });
  };
})();
