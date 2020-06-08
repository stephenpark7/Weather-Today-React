export function importAll(r) {
  return r.keys().map(r);
}

export function getIconInd(icon) {
  const icons = [
    "01d", "01n", "02d", "02n", "03d", "03n", 
    "04d", "04n", "09d", "09n", "10d", "10n", 
    "11d", "11n", "13d", "13n", "50d", "50n",
  ];
  return icons.findIndex(element => element === icon);
}

export function formatTemp(temp) {
  return Math.round(temp) + "°C";
}

export function formatWindSpeed(windSpeed) {
  return Math.round((windSpeed * 18) / 5) + " km/h";
}

export function formatTime(epoch) {
  let dt, hrs, mins, isPM = false;
  dt = new Date(epoch * 1000);
  hrs = dt.getHours();
  mins = dt.getMinutes();

  if (hrs >= 12 && hrs < 24) {
    isPM = true;
  }
  hrs = (hrs % 12) || 12;
  mins = "0" + mins;

  return hrs + ":" + mins.substr(-2) + (isPM ? " PM" : " AM");
}