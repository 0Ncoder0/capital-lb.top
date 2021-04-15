import React from "react";
import { Button } from "antd";

import SnakeGame from "../core/main";
import { GameStatusEnum } from "../core/types";

const PauseBtn = (props: { snakeGame: SnakeGame }) => (
  <Button danger={true} type="primary" onClick={() => props.snakeGame.pause()}>
    暂停
  </Button>
);

const StartBtn = (props: { snakeGame: SnakeGame }) => (
  <Button type="primary" onClick={() => props.snakeGame.start()}>
    开始
  </Button>
);

const RestartBtn = (props: { snakeGame: SnakeGame }) => (
  <Button type="primary" onClick={() => props.snakeGame.init().start()}>
    重新开始
  </Button>
);

/** 状态 => 按钮 */
const status2button = new Map([
  [GameStatusEnum.Running, PauseBtn],
  [GameStatusEnum.Pause, StartBtn],
  [GameStatusEnum.Over, RestartBtn]
]);

/** 游戏进行状态控制按钮 */
export default class StatusController extends React.Component {
  public props!: { snakeGame: SnakeGame };

  render() {
    const snakeGame = this.props.snakeGame;
    const Btn = status2button.get(snakeGame.status);
    return Btn ? <Btn snakeGame={snakeGame} /> : <></>;
  }
}
