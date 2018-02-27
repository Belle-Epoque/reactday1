import React from "react";
import CountDown from "./CountDown";

const CountDownContainer = () => (
  <div className="count-down">
    <h1>Countdown</h1>
    <CountDown eventTime="25-02-2018 23:51" />
  </div>
);

export default CountDownContainer;
