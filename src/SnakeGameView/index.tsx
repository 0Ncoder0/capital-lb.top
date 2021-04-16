import React, { CSSProperties } from "react";
import { message, notification, Tooltip } from "antd";

import { GameStatusEnum } from "./core/types";
import SnakeGame from "./core/main";

import EventListener from "./event-listener/index";

import GameBoard from "./components/game-board";
import StatusController from "./components/status-controller";
import SpeedController from "./components/speed-controller";

/** 贪吃蛇 */
export default class SnakeGameView extends React.Component {
  private snakeGame = new SnakeGame().init();
  private eventListener = new EventListener({ snakeGame: this.snakeGame }).init();

  componentDidMount = () => {
    this.snakeGame.on("change-speed", () => this.forceUpdate());
    this.snakeGame.on("change-status", () => this.forceUpdate());
    this.snakeGame.on("frame", () => this.forceUpdate());

    this.snakeGame.on("change-status", event => {
      if (event.status === GameStatusEnum.Over) {
        message.error("Game Over !");
      }
    });

    notification.info({
      message: "操作说明",
      description: (
        <div>
          <div style={{ height: "12px" }}></div>
          <div>空格键 : 开始 / 暂停 / 重新开始</div>
          <div style={{ height: "12px" }}></div>
          <div>W ↑ / S ↓ / A ← / D → : 控制方向</div>
          <div style={{ height: "12px" }}></div>
          <div>- / +: 调整速度</div>
        </div>
      ),
      duration: 10
    });
  };

  private actionRowStyle = (): CSSProperties => ({
    display: "flex",
    width: "400px",
    marginLeft: "auto",
    marginRight: "auto"
  });
  private containerStyle = (): CSSProperties => ({
    paddingTop: (window.innerHeight - (400 + 32 + 24)) / 3 + "px"
  });

  /** 渲染行 */
  render() {
    const { gameMap, getStatus, getSpeed, setSpeed, pause, start, init } = this.snakeGame;
    const restart = () => init().start();
    const status = getStatus();
    const speed = getSpeed();
    return (
      <div style={this.containerStyle()}>
        <div style={this.actionRowStyle()}>
          <div style={{ width: "120px" }}>
            <StatusController status={status} pause={pause} start={start} restart={restart} />
          </div>
          <Tooltip title="速度" color="blue">
            <span>
              <SpeedController speed={speed} setSpeed={setSpeed} />
            </span>
          </Tooltip>
        </div>
        <div style={{ height: "24px" }}></div>
        <div>
          <GameBoard gameMap={gameMap} />
        </div>
      </div>
    );
  }
}
