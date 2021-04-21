import { Core, Direction, Position } from "./core";
import { CoreProxy, SnakeProxy } from "./proxies";

export * from "./core";
export * from "./proxies";
export * from "./recorder";
export * from "./event-manager";

export class Config {
  interval = 100;
  intervalRange = {
    max: 200,
    min: 10
  };

  mapSize = {
    height: 20,
    width: 20
  };

  snake = {
    direction: Direction.Right,
    positions: [
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 }
    ] as Position[]
  };

  wall = {
    positions: [] as Position[]
  };
}

export class SnakeGame {
  public static readonly Config = Config;

  public readonly config: Config;

  public readonly core: Core;

  constructor(config: Config = new Config()) {
    this.config = JSON.parse(JSON.stringify(config));
    this.core = new Core(config);
  }

  public getSnake() {
    return new SnakeProxy({ snake: this.core.getSnake() });
  }

  public getCore() {
    return new CoreProxy({ core: this.core, intervalRange: this.config.intervalRange });
  }
}

export const createSnakeGame = (config: Config = new Config()) => {
  const game = new SnakeGame(config);
  return {
    core: game.getCore(),
    snake: game.getSnake()
  };
};
