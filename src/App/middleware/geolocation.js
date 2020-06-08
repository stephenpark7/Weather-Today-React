import axios from "axios";

const GEOLOCATION_URL = "https://api.ipgeolocation.io/ipgeo?apiKey=1531619570aa43a49de0298f9156153c";
const REVERSE_URL = "https://us1.locationiq.com/v1/reverse.php?key=1ace468b6ab00c";

export function fetchGeolocation() {
  return new Promise((resolve, reject) => {
    axios.get(GEOLOCATION_URL)
    .then(res => {
      const data = { city: res.data.city, latitude: res.data.latitude, longitude: res.data.longitude };
      resolve(data);
    })
    .catch(() => {
      reject({message: "geolocation fetch failed"});
    });
  });
}

export function browserGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const data = { latitude: pos.coords.latitude.toFixed(2), longitude: pos.coords.longitude.toFixed(2) };
        reverseGeolocation(data)
        .then(newData => {
          resolve(newData);        
        })
        .catch(err => {
          reject(err);
        })
      }, err => {
        reject({ message: err.message });
      });
    }
    else {
      reject({ message: "browser does not support geolocation" });
    }
  });
}

export function reverseGeolocation(data) {
  return new Promise((resolve, reject) => {
    if (data) {
      const url = REVERSE_URL + "&lat=" + data.latitude + "&lon=" + data.longitude + "&format=json";
      axios.get(url)
      .then(res => {
        const newData = { city: res.data.address.city, latitude: data.latitude, longitude: data.longitude };
        resolve(newData);
      })
      .catch(() => {
        reject({ message: "reverse geolocation fetch failed" });
      });
    }
    else {
      reject({ message: "missing arguments" })
    }
  });
}