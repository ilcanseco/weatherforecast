import React from "react";
import moment from "moment";

//Parse the data to get only the forecast for the particular day
function dailyForecast(props) {
  //Getting the day
  const forecastAllData = props.location.state.allData;
  const currentDayTxt = props.location.state.day.dayTxt;
  const currentDateSplit = currentDayTxt.split(" ");
  const currentDate = currentDateSplit[0];

  //building particular day array
  const dayData = [];
  let index = 0;

  //Mapping through forecastAllData
  forecastAllData.map(forecast => {
    let dayDateSplit = forecast.dt_txt.split(" ");
    let dayDate = dayDateSplit[0];

    // If the dayDate and the currentDate match, then push the forecastAllData[index] to the dayData array
    if (dayDate === currentDate) {
      dayData.push(forecastAllData[index]);
    }
    index++;
  });

  return (
    <>
      <div>
        <p>temp: {moment.unix(dayData[0].dt).calendar()}</p>
      </div>
    </>
  );
}

export default dailyForecast;
