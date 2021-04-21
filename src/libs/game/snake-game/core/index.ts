import { Direction, Position, SnakeItem, WallItem } from "./items";
import { Processer } from "./processer";

export * from "./items";
export * from "./processer";

interface Config {
  interval: number;

  mapSize: {
    height: number;
    width: number;
  };

  snake: {
    direction: Direction;
    positions: Position[];
  };

  wall: {
    positions: Position[];
  };
}

export class Core {
  public readonly config: Config;

  public readonly snake: SnakeItem;

  public readonly wall: WallItem;

  public readonly processer: Processer;

  constructor(config: Config) {
    this.config = JSON.parse(JSON.stringify(config));

    config = JSON.parse(JSON.stringify(this.config));

    this.snake = new SnakeItem({ ...config.snake, mapSize: config.mapSize });

    this.wall = new WallItem(config.wall);

    this.processer = new Processer({
      snake: this.snake,
      wall: this.wall,
      mapSize: config.mapSize,
      interval: config.interval
    });
  }

  public getSnake() {
    return this.snake;
  }
  public getProcesser() {
    return this.processer;
  }
  public getConfig() {
    return this.config;
  }
}
