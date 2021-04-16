import SnakeGame from "../core/main";
import { GameStatusEnum, Direction } from "../core/types";
/** 控制器 */
export default class EventListener {
  private snakeGame!: SnakeGame;

  constructor(data: { snakeGame: SnakeGame }) {
    this.snakeGame = data.snakeGame;
  }

  init() {
    return this.setSpaceListener().setDirectionListener().setSpeedListener();
  }

  /** 状态操作 */
  setSpaceListener = () => {
    document.addEventListener("keydown", event => {
      if (event.code !== "Space") return;
      /** 游戏状态 => 空格键操作 */
      const status2spaceAction = new Map([
        [GameStatusEnum.Running, () => this.snakeGame.pause()],
        [GameStatusEnum.Pause, () => this.snakeGame.start()],
        [GameStatusEnum.Over, () => this.snakeGame.init().start()]
      ]);

      const action = status2spaceAction.get(this.snakeGame.getStatus());
      if (action) action();
    });
    return this;
  };

  /** 方向操作 */
  setDirectionListener = () => {
    /** 方向 => 反方向 */
    const direction2opposite = new Map([
      [Direction.Top, Direction.Bottom],
      [Direction.Bottom, Direction.Top],
      [Direction.Left, Direction.Right],
      [Direction.Right, Direction.Left]
    ]);
    /** 按键 => 方向 */
    const key2direction = new Map([
      ["w", Direction.Top],
      ["s", Direction.Bottom],
      ["a", Direction.Left],
      ["d", Direction.Right]
    ]);

    document.addEventListener("keydown", event => {
      const key = event.key;
      const snake = this.snakeGame.snake;

      const direction = snake.direction;
      const dir = key2direction.get(key);

      const isOpposite = dir && direction2opposite.get(dir) === direction;
      if (dir && !isOpposite) {
        snake.direction = dir;
      }
    });
    return this;
  };

  /** 速度操作 */
  setSpeedListener = () => {
    document.addEventListener("keydown", event => {
      const key = event.key;

      const increase = "=";
      const decrease = "-";
      let speed = this.snakeGame.getSpeed();

      if (key === increase) {
        speed += 10;
      }
      if (key === decrease) {
        speed -= 10;
      }

      if (speed <= 100 && speed >= 10) {
        this.snakeGame.setSpeed(speed);
      }
    });
    return this;
  };
}
