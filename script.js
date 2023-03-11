chrome.tabs.query({ active: true }, function (tabs) {
  loader.style.display = "flex";
  chrome.tabs.sendMessage(tabs[0].id, { action: "getCity" });
});
loader.style.display = "flex";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.city) {
    fetch(
      "https://nominatim.openstreetmap.org/search?format=json&q=" + request.city
    )
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none";
        if (data.length > 0) {
          var cityR = data[0];
          var latlng = [parseFloat(cityR.lat), parseFloat(cityR.lon)];
          console.log(request.city, latlng);
          listCityP.innerHTML += request.city + "<br>";
          L.marker(latlng).addTo(map).bindPopup(request.city);
        }
      })
      .catch((error) => console.log(error));
  }
});
var center = [48.8566, 2.3522];
var map = L.map("mapid").setView(center, 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);
