import React from "react";
import { formatTemp, formatWindSpeed, formatTime } from "../middleware/middleware";

function Body({ data }) {

  let dataValues;
  let children = [];

  if (data) {
    dataValues = [
      ["Feels Like", data.main.feels_like, formatTemp(data.main.feels_like)],
      ["Wind Speed", data.wind.speed, formatWindSpeed(data.wind.speed)],
      ["Humidity", data.main.humidity, (data.main.humidity) + "%"],
      ["Visibility", data.visibility, Math.round((data.visibility) / 1000) + " km"],
      ["Sunrise", data.sys.sunrise, formatTime(data.sys.sunrise)],
      ["Sunset", data.sys.sunset, formatTime(data.sys.sunset)],
    ];
    children["A"] = dataValues.map(val => {
      return <span className="label" key={"ColA " + val[0]}>{val[0]}</span>
    });
    children["B"] = dataValues.map(val => {
      return <span className="value" key={"ColB " + val[0]}>{val[1] ? val[2] : "N/A"}</span>
    });
  }

  return (
    <div className="container">
      <div className="body-container">
        <div className="row">
          <div className="col-5 offset-1 col-A">
            {children["A"]}
          </div>
          <div className="col-5 col-B">
            {children["B"]}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Body;