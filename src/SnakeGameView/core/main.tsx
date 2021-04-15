import Food from "./food";
import GameMap from "./game-map";
import Snake from "./snake";
import { Direction, GameStatusEnum } from "./types";
/** 贪吃蛇游戏主体 */
export default class SnakeGame {
  /** 计时器 */
  private timer: NodeJS.Timeout | null = null;
  /** 计时器间隔 */
  private interval = 100;
  /** 状态 */
  private _status = GameStatusEnum.Pause;

  /** 地图 */
  public gameMap = new GameMap();
  /** 蛇 */
  public snake = new Snake();
  /** 食物 */
  public food = new Food();

  /** 状态 */
  public set status(status: GameStatusEnum) {
    this._status = status;
    this.onStatusChanged && this.onStatusChanged(status);
  }

  /** 状态 */
  public get status() {
    return this._status;
  }

  /** 单帧运行后的钩子函数 */
  public onFrame: { (): void } | null = null;
  /** 状态变更后的钩子函数 */
  public onStatusChanged: { (status: GameStatusEnum): void } | null = null;

  /** 开始游戏 */
  public start = () => {
    this.setTimer();
    this.status = GameStatusEnum.Running;
    return this;
  };
  /** 暂停游戏 */
  public pause = () => {
    this.clearTimer();
    this.status = GameStatusEnum.Pause;
    return this;
  };
  /** 结束游戏 */
  public over = () => {
    this.clearTimer();
    this.status = GameStatusEnum.Over;
    return;
  };

  /** 初始化游戏 */
  public init = () => {
    const { gameMap, snake, food } = this;
    snake.setPositions([
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0]
    ]);
    snake.direction = Direction.Right;
    gameMap.set({ snake });
    food.create(gameMap);
    gameMap.set({ food });
    return this;
  };

  /** 设置计时器 */
  private setTimer = () => {
    this.timer = setTimeout(() => {
      this.runFrame();
      this.onFrame && this.onFrame();
      this.status === GameStatusEnum.Running && this.setTimer();
    }, this.interval);
    return this;
  };

  private clearTimer = () => {
    if (this.timer) clearTimeout(this.timer);
  };

  /** 单帧运行 */
  private runFrame = () => {
    const { snake, food, gameMap } = this;
    snake.move();

    if (this.isSnakeRunOut || this.isSnakeRunIntoSelf) {
      this.over();
    } else {
      gameMap.clear();
      gameMap.set({ snake, food });

      if (this.isSnakeRunIntoFood) {
        snake.lengthen();
        food.create(gameMap);
      }
    }

    return this;
  };

  /** 蛇是否出界 */
  get isSnakeRunOut() {
    const [x, y] = this.snake.positions[0];
    const max = this.gameMap.maxLength;
    return x >= max || y >= max || x < 0 || y < 0;
  }
  /** 蛇是否与自身碰撞 */
  get isSnakeRunIntoSelf() {
    const [sx, sy] = this.snake.positions[0];
    return !!this.snake.positions.find(([x, y], index) => index !== 0 && x === sx && y === sy);
  }
  /** 蛇是否吃到食物 */
  get isSnakeRunIntoFood() {
    if (this.food.position) {
      const [fx, fy] = this.food.position;
      return !!this.snake.positions.find(([x, y]) => x === fx && y === fy);
    } else {
      return false;
    }
  }
}
