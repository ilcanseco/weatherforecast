import React, { Component } from "react";
import DayForecast from "./DayForecast.js";

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

class WeatherForecast extends Component {
  constructor() {
    super();
    this.state = {
      day: "",
      weather: "",
      image: placeholder,
      tempHi: "",
      tempLo: ""
    };
  }

  handleRefresh = () => {
    document.location.reload(true);
  };

  render() {
    return (
      <div className="forecast">
        <DayForecast day="Wed" image={clear} tempHi="16" tempLo="7" />
        <DayForecast day="Thu" image={fewClouds} tempHi="10" tempLo="4" />
        <DayForecast day="Fri" image={overcast} tempHi="8" tempLo="3" />
        <DayForecast day="Sat" image={severeAlert} tempHi="2" tempLo="-2" />
        <DayForecast day="Sun" image={showers} tempHi="5" tempLo="3" />
        <DayForecast
          day="Mon"
          image={scatteredShowers}
          tempHi="12"
          tempLo="8"
        />
        <DayForecast day="Tues" image={storm} tempHi="12" tempLo="5" />
        <DayForecast day="Wed" image={storm} tempHi="10" tempLo="4" />
        <button onClick={this.handleRefresh}>Refresh</button>
      </div>
    );
  }
}

export default WeatherForecast;
