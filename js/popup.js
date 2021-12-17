console.log("popup");

(function () {
  "use strict";

  function showElement(elemId, show) {
    var elem = document.getElementById(elemId);
    if (!show) {
      elem.classList.add("invisible");
    } else {
      elem.classList.remove("invisible");
    }
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

  function openReport() {
    window.open(
      "https://dev.werteherren.de/calculator/cannergrow-tax-calculator.html",
      "_blank"
    );
  }

  const saveObjectAsFile = (filename, dataObjToWrite) => {
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

  async function getCurrentTab() {
    var tab = await browser.tabs
      .query({ currentWindow: true, active: true })
      .then((tabs) => tabs[0]);
    console.log("tab", tab);
    return tab;
  }

  async function deleteData() {
    showElement("whLoader", true);
    document.getElementById("whLoaderMessage").innerText = "";
    await browser.storage.local.clear();
    updateView();
    showElement("whLoader", false);
  }

  async function extractData() {
    var tab = await getCurrentTab();
    return browser.tabs
      .sendMessage(tab.id, { action: "extract" })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response);
      })
      .catch((onError) => {
        console.log("error", onError);
      });
  }

  async function injectData() {
    var tab = await getCurrentTab();

    return browser.tabs
      .sendMessage(tab.id, { action: "inject" })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response);
      })
      .catch((onError) => {
        console.log("error", onError);
      });
  }

  async function downloadData() {
    var { whData } = await browser.storage.local.get("whData");
    if (whData !== null) {
      saveObjectAsFile("cannergrow.json", whData);
    } else {
      console.log("Keine Daten gefunden");
    }
  }

  async function updateView() {
    var tab = await getCurrentTab();
    console.log("updateView", tab);
    var { status } = await browser.storage.local.get("status");
    var { whData } = await browser.storage.local.get("whData");

    if (whData) {
      var username =
        whData.cannergrow &&
        Object.keys(whData.cannergrow).length > 0 &&
        Object.keys(whData.cannergrow)[0];
      var data = whData.cannergrow[username];

      var members = [];
      var membersTotal = 0;
      for (var i = 1; i < 8; i++) {
        var arr = data["layer" + i];
        if (arr) {
          membersTotal += arr.length;
          members = members.concat(arr);
        }
      }

      document.getElementById("spanUsername").innerHTML = username;
      document.getElementById("spanLastUpdate").innerHTML =
        (data && data.date && niceDate(data.date)) || "Nie";
      document.getElementById("spanTransactionsLength").innerText =
        ((data && data.transactions && data.transactions.length) || "0") +
        "/" +
        ((data && data.transactionsTotal) || "");
      document.getElementById("spanPlantsLength").innerText =
        ((data && data.plants && data.plants.length) || "0") +
        "/" +
        ((data && data.plantsTotal) || "0");
      document.getElementById("spanMembersLength").innerText =
        ((data && members && members.length) || "0") +
        "/" +
        ((data && membersTotal) || "0");
    }

    if (
      tab.url.indexOf("backend.cannergrow.com") >= 0 &&
      tab.url.indexOf("backend.cannergrow.com/login") < 0 &&
      tab.url.indexOf("backend.cannergrow.com/register") < 0
    ) {
      if (status && status.label === "extracting") {
        showElement("whLoader", true);
        document.getElementById("whLoaderMessage").innerText =
          ((status.percentage &&
            parseInt(status.percentage * 100) + " %" + " - ") ||
            "") +
          "Loading " +
          (status.message || "");
        showElement("whPluginContent", false);
      } else {
        showElement("whLoader", false);
        showElement("whPluginContent", true);
        document.getElementById("whLoaderMessage").innerText = "";
        browser.action.setBadgeText({ text: "" });
      }

      if (whData && status.label === 'complete') {
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
  }

  window.onload = function () {
    console.log("werteherren popup script");
    document.getElementById("btnDeleteData").onclick = deleteData;
    document.getElementById("btnDownloadData").onclick = downloadData;
    document.getElementById("btnReport").onclick = openReport;
    document.getElementById("btnInjectData").onclick = injectData;
    document.getElementById("btnSyncData").onclick = extractData;

    updateView();

    browser.storage.onChanged.addListener(function (changes, area) {
      console.log("change received!");
      updateView();
    });
  };
})();
