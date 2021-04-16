import { CSSProperties } from "react";
import { ItemEnum } from "../core/types";

/** 地图元素 => 颜色 */
const item2color = new Map([
  [ItemEnum.Food, "#ff85c0"],
  [ItemEnum.SnakeBody, "#434343"],
  [ItemEnum.SnakeHead, "#434343"],
  [ItemEnum.Space, "#bfbfbf"]
]);

/** 块样式 */
const blockStyle = (item: ItemEnum): CSSProperties => ({
  height: "20px",
  width: "20px",
  lineHeight: "20px",
  textAlign: "center",
  backgroundColor: item2color.get(item)
});

/** 行样式 */
const rowStyle = (): CSSProperties => ({
  display: "flex"
});

/** 容器样式 */
const containerStyle = (): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box"
});

const Blocks = (props: { items: ItemEnum[] }) => (
  <>
    {props.items.map((item, index) => (
      <div key={"block" + index} style={blockStyle(item)} />
    ))}
  </>
);

const Rows = (props: { gameMap: ItemEnum[][] }) => (
  <>
    {props.gameMap.map((items, index) => (
      <div style={rowStyle()} key={"row" + index}>
        <Blocks items={items} />
      </div>
    ))}
  </>
);

/** 游戏运行面板 */
export const GameBoard = (props: { gameMap: ItemEnum[][] }) => {
  return (
    <div style={containerStyle()}>
      <Rows gameMap={props.gameMap} />
    </div>
  );
};

export default GameBoard;
