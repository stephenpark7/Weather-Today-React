import React from "react"; //, { useEffect, useState } 
import { importAll, getIconInd, formatTemp } from "../middleware/middleware";
const Images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

function Header({ city, data }) {

  return (
    <div className="container">
      <div className="header-container">
        <span className="value">{city ? city : "..."}</span>
        <span className="city-desc value">{data ? data.weather[0].main : "..."}</span>
        <div className="weather-img-div">
          <img className="weather-img" src={data ? Images[getIconInd(data.weather[0].icon)] : Images[0]} alt="weather-img" />
          <span className="weather-temp value">{data ? formatTemp(data.main.temp) : "..."}</span>
        </div>
      </div>
    </div>
  )
}

export default Header;