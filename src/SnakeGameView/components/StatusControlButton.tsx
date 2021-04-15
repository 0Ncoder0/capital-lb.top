import React from "react";
import { Button } from "antd";

import SnakeGame from "../core/main";
import { GameStatusEnum } from "../core/types";

/** 游戏进行状态控制按钮 */
export default class StatusControlButton extends React.Component {
  props!: { snakeGame: SnakeGame; gameStatus: GameStatusEnum };

  private pauseBtn = () => (
    <Button danger={true} type="primary" onClick={() => this.props.snakeGame.pause()}>
      暂停
    </Button>
  );

  private startBtn = () => (
    <Button type="primary" onClick={() => this.props.snakeGame.start()}>
      开始
    </Button>
  );

  private restartBtn = () => (
    <Button type="primary" onClick={() => this.props.snakeGame.init().start()}>
      重新开始
    </Button>
  );

  /** 状态 => 按钮 */
  private status2button = new Map([
    [GameStatusEnum.Running, this.pauseBtn],
    [GameStatusEnum.Pause, this.startBtn],
    [GameStatusEnum.Over, this.restartBtn]
  ]);

  render() {
    return this.status2button.get(this.props.gameStatus)?.call(null) || <></>;
  }
}
