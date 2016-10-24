import "./index.styl";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Game } from "./components/Game";

const gameComponent = (
  <Game name="Teh Awesome Game" width="900" height="480" />
);

ReactDOM.render(gameComponent, document.getElementById("container"));
