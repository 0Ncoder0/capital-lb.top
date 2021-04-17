import { Button } from "antd";

import { GameStatusEnum } from "../core/types";

type StatusControllerProps = {
  status: GameStatusEnum;
  pause: { (): void };
  restart: { (): void };
  start: { (): void };
};

/** 游戏进行状态控制按钮 */
export const StatusController = ({ status, pause, start, restart }: StatusControllerProps) => {
  const { Running, Pause, Over } = GameStatusEnum;
  switch (status) {
    case Running: {
      return (
        <Button onClick={pause} type="primary" danger={true}>
          暂停
        </Button>
      );
    }
    case Pause: {
      return (
        <Button onClick={start} type="primary">
          开始
        </Button>
      );
    }
    case Over: {
      return (
        <Button onClick={restart} type="primary">
          重新开始
        </Button>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default StatusController;
