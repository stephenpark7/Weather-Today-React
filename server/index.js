const express = require("express");
const path = require("path");
const axios = require("axios");
const requestIp = require("request-ip");
const app = express();

const SERVER_PORT = process.env.PORT || 5000;
const PRODUCTION_MODE = process.env.NODE_ENV === "production";
let MY_IP; if (PRODUCTION_MODE) MY_IP = require("./config");

const WEATHERDATA_URL = "https://api.openweathermap.org/data/2.5/weather?";
const WEATHERDATA_APIKEY = "b3cc305bb205466c20e6b12d5aef231f";
const GEOLOCATION_URL = "http://api.ipstack.com/";
const GEOLOCATION_APIKEY = "?access_key=73d6e2ee2287f5d7e3bb2adfc83756c8";
const REVERSE_URL = "https://us1.locationiq.com/v1/reverse.php?key=1ace468b6ab00c";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/geoloc", (req, res, next) => {
  const clientIp = requestIp.getClientIp(req); 
  req.clientIp = clientIp;
  next();
});

if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/geoloc", (req, res) => {
  const ipAddress = PRODUCTION_MODE ? req.clientIp : MY_IP;
  axios.get(GEOLOCATION_URL + ipAddress + GEOLOCATION_APIKEY)
  .then(api_res => {
    const data = { city: api_res.data.city, latitude: api_res.data.latitude, longitude: api_res.data.longitude };
    res.status(200).json(data);
  })
  .catch(() => {
    res.status(400).json({message: "geolocation fetch failed"});
  });
});

app.get("/reverse", (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.lon;
  const url = REVERSE_URL + "&lat=" + latitude + "&lon=" + longitude + "&format=json";
  axios.get(url)
  .then(api_res => {
    const newData = { city: api_res.data.address.city, latitude: latitude, longitude: longitude };
    res.status(200).json(newData);
  })
  .catch(() => {
    res.status(400).json({ message: "reverse geolocation fetch failed" });
  });
});

app.get("/city/:id", (req, res) => {
  const city = req.params.id;
  if (city) {
    axios.get(WEATHERDATA_URL + "q=" + city + "&units=metric&appid=" + WEATHERDATA_APIKEY)
    .then(api_res => {
      const weatherData = api_res.data;
      res.status(200).json(weatherData);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
  }
  else {
    res.status(400).json({ message: "id missing" });
  }
});

app.get("/loc", (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.lon;
  if (latitude && longitude) {
    axios.get(WEATHERDATA_URL + "lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + WEATHERDATA_APIKEY)
    .then(api_res => {
      const weatherData = api_res.data;
      res.status(200).json(weatherData);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
  }
  else {
    res.status(400).json({ message: "parameters missing" });
  }
});

if (PRODUCTION_MODE) {
  app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.listen(SERVER_PORT, () => {
  if (!PRODUCTION_MODE)
    console.log("Server started at: " + SERVER_PORT);
});