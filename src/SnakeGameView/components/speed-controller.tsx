import { InputNumber } from "antd";

/** 速度控制器 */
export const SpeedController = (props: { speed: number; setSpeed: { (speed: number): void } }) => {
  return (
    <InputNumber
      value={props.speed}
      max={100}
      min={10}
      step={10}
      onChange={value => props.setSpeed(value)}
    ></InputNumber>
  );
};

export default SpeedController;
