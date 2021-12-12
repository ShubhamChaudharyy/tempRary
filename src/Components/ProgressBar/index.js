import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import "./App.css";

const App = ({
  progressSoFar
}) => {
  return (
    <ProgressBar width={progressSoFar} />
  );
};

export default App;
