import React from "react";
import ReactDOM from "react-dom";
import SnakeGameView from "./SnakeGameView/index";
import "antd/dist/antd.css";

import "./libs/game/snake-game";

ReactDOM.render(
  <React.StrictMode>
    <SnakeGameView />
  </React.StrictMode>,
  document.getElementById("root")
);
