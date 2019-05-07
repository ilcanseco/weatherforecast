import React from "react";
import { convertKelvinToCelcius, indexToDay } from "./Utils";
import hourlyForecast from "./hourlyForecast";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import placeholder from "./images/feelsbadman.png";
import clear from "./images/weather_clear.jpg";
import clearNight from "./images/weather_clear_night.jpg";
import fewClouds from "./images/weather_few_clouds.jpg";
import fewCloudsNight from "./images/weather_few_clouds_night.jpg";
import overcast from "./images/weather_overcast.jpg";
import severeAlert from "./images/weather_severe_alert.jpg";
import scatteredShowers from "./images/weather_showers_scattered.jpg";
import showers from "./images/weather_showers.jpg";
import snow from "./images/weather_snow.jpg";
import storm from "./images/weather_storm.jpg";

function DayForecast(props) {
  var image = placeholder;
  switch (props.weather) {
    case "Clear":
      image = clear;
      break;
    case "clearNight":
      image = clearNight;
      break;
    case "Clouds":
      image = fewClouds;
      break;
    case "fewCloudsNight":
      image = fewCloudsNight;
      break;
    case "overcast":
      image = overcast;
      break;
    case "severeAlert":
      image = severeAlert;
      break;
    case "scatteredShowers":
      image = scatteredShowers;
      break;
    case "Rain":
      image = showers;
      break;
    case "Snow":
      image = snow;
      break;
    case "storm":
      image = storm;
      break;
    default:
      image = placeholder;
      break;
  }

  return (
    <Router>
      <Link
        className="link"
        to={{ pathname: "/hourlyForecast", state: { day: props.key } }}
      >
        <div className="day-forecast">
          <p>{indexToDay(props.day)}</p>
          <img src={image} alt={props.weather} />
          <p>
            <strong>{convertKelvinToCelcius(props.tempHi)}</strong>{" "}
            {convertKelvinToCelcius(props.tempLo)}
          </p>
        </div>
      </Link>
      <Route path="/hourlyForecast" component={hourlyForecast} />
    </Router>
  );
}

export default DayForecast;
