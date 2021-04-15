import Food from "./food";
import GameMap from "./game-map";
import Snake from "./snake";
import { Direction, GameStatusEnum } from "./types";
/** 贪吃蛇游戏主体 */
export default class SnakeGame {
  /** 地图 */
  public gameMap = new GameMap();
  /** 蛇 */
  public snake = new Snake();
  /** 食物 */
  public food = new Food();

  /** 计时器 */
  private timer: NodeJS.Timeout | null = null;
  /** 计时器间隔 */
  private interval = 100;
  /** 状态 */
  private _status = GameStatusEnum.Pause;

  /** 状态 */
  public set status(status: GameStatusEnum) {
    this._status = status;
    if (this.onStatusChanged) this.onStatusChanged(this._status);
  }

  /** 状态 */
  public get status() {
    return this._status;
  }

  /** 单帧运行后的钩子函数 */
  onFrame: { (): void } | null = null;
  /** 状态变更后的钩子函数 */
  onStatusChanged: { (status: GameStatusEnum): void } | null = null;

  /** 初始化游戏 */
  init = () => {
    const { gameMap, snake, food } = this;
    snake.setPositions([
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ]);
    snake.direction = Direction.Right
    gameMap.set({ snake });
    food.create(gameMap);
    gameMap.set({ food });
    return this;
  };

  /** 开始游戏 */
  start = () => {
    this.setTimer();
    this.status = GameStatusEnum.Running;
    return this;
  };
  /** 暂停游戏 */
  pause = () => {
    this.clearTimer();
    this.status = GameStatusEnum.Pause;
    return this;
  };
  /** 结束游戏 */
  over = () => {
    this.clearTimer();
    this.status = GameStatusEnum.Over;
    return;
  };

  /** 设置计时器 */
  setTimer = () => {
    this.timer = setInterval(() => {
      this.runFrame();
      if (this.onFrame) this.onFrame();
    }, this.interval);
    return this;
  };

  /** 清除计时器 */
  clearTimer = () => {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    return this;
  };

  /** 单帧运行 */
  runFrame = () => {
    const { snake, food, gameMap } = this;
    snake.move();

    if (this.isSnakeRunOut() || this.isSnakeRunIntoSelf()) {
      this.over();
    } else {
      gameMap.clear();
      gameMap.set({ snake, food });

      if (this.isSnakeRunIntoFood()) {
        snake.lengthen();
        food.create(gameMap);
      }
    }

    return this;
  };

  /** 蛇是否出界 */
  isSnakeRunOut = () => {
    const [x, y] = this.snake.positions[0];
    const max = this.gameMap.maxLength;
    return x >= max || y >= max || x < 0 || y < 0;
  };
  /** 蛇是否与自身碰撞 */
  isSnakeRunIntoSelf = () => {
    const [sx, sy] = this.snake.positions[0];
    return !!this.snake.positions.find(
      ([x, y], index) => index !== 0 && x === sx && y === sy
    );
  };
  /** 蛇是否吃到食物 */
  isSnakeRunIntoFood = () => {
    if (this.food.position) {
      const [fx, fy] = this.food.position;
      return !!this.snake.positions.find(([x, y]) => x === fx && y === fy);
    } else {
      return false;
    }
  };
}
