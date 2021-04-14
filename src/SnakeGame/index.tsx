import React, { CSSProperties } from 'react'
import { Direction, ItemEnum } from './core/types'
import GameMap from './core/game-map'
import SnakeGame from './core/main'

type State = {
  gameMap?: GameMap
}

/** 贪吃蛇 */
export default class SnakeGameView<T> extends React.Component {
  public instance: SnakeGame
  public state: State = {}

  constructor(props: T) {
    super(props)
    this.instance = new SnakeGame().init()
    this.state.gameMap = this.instance.gameMap

    this.instance.afterFrame = () => this.setState({ gameMap: this.instance.gameMap })
    this.instance.onGameOver = () => window.alert('Game Over')
    this.setListeners()
  }

  /** 设置监听器 */
  setListeners = () => {
    const snake = this.instance.snake
    const { Left, Right, Top, Bottom } = Direction
    /** 按键到方向的映射 */
    const key2dir = new Map([
      ['w', Top],
      ['s', Bottom],
      ['a', Left],
      ['d', Right]
    ])
    /** 反方向 */
    const opposite = new Map([
      [Top, Bottom],
      [Bottom, Top],
      [Left, Right],
      [Right, Left]
    ])
    window.addEventListener('keydown', event => {
      if (!this.instance.timer) {
        this.instance.start()
      }
      const key = event.key
      const dir = key2dir.get(key)
      const isOpposite = dir && opposite.get(dir) === snake.direction
      if (dir && !isOpposite) {
        snake.direction = dir
      }
    })
  }

  /** 渲染行 */
  render() {
    const item2color = new Map([
      [ItemEnum.Food, 'red'],
      [ItemEnum.SnakeBody, 'black'],
      [ItemEnum.Space, 'gray']
    ])

    const blockStyle = (): CSSProperties => ({
      height: '20px',
      width: '20px',
      lineHeight: '20px',
      textAlign: 'center'
    })
    const containerStyle = (): CSSProperties => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: window.innerHeight + 'px',
      boxSizing: 'border-box',
      paddingBottom: '100px'
    })

    const map = this.state.gameMap?.map((row, index) => {
      const blocks = row.map((item, index) => (
        <div
          key={'block' + index}
          style={{
            ...blockStyle(),
            backgroundColor: item2color.get(item)
          }}
        />
      ))
      return (
        <div key={'row' + index} style={{ display: 'flex' }}>
          {blocks}
        </div>
      )
    })

    return <div style={{ ...containerStyle() }}>{map || ''}</div>
  }
}
