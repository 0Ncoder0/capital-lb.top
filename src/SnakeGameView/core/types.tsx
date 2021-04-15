/** 坐标 */
export type Position = [x: number, y: number];

/** 物体 */
export enum ItemEnum {
  /** 蛇身 */
  SnakeBody = "SnakeBody",
  /** 食物 */
  Food = "Food",
  /** 空白 */
  Space = "Space",
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
  Bottom = "Bottom",
}

/** 游戏状态 */
export enum GameStatusEnum {
  /** 运行中 */
  Running = "Running",
  /** 暂停 */
  Pause = "Pause",
  /** 结束 */
  Over = "Over",
}
