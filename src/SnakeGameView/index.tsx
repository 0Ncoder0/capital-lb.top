import React, { CSSProperties } from "react";

import { GameStatusEnum } from "./core/types";
import GameMap from "./core/game-map";
import SnakeGame from "./core/main";

import GameBoard from "./components/game-board";
import EventListener from "./event-listener/index";
import StatusController from "./components/status-controller";
import SpeedController from "./components/speed-controller";

/** 贪吃蛇 */
export default class SnakeGameView extends React.Component {
  private snakeGame: SnakeGame;
  private eventListener: EventListener;

  public state!: {
    gameMap: GameMap;
  };

  constructor(data: never) {
    super(data);

    this.snakeGame = new SnakeGame().init();
    this.eventListener = new EventListener({ snakeGame: this.snakeGame }).init();

    this.state = {
      gameMap: this.snakeGame.gameMap
    };

    this.snakeGame.onFrame = () => this.setState({ gameMap: this.snakeGame.gameMap });

    this.snakeGame.onStatusChanged = status => {
      if (status === GameStatusEnum.Over) {
        window.alert("Game Over");
      }
      this.setState({});
    };
  }

  /** 渲染行 */
  render() {
    const actionRowStyle = (): CSSProperties => ({
      display: "flex",
      width: "400px",
      marginLeft: "auto",
      marginRight: "auto"
    });
    const containerStyle = (): CSSProperties => ({
      paddingTop: (window.innerHeight - (400 + 32 + 24)) / 3 + "px"
    });

    return (
      <div style={containerStyle()}>
        <div style={actionRowStyle()}>
          <StatusController snakeGame={this.snakeGame} />
          <SpeedController snakeGame={this.snakeGame} />
        </div>
        <div style={{ height: "24px" }}></div>
        <div>
          <GameBoard gameMap={this.state.gameMap} />
        </div>
      </div>
    );
  }
}
