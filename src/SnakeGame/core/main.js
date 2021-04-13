import Food from './food'
import GameMap from './game-map'
import Snake from './snake'
/** 贪吃蛇游戏主体 */
export default class SnakeGame {
  static GameMap = GameMap
  static Snake = Snake

  /** 地图 */
  gameMap = new GameMap().initMap()
  /** 蛇 */
  snake = new Snake().setPositions([
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0]
  ])
  /** 食物 */
  food = new Food().create(this.gameMap)

  /** 计时器 */
  timer = null
  /** 计时器间隔 */
  interval = 100
  /** 单帧运行后的钩子函数 */
  afterFrame = null
  /** 游戏结束后的钩子函数 */
  onGameOver = null

  /** 设置计时器 */
  setTimer = () => {
    this.timer = setInterval(() => {
      this.runFrame()
      if (this.afterFrame) this.afterFrame()
    }, this.interval)
    return this
  }

  /** 清除计时器 */
  clearTimer = () => {
    clearInterval(this.timer)
    return this
  }

  /** 单帧运行 */
  runFrame = () => {
    const { snake, food, gameMap } = this
    snake.move()

    if (this.isSnakeRunOut() || this.isSnakeRunIntoSelf()) {
      this.clearTimer()
      if (this.onGameOver) {
        this.onGameOver()
      }
    } else {
      gameMap.clearMap()
      gameMap.setMap({ snake, food })

      if (this.isSnakeRunIntoFood()) {
        snake.lengthen()
        food.create(gameMap)
      }
    }

    return this
  }

  /** 蛇是否出界 */
  isSnakeRunOut = () => {
    const [x, y] = this.snake.positions[0]
    const max = this.gameMap.maxLength
    return x >= max || y >= max || x < 0 || y < 0
  }
  /** 蛇是否与自身碰撞 */
  isSnakeRunIntoSelf = () => {
    const [sx, sy] = this.snake.positions[0]
    return !!this.snake.positions.find(([x, y], index) => index !== 0 && x === sx && y === sy)
  }
  /** 蛇是否吃到食物 */
  isSnakeRunIntoFood = () => {
    const [fx, fy] = this.food.position
    return !!this.snake.positions.find(([x, y]) => x === fx && y === fy)
  }
}
