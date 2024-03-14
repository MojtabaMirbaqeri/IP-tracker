const ipEl = document.querySelector("#ip-address");
const loactionEl = document.querySelector("#location");
const timeEl = document.querySelector("#time");
const ispEl = document.querySelector("#isp");

const inputEl = document.querySelector("#myip");
const trackBtnEl = document.querySelector("#track-button");

const loaderEl = document.querySelector(".loader-container");

async function getIP() {
  let response = await fetch("https://api.db-ip.com/v2/free/self");
  let data = await response.json();
  getIPInfo(data.ipAddress);
}
window.addEventListener("load", getIP);

async function getIPInfo(ip) {
  let response = await fetch(`http://ip-api.com/json/${ip}`);
  let data = await response.json();
  if (data.status != "fail") {
    appendInDOM(data);
  } else {
    alert("Please enter valid IP address");
    inputEl.value = "";
  }
}

function appendInDOM(data) {
  ipEl.innerHTML = data.query;
  inputEl.value = data.query;
  loactionEl.innerHTML = `${data.country}, ${data.regionName},<br> ${data.city}`;
  timeEl.innerHTML = data.timezone;
  ispEl.innerHTML = data.isp;
  showMap(data.lat, data.lon);
}

let map;
function showMap(lat, lon) {
  if (map) {
    map.remove();
  }
  map = L.map("map", { zoomControl: false }).setView([lat + 0.01, lon], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lon]).addTo(map).openPopup();
  loaderEl.classList.add("hide");
}

trackBtnEl.addEventListener("click", function () {
  getIPInfo(inputEl.value);
});
