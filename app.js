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
  let response = await fetch(`https://api.ipapi.is?q=${ip}&key=06c1d11f0bf13b71`);
  let data = await response.json();
  console.log(data);
  if (data.error) {
    alert("Please enter valid IP address");
    inputEl.value = "";
  } else {
    appendInDOM(data);
  }
}

function appendInDOM(data) {
  ipEl.innerHTML = data.ip;
  inputEl.value = data.ip;
  loactionEl.innerHTML = `${data.location.country_code}, ${data.location.city}`;
  timeEl.innerHTML = data.location.timezone;
  ispEl.innerHTML = data.asn.org;
  showMap(data.location.latitude, data.location.longitude);
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
