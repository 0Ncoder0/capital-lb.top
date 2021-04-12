import React from "react";

/** 蛇 */
class Snaker {
  /** 左移 */
  static Left = "Left";
  /** 右移 */
  static Right = "Right";
  /** 上移 */
  static Top = "Top";
  /** 下移 */
  static Bottom = "Bottom";

  /** 身体下标组 */
  positions = [];
  /** 移动方向 */
  direction = Snaker.Right;

  /** 初始化蛇身坐标 */
  constructor(positions) {
    this.positions = positions || [];
  }

  /** 移动 */
  move = () => {
    if (!this.positions.length) return;
    const { Left, Right, Top, Bottom } = Snaker;

    let [x, y] = this.positions[0];
    switch (this.direction) {
      case Left: {
        x--;
        break;
      }
      case Right: {
        x++;
        break;
      }
      case Top: {
        y--;
        break;
      }
      case Bottom: {
        y++;
        break;
      }
      default: {
        break;
      }
    }

    for (let i = this.positions.length - 1; i >= 1; i--) {
      this.positions[i] = [...this.positions[i - 1]];
    }
    this.positions[0] = [x, y];
  };

  /** 移动后 */
  afterMoved = null;
}

/** 贪吃蛇-游戏部分 */
class RetroSnaker {
  /** 蛇身 */
  static SnakerBody = "*";
  /** 食物 */
  static Food = "#";
  /** 空白 */
  static Space = "0";

  /** 蛇 */
  snaker = new Snaker([
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
  ]);

  /** 游戏地图 */
  gameMap = [];
  /** 地图宽度 */
  gameMapLength = 20;

  /** 计时器 */
  timer = null;
  /** 间隔 */
  interval = 200;

  /** 渲染结束后 */
  afterTick = null;

  constructor() {
    this.initMap();
  }
  /** 开始 */
  start = () => {
    clearInterval(this.timer);
    const main = () => {
      this.moveSnaker().clearMap().setMap();
      if (this.afterTick) this.afterTick();
    };
    this.timer = setInterval(main, this.interval);
  };
  /** 暂停 */
  stop = () => {
    clearInterval(this.timer);
  };
  /** 移动蛇 */
  moveSnaker = () => {
    this.snaker.move();
    return this;
  };
  /** 生成地图 */
  initMap = () => {
    this.gameMap = [];
    for (let i = 0; i < this.gameMapLength; i++) {
      this.gameMap.push([]);
      for (let k = 0; k < this.gameMapLength; k++) {
        this.gameMap[i].push(RetroSnaker.Space);
      }
    }
    return this;
  };
  /** 清除地图 */
  clearMap = () => {
    for (let i = 0; i < this.gameMapLength; i++) {
      for (let k = 0; k < this.gameMapLength; k++) {
        this.gameMap[i][k] = RetroSnaker.Space;
      }
    }
    return this;
  };
  /** 设置地图素材 */
  setMap = () => {
    this.snaker.positions.forEach((position) => {
      const [x, y] = position;
      this.gameMap[y][x] = RetroSnaker.SnakerBody;
    });
    return this;
  };
}

/** 贪吃蛇 */
export default class RetroSnakerView extends React.Component {
  constructor() {
    super();
    this.state = { gameMap: [] };
  }
  componentDidMount = () => {
    this.setUp();
  };
  /** 初始化 */
  setUp = () => {
    this.retroSnaker = new RetroSnaker();
    this.retroSnaker.afterTick = this.afterTick;

    this.setState({ gameMap: this.retroSnaker.gameMap });
    this.setListeners();
    this.retroSnaker.start();
  };
  /** 游戏本体状态更新完成后页面更新状态 */
  afterTick = () => {
    this.setState({ gameMap: this.retroSnaker.gameMap });
  };
  /** 设置监听器 */
  setListeners = () => {
    /** 按键 => 方向 */
    const key2dir = new Map([
      ["w", Snaker.Top],
      ["s", Snaker.Bottom],
      ["a", Snaker.Left],
      ["d", Snaker.Right],
    ]);

    /** 是否反方向 */
    const isOpposite = (dir) => false;

    window.addEventListener("keydown", (event) => {
      const dir = key2dir.get(event.key);
      if (dir && !isOpposite(dir)) {
        this.retroSnaker.snaker.direction = dir;
      }
    });

    window.addEventListener("error", () => this.retroSnaker.stop());
  };
  /** 渲染行 */
  render() {
    const blockStyle = () => ({
      height: "20px",
      width: "20px",
      lineHeight: "20px",
      textAlign: "center",
    });

    const rowStyle = () => ({ display: "flex" });

    const map = this.state.gameMap.map((row, index) => {
      const blocks = row.map((item, index) => (
        <div key={"block" + index} style={blockStyle()}>
          {item}
        </div>
      ));
      return (
        <div key={"row" + index} style={rowStyle()}>
          {blocks}
        </div>
      );
    });
    return <div>{map}</div>;
  }
}
