import axios from "axios";

export function fetchGeolocation() {
  return new Promise((resolve, reject) => {
    axios.get("/geoloc")
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
      axios.get("/reverse?lat=" + data.latitude + "&lon=" + data.longitude)
      .then(res => {
        const newData = { city: res.data.city, latitude: data.latitude, longitude: data.longitude };
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