import React from "react";
// import logo from './logo.svg';
import "./App.css";

import Header from "./Header.js";
import WeatherForecast from "./WeatherForecast.js";

function App() {
  return (
    <div className="App">
      <Header />
      <WeatherForecast />
    </div>
  );
}

export default App;
