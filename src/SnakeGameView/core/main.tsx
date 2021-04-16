import Food from "./food";
import GameMap from "./game-map";
import Snake from "./snake";
import EventManager from "../util/event-manager";
import { Direction, GameStatusEnum } from "./types";

/** 事件列表 */
interface EventMap {
  /** 修改速度后 */
  "change-speed": { speed: number };
  /** 修改状态后 */
  "change-status": { status: GameStatusEnum };
  /** 单帧计算后 */
  frame: { gameMap: GameMap };
}

/** 贪吃蛇游戏主体 */
export default class SnakeGame {
  /** 最大刷新率 */
  static readonly maxInterval = 200;

  /** 计时器 */
  private timer: NodeJS.Timeout | null = null;
  /** 计时器间隔 */
  private interval = 100;
  /** 状态 */
  private status = GameStatusEnum.Pause;

  /** 事件管理工具 */
  private eventManager = new EventManager<EventMap>();
  /** 触发事件方法 */
  private emit = this.eventManager.emit;
  /** 监听事件方法 */
  public on = this.eventManager.addEventListener;

  /** 地图 */
  public gameMap = new GameMap();
  /** 蛇 */
  public snake = new Snake();
  /** 食物 */
  public food = new Food();

  /** 状态 */
  public setStatus = (status: GameStatusEnum) => {
    this.status = status;
    this.emit("change-status", { status });
    return this;
  };
  /** 状态 */
  public getStatus = () => {
    return this.status;
  };

  /** 设置速度，百分比 */
  public setSpeed = (speed: number) => {
    const { maxInterval } = SnakeGame;
    this.interval = ((100 - speed) / 100) * maxInterval;
    this.emit("change-speed", { speed });
    return this;
  };

  /** 设置速度，百分比 */
  public getSpeed = () => {
    const { maxInterval } = SnakeGame;
    return 100 - (this.interval / maxInterval) * 100;
  };

  /** 开始游戏 */
  public start = () => {
    this.setStatus(GameStatusEnum.Running);
    this.setTimer();
    return this;
  };
  /** 暂停游戏 */
  public pause = () => {
    this.setStatus(GameStatusEnum.Pause);
    this.clearTimer();
    return this;
  };
  /** 结束游戏 */
  public over = () => {
    this.setStatus(GameStatusEnum.Over);
    this.clearTimer();
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
    if (this.status === GameStatusEnum.Running) {
      this.timer = setTimeout(() => this.runFrame().setTimer(), this.interval);
    }
    return this;
  };

  /** 清除计时器 */
  private clearTimer = () => {
    if (this.timer) clearTimeout(this.timer);
  };

  /** 单帧运行 */
  private runFrame = () => {
    const { snake, food, gameMap } = this;
    snake.move();

    if (this.getIsSnakeRunOut() || this.getIsSnakeRunIntoSelf()) {
      this.over();
    } else {
      gameMap.clear();
      gameMap.set({ snake, food });

      if (this.getIsSnakeRunIntoFood()) {
        snake.lengthen();
        food.create(gameMap);
      }
    }
    this.emit("frame", { gameMap });
    return this;
  };

  /** 蛇是否出界 */
  private getIsSnakeRunOut = () => {
    const [x, y] = this.snake.positions[0];
    const max = this.gameMap.maxLength;
    return x >= max || y >= max || x < 0 || y < 0;
  };
  /** 蛇是否与自身碰撞 */
  private getIsSnakeRunIntoSelf = () => {
    const [sx, sy] = this.snake.positions[0];
    return !!this.snake.positions.find(([x, y], index) => index !== 0 && x === sx && y === sy);
  };
  /** 蛇是否吃到食物 */
  private getIsSnakeRunIntoFood = () => {
    if (this.food.position) {
      const [fx, fy] = this.food.position;
      return !!this.snake.positions.find(([x, y]) => x === fx && y === fy);
    } else {
      return false;
    }
  };
}
