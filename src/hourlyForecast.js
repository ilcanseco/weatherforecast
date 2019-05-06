import React, { Component } from "react";
import moment from "moment";

class hourlyForecast extends Component {
  constructor() {
    super();
    this.state = {
      allForecastData: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    // API call to get weather again
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast/?id=6087824&APPID=ef2c0ffcf44ef6ac7f9c1c6202cbc928"
    );
    const data = await response.json();

    const allForecastData = data.list;
    // Getting the Date
    const currentDayOfTheYear = moment().format("dddd, MMMM Do YYYY");
    const unixTimeStamp = allForecastData[0].dt;
    let currentDateIndex = moment
      .unix(unixTimeStamp)
      .format("dddd, MMMM Do YYYY");
    console.log(currentDayOfTheYear);
    console.log(allForecastData);
    console.log(currentDateIndex);
    // console.log(props.day);
  }

  parseData() {}

  render() {
    return (
      <div>
        <p>Placeholder</p>
      </div>
    );
  }
}

export default hourlyForecast;
