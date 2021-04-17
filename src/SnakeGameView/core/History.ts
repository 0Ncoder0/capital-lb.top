import Food from "./Food";
import SnakeGame from "./Main";
import Snake from "./Snake";
import { FrameState, EventMap } from "./types";
import EventManager from "./util/EventManager";
import Recorder from "./util/Recorder";

/** 游玩历史记录 */
export default class History {
  /** 记录工具 */
  private recorder = new Recorder<FrameState[]>();
  /** 历史帧列表 */
  private frames: FrameState[] = [];
  /** 当前帧下标 */
  private currentFrameIndex = -1;

  private snake: Snake;
  private food: Food;
  private eventManager: EventManager<EventMap>;

  constructor(data: { snake: Snake; food: Food; eventManager: EventManager<EventMap> }) {
    this.snake = data.snake;
    this.food = data.food;
    this.eventManager = data.eventManager;

    this.eventManager.addEventListener("frame", this.recordFrame);
    this.eventManager.addEventListener("game-over", () => this.recorder.set(this.frames));
    this.eventManager.addEventListener("game-init", () => {
      this.currentFrameIndex = 0;
      this.frames = [];
    });
  }

  /** 记录当前帧 */
  private recordFrame = () => {
    const { snake, food } = this;
    const frame: FrameState = {
      version: SnakeGame.version,
      snake: { positions: snake.positions, direction: snake.direction },
      food: { position: food.position }
    };
    this.frames.push(JSON.parse(JSON.stringify(frame)));
    this.currentFrameIndex++;
  };
}
