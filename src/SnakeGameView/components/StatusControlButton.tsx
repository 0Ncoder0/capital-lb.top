import React from "react";
import { Button } from "antd";

import SnakeGame from "../core/main";
import { GameStatusEnum } from "../core/types";

/** 游戏进行状态控制按钮 */
export default class StatusControlButton extends React.Component {
  props!: { snakeGame: SnakeGame };

  private PauseBtn = () => (
    <Button danger={true} type="primary" onClick={() => this.props.snakeGame.pause()}>
      暂停
    </Button>
  );

  private StartBtn = () => (
    <Button type="primary" onClick={() => this.props.snakeGame.start()}>
      开始
    </Button>
  );

  private RestartBtn = () => (
    <Button type="primary" onClick={() => this.props.snakeGame.init().start()}>
      重新开始
    </Button>
  );

  /** 状态 => 按钮 */
  private status2button = new Map([
    [GameStatusEnum.Running, <this.PauseBtn />],
    [GameStatusEnum.Pause, <this.StartBtn />],
    [GameStatusEnum.Over, <this.RestartBtn />]
  ]);

  private Btn = () => this.status2button.get(this.props.snakeGame.status) || <></>;
  render() {
    return <this.Btn />;
  }
}
