import React, { Component } from "react";
import DayForecast from "./DayForecast.js";
import moment from "moment";
import { convertKelvinToCelcius } from "./Utils";
import { indexToDay } from "./Utils";

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
    const dayForecasts = [];
    // Initializing dayOfTheWeekIndex and index
    const unixTimestamp = data.list[0].dt;
    let dayOfTheWeekIndex = moment.unix(unixTimestamp).day();
    let index = 0;

    //mapping through data.list and building dayForecast[]
    data.list.map(forecast => {
      //Getting the current day
      const currentDayUT = forecast.dt;
      const currentDayIndex = moment.unix(currentDayUT).day();

      // Seeing if I need to update the highest temp for this current day
      const temps = forecast.main;
      const tempHigh = temps.temp_max;
      const tempLow = temps.temp_min;

      //   If the day key doesn't exist in dayForecasts, insert values without comparing
      if (!dayForecasts[index]) {
        const newDayForcast = {
          day: currentDayIndex,
          tempHigh: convertKelvinToCelcius(tempHigh),
          tempLow: convertKelvinToCelcius(tempLow),
          weather: forecast.weather[0].main
        };
        dayForecasts[index] = newDayForcast;
      }
      //   if it does exist in dayForecasts, then compare the values of tempHigh and tempLow
      else {
        // updates index and currentDayIndex and then creates a newDayForecast object
        if (dayOfTheWeekIndex !== currentDayIndex) {
          index++;
          dayOfTheWeekIndex = currentDayIndex;
          const newDayForcast = {
            day: currentDayIndex,
            tempHigh: convertKelvinToCelcius(tempHigh),
            tempLow: convertKelvinToCelcius(tempLow),
            weather: forecast.weather[0].main
          };
          dayForecasts[index] = newDayForcast;
        }
        // updates tempHigh if its less than temp_max
        if (dayForecasts[index].tempHigh < tempHigh) {
          dayForecasts[index].tempHigh = convertKelvinToCelcius(tempHigh);
        }
        //   updates tempLow if its greater than temp_min
        if (dayForecasts[index].tempLow > tempLow) {
          dayForecasts[index].tempLow = convertKelvinToCelcius(tempLow);
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
        {this.state.dayForecasts.map(forecast => (
          <DayForecast
            key={forecast.day}
            day={indexToDay(forecast.day)}
            tempHi={forecast.tempHigh}
            tempLo={forecast.tempLow}
            weather={forecast.weather}
          />
        ))}

        <button onClick={this.handleRefresh}>Refresh</button>
      </div>
    );
  }
}

export default WeatherForecast;
