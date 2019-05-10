import React from "react";
import HourForecast from "./HourForecast";

//Parse the data to get only the forecast for the particular day
function dailyForecast(props) {
  //Getting the day
  const forecastAllData = props.location.state.allData;
  const currentDayTxt = props.location.state.day.dayTxt;
  const currentDateSplit = currentDayTxt.split(" ");
  const currentDate = currentDateSplit[0];

  //building particular day array
  const dayData = [];

  //Mapping through forecastAllData
  forecastAllData.map(forecast => {
    let dayDateSplit = forecast.dt_txt.split(" ");
    let dayDate = dayDateSplit[0];

    // If the dayDate and the currentDate match, then push the forecastAllData[index] to the dayData array
    if (dayDate === currentDate) {
      dayData.push(forecast);
    }
  });

  return (
    <>
      <div>
        {dayData.map(forecast => (
          <HourForecast
            key={forecast.dt}
            day={forecast.dt}
            weather={forecast.weather[0].main}
            tempHi={forecast.main.temp_max}
            tempLo={forecast.main.temp_min}
          />
        ))}
      </div>
    </>
  );
}

export default dailyForecast;
