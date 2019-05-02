import React, { Component } from "react";
import DayForecast from "./DayForecast.js";

class WeatherForecast extends Component {
  constructor() {
    super();
    this.state = {
      day: "",
      weather: "",
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
        <DayForecast day="Wed" weather="clear" tempHi="16" tempLo="7" />
        <DayForecast day="Thu" weather="fewClouds" tempHi="10" tempLo="4" />
        <DayForecast day="Fri" weather="overcast" tempHi="8" tempLo="3" />
        <DayForecast day="Sat" weather="severeAlert" tempHi="2" tempLo="-2" />
        <DayForecast day="Sun" weather="showers" tempHi="5" tempLo="3" />
        <DayForecast
          day="Mon"
          weather="scatteredShowers"
          tempHi="12"
          tempLo="8"
        />
        <DayForecast day="Tues" weather="storm" tempHi="12" tempLo="5" />
        <DayForecast day="Wed" weather="storm" tempHi="10" tempLo="4" />
        <button onClick={this.handleRefresh}>Refresh</button>
      </div>
    );
  }
}

export default WeatherForecast;
