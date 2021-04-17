import FrameRunner from "./FrameRunner";
import { GameStatusEnum, EventMap } from "./types";
import EventManager from "./util/EventManager";

/** 游戏状态控制 */
export default class StateController {
  /** 最大刷新率 */
  static readonly maxInterval = 200;

  /** 计时器 */
  private timer: NodeJS.Timeout | null = null;
  /** 运行间隔时间 */
  private interval = 100;
  /** 运行状态 */
  private status = GameStatusEnum.Pause;

  private frameRunner: FrameRunner;
  private eventManager: EventManager<EventMap>;
  constructor(data: { frameRunner: FrameRunner; eventManager: EventManager<EventMap> }) {
    this.frameRunner = data.frameRunner;
    this.eventManager = data.eventManager;

    this.eventManager.addEventListener("game-over", this.over);
  }

  /** 状态 */
  public setStatus = (status: GameStatusEnum) => {
    this.status = status;
    this.eventManager.emit("change-status", { status });
    return this;
  };
  /** 状态 */
  public getStatus = () => {
    return this.status;
  };

  /** 设置速度，百分比 */
  public setSpeed = (speed: number) => {
    const { maxInterval } = StateController;
    this.interval = ((100 - speed) / 100) * maxInterval;
    this.eventManager.emit("change-speed", { speed });
    return this;
  };

  /** 设置速度，百分比 */
  public getSpeed = () => {
    const { maxInterval } = StateController;
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

  private runFrame = () => {
    this.frameRunner.run();
    return this;
  };
}
