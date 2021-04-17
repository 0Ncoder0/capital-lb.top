/** 坐标 */
export type Position = [x: number, y: number];

/** 物体 */
export enum ItemEnum {
  /** 蛇身 */
  SnakeBody = "SnakeBody",
  /** 蛇头 */
  SnakeHead = "SnakeHead",
  /** 食物 */
  Food = "Food",
  /** 空白 */
  Space = "Space"
}

/** 蛇移动的方向 */
export enum Direction {
  /** 左移 */
  Left = "Left",
  /** 右移 */
  Right = "Right",
  /** 上移 */
  Top = "Top",
  /** 下移 */
  Bottom = "Bottom"
}

/** 游戏状态 */
export enum GameStatusEnum {
  /** 运行中 */
  Running = "Running",
  /** 暂停 */
  Pause = "Pause",
  /** 结束 */
  Over = "Over"
}

/** 事件列表 */
export interface EventMap {
  /** 游戏初始化时 */
  "game-init": {};
  /** 修改速度后 */
  "change-speed": { speed: number };
  /** 修改状态后 */
  "change-status": { status: GameStatusEnum };
  /** 游戏结束 */
  "game-over": {};
  /** 单帧计算后 */
  frame: { gameMap: ItemEnum[][] };
}

/** 单帧的游戏状态 */
export interface FrameState {
  /** 版本 */
  version: string;
  /** 蛇身状态 */
  snake: {
    positions: Position[];
    direction: Direction;
  };
  /** 食物状态 */
  food: {
    position: Position | null;
  };
}
