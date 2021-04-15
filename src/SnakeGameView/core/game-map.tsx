import Food from "./food";
import Snake from "./snake";
import { ItemEnum } from "./types";

type MapItems = {
  snake?: Snake;
  food?: Food;
};

/** 游戏地图 */
export default class GameMap extends Array<Array<ItemEnum>> {
  /** 地图宽度 */
  maxLength = 20;

  constructor() {
    super();
    this.init();
  }

  /** 生成地图 */
  init = () => {
    for (let i = 0; i < this.maxLength; i++) {
      this.push([]);
      for (let k = 0; k < this.maxLength; k++) {
        this[i].push(ItemEnum.Space);
      }
    }
    return this;
  };
  /** 清除地图 */
  clear = () => {
    for (let i = 0; i < this.maxLength; i++) {
      for (let k = 0; k < this.maxLength; k++) {
        this[i][k] = ItemEnum.Space;
      }
    }
    return this;
  };
  /** 设置地图素材 */
  set = (items: MapItems = {}) => {
    const { snake, food } = items;
    // set food
    if (food && food.position) {
      const [x, y] = food.position;
      this[y][x] = ItemEnum.Food;
    }

    // set snake
    if (snake) {
      snake.positions.forEach(position => {
        const [x, y] = position;
        this[y][x] = ItemEnum.SnakeBody;
      });
    }
    return this;
  };
}
