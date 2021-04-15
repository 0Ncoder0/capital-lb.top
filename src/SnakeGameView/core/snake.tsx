import { Position, Direction } from "./types";

/** 蛇 */
export default class Snake {
  /** 身体下标组 */
  positions: Position[] = [];
  /** 移动方向 */
  direction = Direction.Right;

  /** 设置蛇身坐标 */
  setPositions = (positions: Position[]) => {
    this.positions = positions || [];
    return this;
  };

  /** 增长蛇身 */
  lengthen = () => {
    this.positions.push([...this.positions[this.positions.length - 1]]);
    return this;
  };

  /** 移动 */
  move = () => {
    if (!this.positions.length) return;
    const { Left, Right, Top, Bottom } = Direction;

    let [x, y] = this.positions[0];
    switch (this.direction) {
      case Left: {
        x--;
        break;
      }
      case Right: {
        x++;
        break;
      }
      case Top: {
        y--;
        break;
      }
      case Bottom: {
        y++;
        break;
      }
      default: {
        throw new Error("wrong direction " + this.direction);
      }
    }
    for (let i = this.positions.length - 1; i >= 1; i--) {
      this.positions[i] = [...this.positions[i - 1]];
    }
    this.positions[0] = [x, y];

    return this;
  };
}
