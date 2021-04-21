import { EventManager } from "../event-manager";
import { ItemType, State } from "../core";
import { Core, Processer } from "..";

interface EventMap {
  "change-state": { state: State };
  "change-speed": { speed: number };
  "change-score": { score: number };
  "change-item-map": { itemMap: ItemType[][] };
}

interface IntervalRange {
  max: number;
  min: number;
}

export class CoreProxy extends EventManager<EventMap> {
  public readonly core: Core;

  public readonly processer: Processer;

  public intervalRange: IntervalRange;

  constructor(data: { core: Core; intervalRange: IntervalRange }) {
    super();
    this.core = data.core;
    this.intervalRange = data.intervalRange;
    this.processer = new Proxy(data.core.getProcesser(), { set: this.setter });
  }

  public setter<K extends keyof Processer>(target: Processer, key: K, value: Processer[K]) {
    if (key === "timer") {
      if (typeof target.timer !== typeof value) {
        this.emit("change-state", { state: value ? State.Alive : State.Dead });
      }
    }

    if (key === "interval") {
      this.emit("change-speed", { speed: this.interval2speed(value as number) });
    }

    if (key === "score") {
      this.emit("change-score", { score: value as number });
    }

    if (key === "itemMap") {
      this.emit("change-item-map", { itemMap: value as ItemType[][] });
    }

    return true;
  }

  public caller(target: Processer, thisArg: never, args: never) {}

  public getState() {
    return this.processer.timer ? State.Alive : State.Dead;
  }

  public interval2speed(interval: number) {
    const { max } = this.intervalRange;
    return interval / max;
  }
  public getSpeed() {
    return this.interval2speed(this.processer.interval);
  }

  public getScore() {
    return this.processer.score;
  }

  public getItemMap() {
    return this.processer.itemMap;
  }

  public start() {
    return this.processer.setTimer();
  }

  public stop() {
    return this.processer.clearTimer();
  }

  public restart() {
    const config = JSON.parse(JSON.stringify(this.core.config));

    this.processer.score = 0;

    this.processer.snake.state = State.Alive;
    this.processer.snake.direction = config.snake.direction;
    this.processer.snake.positions = config.snake.positions;

    this.processer.clearTimer();
    this.processer.setTimer();
  }

  public setSpeed(speed: number) {
    const { max, min } = this.intervalRange;

    const interval = max * speed;

    this.processer.interval = interval < max ? (interval > min ? interval : min) : max;
  }
}
