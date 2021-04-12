import React from 'react'

/** 蛇 */
class Snaker {
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
  direction = Snaker.Right
  /** 速度 (毫秒/移动次数) */
  speed = 1000
  /** 移动计时器 */
  timer = null

  /** 初始化蛇身坐标 */
  constructor(positions) {
    this.positions = positions || []
  }

  /** 设置移动速度 */
  setSpeed = speed => {
    this.speed = speed
    this.setTimer()
  }

  /** 设置移动方向 */
  setDirection = dir => {
    this.direction = dir
  }

  /** 设置移动计时器 */
  setTimer = () => {
    if (this.timer) {
      /** 移动结束后重置定时器 */
      const BPafterMoved = this.afterMoved
      this.afterMoved = () => {
        clearInterval(this.timer)
        this.timer = setInterval(this.move, this.speed)

        if (BPafterMoved) BPafterMoved()
        this.afterMoved = BPafterMoved
      }
    } else {
      /** 设置定时器 */
      this.timer = setInterval(this.move, this.speed)
    }
  }

  /** 清除移动计时器 */
  clearTimer = () => this.clearInterval(this.timer)

  /** 开始 */
  start = () => this.setTimer()

  /** 暂停 */
  stop = () => this.clearTimer()

  /** 移动 */
  move = () => {
    if (!this.positions.length) return
    const { Left, Right, Top, Bottom } = Snaker

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
        break
      }
    }
    this.positions[0] = [x, y]

    for (let i = this.positions.length - 1; i >= 1; i--) {
      this.positions[i] = [...this.positions[i - 1]]
    }

    if (this.afterMoved) {
      this.afterMoved()
    }
  }

  /** 移动后 */
  afterMoved = null
}

/** 贪吃蛇-游戏部分 */
class RetroSnaker {
  /** 蛇身 */
  static SnakerBody = '*'
  /** 食物 */
  static Food = '#'
  /** 空白 */
  static Space = '0'

  /** 蛇 */
  snaker = new Snaker([
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0]
  ])

  /** 游戏地图 */
  gameMap = []

  constructor() {
    this.clearMap().setMap()
    this.snaker.start()
    this.snaker.afterMoved = this.update
  }
  /** 渲染器 */
  update = () => {
    this.clearMap().setMap()
    if (this.afterUpdate) this.afterUpdate()
    return this
  }

  /** 渲染结束后 */
  afterUpdate = null

  /** 生成地图 */
  clearMap = () => {
    const length = 20
    this.gameMap = []
    for (let i = 0; i < length; i++) {
      this.gameMap.push([])
      for (let k = 0; k < length; k++) {
        this.gameMap[i].push(RetroSnaker.Space)
      }
    }
    return this
  }

  /** 设置地图素材 */
  setMap = () => {
    this.snaker.positions.forEach(position => {
      const [x, y] = position
      this.gameMap[y][x] = RetroSnaker.SnakerBody
    })
    return this
  }
}

/** 贪吃蛇 */
export default class RetroSnakerView extends React.Component {
  constructor() {
    super()
    this.retroSnaker = new RetroSnaker()
    this.state = { gameMap: this.retroSnaker.gameMap }
    this.retroSnaker.afterUpdate = this.afterRetroSnakerUpdate
  }
  /** 游戏本体状态更新完成后页面更新状态 */
  afterRetroSnakerUpdate = () => {
    console.log('----')
    this.setState({ gameMap: this.retroSnaker.gameMap })
  }
  /** 渲染行 */
  render() {
    const blockStyle = () => ({ height: '20px', width: '20px', lineHeight: '20px', textAlign: 'center' })

    const rowStyle = () => ({ display: 'flex' })

    const map = this.state.gameMap.map((row, index) => {
      const blocks = row.map((item, index) => (
        <div key={'block' + index} style={blockStyle()}>
          {item}
        </div>
      ))
      return (
        <div key={'row' + index} style={rowStyle()}>
          {blocks}
        </div>
      )
    })
    return <div>{map}</div>
  }
}
