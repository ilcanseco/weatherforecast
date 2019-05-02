import React, { Component } from "react";

function DayForecast(props) {
  return (
    <div>
      <p>{props.day}</p>
      <img src={props.image} />
      <p>
        {props.tempHi} {props.tempLo}
      </p>
    </div>
  );
}

export default DayForecast;
