/** 游戏地图 */
export default class GameMap extends Array {
  /** 蛇身 */
  static SnakeBody = '*'
  /** 食物 */
  static Food = '#'
  /** 空白 */
  static Space = ' '

  /** 地图宽度 */
  maxLength = 20

  /** 生成地图 */
  initMap = () => {
    for (let i = 0; i < this.maxLength; i++) {
      this.push([])
      for (let k = 0; k < this.maxLength; k++) {
        this[i].push(GameMap.Space)
      }
    }
    return this
  }
  /** 清除地图 */
  clearMap = () => {
    for (let i = 0; i < this.maxLength; i++) {
      for (let k = 0; k < this.maxLength; k++) {
        this[i][k] = GameMap.Space
      }
    }
    return this
  }
  /** 设置地图素材 */
  setMap = ({ snake, food }) => {
    // set food
    const [x, y] = food.position
    this[y][x] = GameMap.Food

    // set snake
    snake.positions.forEach(position => {
      const [x, y] = position
      this[y][x] = GameMap.SnakeBody
    })

    return this
  }
}
