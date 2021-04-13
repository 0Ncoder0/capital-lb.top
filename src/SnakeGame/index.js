import React from 'react'
import SnakeGame from './core/main'

/** 贪吃蛇 */
export default class SnakeGameView extends React.Component {
  constructor() {
    super()
    this.state = { gameMap: [] }
    this.instance = new SnakeGame()
    this.instance.afterFrame = () => this.setState({ gameMap: this.instance.gameMap })
    this.instance.onGameOver = () => window.alert('Game Over')
    this.instance.setTimer()
    this.setListeners()
  }
  /** 设置监听器 */
  setListeners = () => {
    const snake = this.instance.snake
    const { Left, Right, Top, Bottom } = SnakeGame.Snake
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
      const key = event.key
      const dir = key2dir.get(key)
      const isOpposite = opposite.get(dir) === snake.direction
      if (dir && !isOpposite) {
        snake.direction = dir
      }
    })
  }

  /** 渲染行 */
  render() {
    const item2color = new Map([
      [SnakeGame.GameMap.Food, 'red'],
      [SnakeGame.GameMap.SnakeBody, 'black'],
      [SnakeGame.GameMap.Space, 'gray']
    ])
    const blockStyle = () => ({
      height: '20px',
      width: '20px',
      lineHeight: '20px',
      textAlign: 'center'
    })

    const rowStyle = () => ({ display: 'flex' })

    const containerStyle = () => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: window.innerHeight + 'px',
      boxSizing: 'border-box',
      paddingBottom: '100px'
    })

    const map = this.state.gameMap.map((row, index) => {
      const blocks = row.map((item, index) => (
        <div
          key={'block' + index}
          style={{
            ...blockStyle(item),
            backgroundColor: item2color.get(item)
          }}
        />
      ))
      return (
        <div key={'row' + index} style={rowStyle()}>
          {blocks}
        </div>
      )
    })

    return <div style={containerStyle()}>{map}</div>
  }
}
