import React, { CSSProperties } from "react";
import GameMap from "../core/game-map";
import { ItemEnum } from "../core/types";

/** 游戏运行面板 */
export default class GameBoard extends React.Component {
  props!: { gameMap: GameMap };

  /** 地图元素 => 颜色 */
  private item2color = new Map([
    [ItemEnum.Food, "red"],
    [ItemEnum.SnakeBody, "black"],
    [ItemEnum.Space, "gray"]
  ]);

  /** 块样式 */
  private blockStyle = (item: ItemEnum): CSSProperties => ({
    height: "20px",
    width: "20px",
    lineHeight: "20px",
    textAlign: "center",
    backgroundColor: this.item2color.get(item)
  });

  /** 行样式 */
  private rowStyle = (): CSSProperties => ({
    display: "flex"
  });

  /** 容器样式 */
  private containerStyle = (): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box"
  });

  private Blocks = (props: { items: ItemEnum[] }) => (
    <>
      {props.items.map((item, index) => (
        <div key={"block" + index} style={this.blockStyle(item)} />
      ))}
    </>
  );

  private Rows = (props: { gameMap: ItemEnum[][] }) => (
    <>
      {props.gameMap.map((items, index) => (
        <div style={this.rowStyle()} key={"row" + index}>
          <this.Blocks items={items} />
        </div>
      ))}
    </>
  );

  render() {
    return (
      <div style={this.containerStyle()}>
        <this.Rows gameMap={this.props.gameMap} />
      </div>
    );
  }
}
