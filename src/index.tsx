import "./index.styl";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Game } from "./components/Game";

const gameComponent = (
  <Game name="Render Loop Experiment" />
);

ReactDOM.render(gameComponent, document.getElementById("container"));
