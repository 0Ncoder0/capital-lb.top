import Food from "./Food";
import GameMap from "./GameMap";
import Snake from "./Snake";
import { EventMap } from "./types";
import EventManager from "./util/EventManager";

/** 计算单帧运行结果 */
export default class FrameRunner {
  private snake: Snake;
  private food: Food;
  private gameMap: GameMap;
  private eventManager: EventManager<EventMap>;

  constructor(data: { snake: Snake; food: Food; gameMap: GameMap; eventManager: EventManager<EventMap> }) {
    this.snake = data.snake;
    this.food = data.food;
    this.gameMap = data.gameMap;
    this.eventManager = data.eventManager;
  }
  /** 单帧运行 */
  public run = () => {
    const { snake, food, gameMap } = this;
    snake.move();

    const isGameOver = this.getIsSnakeRunOut() || this.getIsSnakeRunIntoSelf();

    if (isGameOver) {
      this.eventManager.emit("game-over", {});
    } else {
      gameMap.clear();
      gameMap.set({ snake, food });
      if (this.getIsSnakeRunIntoFood()) {
        snake.lengthen();
        food.create(gameMap);
      }
    }

    this.eventManager.emit("frame", { gameMap });
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
