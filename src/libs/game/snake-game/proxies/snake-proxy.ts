import { SnakeItem, State, Direction, EventManager } from "..";

interface EventMap {
  "change-state": State;
}

export class SnakeProxy extends EventManager<EventMap> {
  public readonly snake: SnakeItem;

  constructor(data:{snake: SnakeItem}) {
    super();
    
    this.snake = new Proxy(data.snake, { set: this.setter });
  }

  public setter<K extends keyof SnakeItem>(target: SnakeItem, key: K, value: SnakeItem[K]) {
    if (key === "state") {
      this.emit("change-state", value as State);
    }

    return true;
  }

  public setDirection(direction: Direction) {
    this.snake.direction = direction;
  }

  public getDirection() {
    return this.snake.direction;
  }

  public getPositions() {
    return this.snake.positions.map(position => ({ ...position }));
  }

  public getState() {
    return this.snake.state;
  }
}
