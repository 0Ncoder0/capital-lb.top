import React from "react";
import { InputNumber } from "antd";

import SnakeGame from "../core/main";

export default class SpeedController extends React.Component {
  public props!: { snakeGame: SnakeGame };

  componentDidMount() {
    this.props.snakeGame.onIntervalChanged = () => this.setState({});
  }

  render() {
    const snakeGame = this.props.snakeGame;
    return (
      <InputNumber
        value={210 - snakeGame.interval}
        max={200}
        min={10}
        step={10}
        onChange={value => (snakeGame.interval = 210 - +value)}
      ></InputNumber>
    );
  }
}
