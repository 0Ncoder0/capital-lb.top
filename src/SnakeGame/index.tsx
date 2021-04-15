import React, { CSSProperties } from "react";
import { Direction, GameStatusEnum, ItemEnum } from "./core/types";
import GameMap from "./core/game-map";
import SnakeGame from "./core/main";
import { Button } from "antd";
import "antd/dist/antd.css";

type State = {
  gameMap?: GameMap;
  gameStatus?: GameStatusEnum;
};

/** 贪吃蛇 */
export default class SnakeGameView<T> extends React.Component {
  public instance: SnakeGame;
  public state: State = {};

  constructor(props: T) {
    super(props);
    this.instance = new SnakeGame().init();
    this.state.gameMap = this.instance.gameMap;
    this.state.gameStatus = this.instance.status;

    this.instance.onFrame = () =>
      this.setState({ gameMap: this.instance.gameMap });

    this.instance.onStatusChanged = (status) => {
      if (status === GameStatusEnum.Over) {
        window.alert("Game Over");
      }
      this.setState({ gameStatus: status });
    };

    this.setListeners();
  }

  /** 设置监听器 */
  setListeners = () => {
    const snake = this.instance.snake;
    const { Left, Right, Top, Bottom } = Direction;
    /** 按键到方向的映射 */
    const key2dir = new Map([
      ["w", Top],
      ["s", Bottom],
      ["a", Left],
      ["d", Right],
    ]);
    /** 反方向 */
    const opposite = new Map([
      [Top, Bottom],
      [Bottom, Top],
      [Left, Right],
      [Right, Left],
    ]);
    window.addEventListener("keydown", (event) => {
      const key = event.key;
      const code = event.code;
      if (code === "Space") {
        switch (this.state.gameStatus) {
          case GameStatusEnum.Running: {
            this.instance.pause();
            break;
          }
          case GameStatusEnum.Pause: {
            this.instance.start();
            break;
          }
          case GameStatusEnum.Over: {
            this.instance.init().start();
            break;
          }
          default:
            break;
        }
      }

      const dir = key2dir.get(key);
      const isOpposite = dir && opposite.get(dir) === snake.direction;
      if (dir && !isOpposite) {
        snake.direction = dir;
      }
    });
  };

  /** 游戏版块 */
  getGameBoard() {
    const item2color = new Map([
      [ItemEnum.Food, "red"],
      [ItemEnum.SnakeBody, "black"],
      [ItemEnum.Space, "gray"],
    ]);

    const blockStyle = (): CSSProperties => ({
      height: "20px",
      width: "20px",
      lineHeight: "20px",
      textAlign: "center",
    });
    const containerStyle = (): CSSProperties => ({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      boxSizing: "border-box",
      paddingBottom: "100px",
      paddingTop: "100px",
    });

    const map = this.state.gameMap?.map((row, index) => {
      const blocks = row.map((item, index) => (
        <div
          key={"block" + index}
          style={{
            ...blockStyle(),
            backgroundColor: item2color.get(item),
          }}
        />
      ));
      return (
        <div key={"row" + index} style={{ display: "flex" }}>
          {blocks}
        </div>
      );
    });

    return <div style={{ ...containerStyle() }}>{map || ""}</div>;
  }

  /** 获取游戏运行状态控制按钮 */
  getStatusControl() {
    const { init, start, pause } = this.instance;

    const pauseBtn = (
      <Button danger type="primary" onClick={() => pause()}>
        暂停
      </Button>
    );

    const startBtn = (
      <Button type="primary" onClick={() => start()}>
        开始
      </Button>
    );

    const restartBtn = (
      <Button type="primary" onClick={() => init().start()}>
        重新开始
      </Button>
    );

    const { Running, Pause, Over } = GameStatusEnum;
    const status2button = new Map([
      [Running, pauseBtn],
      [Pause, startBtn],
      [Over, restartBtn],
    ]);
    return status2button.get(this.state.gameStatus || Pause);
  }

  /** 渲染行 */
  render() {
    return (
      <div>
        {this.getStatusControl()}
        {this.getGameBoard()}
      </div>
    );
  }
}
