var city = null; // variable to store the city name
var cityStored = "a";

function test() {
  console.log("test");
}
document
  .querySelectorAll(".resadescriptif div:nth-child(2)")
  .forEach(function (element) {
    console.log(element);
    // keep the 5 rest of the element
    var rest = element.innerText.split("\n").slice(1).join("<br>");
    var cityName = element.innerText.split("\n")[0];

    // replace the city name by a button to display the map
    element.innerHTML = "<button >" + cityName + "</button><br>" + rest;
    element.querySelector("button").addEventListener("click", function () {
      console.log("click");
      chrome.runtime.sendMessage({ action: "openPopup" });
      chrome.runtime.sendMessage({ city: city });
      cityStored = cityName;
      console.log("city", city);
    });
  });

// send the listCity to script.js to display it in the popup
// if script.js ask for the listCity, send it
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getCity") {
    console.log("getCity");
    console.log("city", cityStored);
    chrome.runtime.sendMessage({ city: cityStored });
  }
});

function getListCity() {
  var city = null;
  document
    .querySelectorAll(".resadescriptif div:nth-child(2)")
    .forEach(function (element) {
      var rest = element.innerText.split("\n").slice(1).join("<br>");
      var cityName = element.innerText.split("\n")[0];

      // replace the city name by a button to display the map
      element.innerHTML = "<button >" + cityName + "</button><br>" + rest;
      element.querySelector("button").addEventListener("click", function () {
        console.log("click");
        chrome.runtime.sendMessage({ action: "openPopup" });
        chrome.runtime.sendMessage({ city: city });
        cityStored = cityName;
        console.log("city", city);
      });
    });
}

// Observer to detect when new elements are added to the DOM
window.addEventListener("scroll", function () {
  getListCity();
});
