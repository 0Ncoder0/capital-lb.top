import Food from "./Food";
import GameMap from "./GameMap";
import Snake from "./Snake";
import EventManager from "./util/EventManager";
import FrameRunner from "./FrameRunner";
import StateController from "./StateController";
import History from "./History";
import { Direction, EventMap } from "./types";

/** 贪吃蛇游戏主体 */
export default class SnakeGame {
  static readonly version = "v1";

  /** 事件管理工具 */
  private eventManager = new EventManager<EventMap>();
  /** 监听事件方法 */
  public on = this.eventManager.addEventListener;

  /** 地图 */
  public gameMap = new GameMap();
  /** 蛇 */
  public snake = new Snake();
  /** 食物 */
  public food = new Food();

  /** 单帧运算 */
  private frameRunner = new FrameRunner({
    snake: this.snake,
    food: this.food,
    gameMap: this.gameMap,
    eventManager: this.eventManager
  });

  /** 历史记录 */
  private history = new History({
    snake: this.snake,
    food: this.food,
    eventManager: this.eventManager
  });

  private stateController = new StateController({ frameRunner: this.frameRunner, eventManager: this.eventManager });

  public setStatus = this.stateController.setStatus;
  public getStatus = this.stateController.getStatus;
  public setSpeed = this.stateController.setSpeed;
  public getSpeed = this.stateController.getSpeed;
  public start = this.stateController.start;
  public pause = this.stateController.pause;
  public over = this.stateController.over;

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
    this.eventManager.emit("game-init", {});
    return this;
  };
}
