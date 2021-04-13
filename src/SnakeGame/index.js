import React from 'react'

/** 贪吃蛇 */
export default class SnakeGameView extends React.Component {
  constructor() {
    super()
    this.state = { gameMap: [] }
  }

  /** 渲染行 */
  render() {
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
    return <div style={containerStyle()}>{map}</div>
  }
}
