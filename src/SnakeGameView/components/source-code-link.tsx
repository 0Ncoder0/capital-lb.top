import React from "react";
import { GithubOutlined } from "@ant-design/icons";
/** 源码链接 */
export class SourceCodeLink extends React.Component {
  render() {
    const link = "https://github.com/0Ncoder0/capital-lb.top/tree/game-snake-ui/src/SnakeGameView";
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <GithubOutlined style={{ color: "black" }} />
        <div style={{ width: "8px" }}></div>
        <a href={link} target="__blank">
          GitHub
        </a>
      </div>
    );
  }
}

export default SourceCodeLink;
