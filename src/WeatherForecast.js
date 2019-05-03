import React, { Component } from "react";
import DayForecast from "./DayForecast.js";
import moment from "moment";
import { convertKelvinToCelcius } from "./Utils";

class WeatherForecast extends Component {
  constructor() {
    super();
    this.state = {
      dayForecasts: []
    };
  }

  async componentDidMount() {
    this.fetchWeatherData();
  }

  async fetchWeatherData() {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast/?id=6087824&APPID=ef2c0ffcf44ef6ac7f9c1c6202cbc928"
    );
    const data = await response.json();
    // example dayForecasts object: {"1": {tempHigh: 54, tempLow: 10}, "2": {tempHigh: 123, tempLow: 0}, ...}
    const dayForecasts = {};
    data.list.map(forecast => {
      // Seeing what day the forecast falls on
      const unixTimestamp = forecast.dt;
      const dayOfTheWeekIndex = moment.unix(unixTimestamp).day();

      // Seeing if I need to update the highest temp for this current day
      const temps = forecast.main;
      const tempHigh = temps.temp_max;
      const tempLow = temps.temp_min;

      // If the day key doesn't exist in dayForecasts, insert values without comparing
      if (!dayForecasts.hasOwnProperty(dayOfTheWeekIndex)) {
        const newDayForcast = {
          tempHigh: convertKelvinToCelcius(tempHigh),
          tempLow: convertKelvinToCelcius(tempLow),
          weather: forecast.weather[0].main
          // ADD MORE DATA!
        };
        dayForecasts[dayOfTheWeekIndex] = newDayForcast;
      }
      // if it does exist in dayForecasts, then compare the values of tempHigh and tempLow
      else {
        // updates tempHigh if its less than temp_max
        if (dayForecasts[dayOfTheWeekIndex].tempHigh < tempHigh) {
          dayForecasts[dayOfTheWeekIndex].tempHigh = convertKelvinToCelcius(
            tempHigh
          );
        }
        // updates tempLow if its greater than temp_min
        if (dayForecasts[dayOfTheWeekIndex].tempLow > tempLow) {
          dayForecasts[dayOfTheWeekIndex].tempLow = convertKelvinToCelcius(
            tempLow
          );
        }
      }
      return;
    });

    //Setting the state
    this.setState({ dayForecasts: dayForecasts });
  }

  handleRefresh = () => {
    document.location.reload(true);
  };

  render() {
    return (
      <div className="forecast">
        {}
        <DayForecast />

        <button onClick={this.handleRefresh}>Refresh</button>
      </div>
    );
  }
}

export default WeatherForecast;
