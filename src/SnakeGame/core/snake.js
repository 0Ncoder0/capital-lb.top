/** 蛇 */
export default class Snake {
  /** 左移 */
  static Left = 'Left'
  /** 右移 */
  static Right = 'Right'
  /** 上移 */
  static Top = 'Top'
  /** 下移 */
  static Bottom = 'Bottom'

  /** 身体下标组 */
  positions = []
  /** 移动方向 */
  direction = Snake.Right

  /** 设置蛇身坐标 */
  setPositions = positions => {
    this.positions = positions || []
    return this
  }

  /** 增长蛇身 */
  lengthen = () => {
    this.positions.push([...this.positions[this.positions.length - 1]])
    return this
  }

  /** 移动 */
  move = () => {
    if (!this.positions.length) return
    const { Left, Right, Top, Bottom } = Snake

    let [x, y] = this.positions[0]
    switch (this.direction) {
      case Left: {
        x--
        break
      }
      case Right: {
        x++
        break
      }
      case Top: {
        y--
        break
      }
      case Bottom: {
        y++
        break
      }
      default: {
        throw new Error('wrong direction ' + this.direction)
      }
    }
    for (let i = this.positions.length - 1; i >= 1; i--) {
      this.positions[i] = [...this.positions[i - 1]]
    }
    this.positions[0] = [x, y]

    return this
  }
}
