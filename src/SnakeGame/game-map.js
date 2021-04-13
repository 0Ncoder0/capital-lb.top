import Snaker from './snaker'

/** 游戏地图 */
export default class GameMap {
  /** 蛇身 */
  static SnakerBody = '*'
  /** 食物 */
  static Food = '#'
  /** 空白 */
  static Space = '0'

  /** 蛇 */
  snaker = new Snaker()
  /** 游戏地图 */
  gameMap = []
  /** 地图宽度 */
  gameMapLength = 20

  /** 生成地图 */
  initMap = () => {
    this.gameMap = []
    for (let i = 0; i < this.gameMapLength; i++) {
      this.gameMap.push([])
      for (let k = 0; k < this.gameMapLength; k++) {
        this.gameMap[i].push(GameMap.Space)
      }
    }
    return this
  }
  /** 清除地图 */
  clearMap = () => {
    for (let i = 0; i < this.gameMapLength; i++) {
      for (let k = 0; k < this.gameMapLength; k++) {
        this.gameMap[i][k] = GameMap.Space
      }
    }
    return this
  }
  /** 设置地图素材 */
  setMap = () => {
    this.snaker.positions.forEach(position => {
      const [x, y] = position
      this.gameMap[y][x] = GameMap.SnakerBody
    })
    return this
  }
}
