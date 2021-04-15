import React, { CSSProperties } from "react";

import GameMap from "./core/game-map";
import SnakeGame from "./core/main";
import { GameStatusEnum } from "./core/types";
import GameController from "./controller";
import StatusControlButton from "./components/StatusControlButton";
import GameBoard from "./components/GameBoard";

/** 贪吃蛇 */
export default class SnakeGameView extends React.Component {
  private snakeGame: SnakeGame;
  private controller: GameController;

  public state!: {
    gameMap: GameMap;
  };

  constructor(data: never) {
    super(data);

    this.snakeGame = new SnakeGame().init();
    this.controller = new GameController({ snakeGame: this.snakeGame }).init();

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
          <StatusControlButton snakeGame={this.snakeGame} />
        </div>
        <div style={{ height: "24px" }}></div>
        <div>
          <GameBoard gameMap={this.state.gameMap} />
        </div>
      </div>
    );
  }
}
