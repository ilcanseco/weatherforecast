import React, { Component } from "react";
import DayForecast from "./DayForecast.js";
import moment from "moment";
import { handleRefresh } from "./Utils";

class WeatherForecast extends Component {
  constructor() {
    super();
    this.state = {
      allForecastData: [],
      dayForecasts: [],
      isLoading: false
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
    const allForecastData = data.list;
    // example dayForecasts object: {"1": {tempHigh: 54, tempLow: 10}, "2": {tempHigh: 123, tempLow: 0}, ...}
    const dayForecasts = [];
    // Initializing dayOfTheWeekIndex and index
    const unixTimestamp = data.list[0].dt;
    let dayOfTheWeekIndex = moment.unix(unixTimestamp).day();
    let index = 0;

    //mapping through data.list and building dayForecast[]
    allForecastData.map(forecast => {
      //Getting the current day
      const currentDayUT = forecast.dt;
      const currentDayTxt = forecast.dt_txt;
      const currentDayIndex = moment.unix(currentDayUT).day();

      // Seeing if I need to update the highest temp for this current day
      const temps = forecast.main;
      const tempHigh = temps.temp_max;
      const tempLow = temps.temp_min;

      //   If the day key doesn't exist in dayForecasts, insert values without comparing
      if (!dayForecasts[index]) {
        const newDayForcast = {
          day: currentDayIndex,
          dayTxt: currentDayTxt,
          tempHigh: tempHigh,
          tempLow: tempLow,
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
            dayTxt: currentDayTxt,
            tempHigh: tempHigh,
            tempLow: tempLow,
            weather: forecast.weather[0].main
          };
          dayForecasts[index] = newDayForcast;
        }
        // updates tempHigh if its less than temp_max
        if (dayForecasts[index].tempHigh < tempHigh) {
          dayForecasts[index].tempHigh = tempHigh;
        }
        //   updates tempLow if its greater than temp_min
        if (dayForecasts[index].tempLow > tempLow) {
          dayForecasts[index].tempLow = tempLow;
        }
      }
      return;
    });

    //Setting the state
    this.setState({
      dayForecasts: dayForecasts,
      isLoading: true,
      allForecastData: allForecastData
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <div className="forecast">
            {this.state.dayForecasts.map(forecast => (
              <DayForecast
                key={forecast.day}
                allData={this.state.allForecastData}
                day={forecast.day}
                dayTxt={forecast.dayTxt}
                tempHi={forecast.tempHigh}
                tempLo={forecast.tempLow}
                weather={forecast.weather}
              />
            ))}
          </div>
          <button onClick={handleRefresh}>Refresh</button>
        </>
      );
    } else {
      return (
        <h1 fontFamily="Futura" align-items="center">
          {" "}
          Loading...{" "}
        </h1>
      );
    }
  }
}

export default WeatherForecast;
