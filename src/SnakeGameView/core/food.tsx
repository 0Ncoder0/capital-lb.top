import { ItemEnum, Position } from './types'

/** 食物 */
export default class Food {
  /** 位置坐标 */
  position: Position | null = null

  /** 生成食物坐标 */
  create = (gameMap: ItemEnum[][]) => {
    const availables: Array<Position> = []
    gameMap.forEach((row, y) => row.forEach((block, x) => block === ItemEnum.Space && availables.push([x, y])))
    const index = Math.floor(Math.random() * availables.length)
    this.position = availables[index]
    return this
  }

  /** 清除食物坐标 */
  clearPosition = () => {
    this.position = null
    return this
  }
}
