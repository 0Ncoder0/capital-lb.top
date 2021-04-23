export enum ItemType {
  Food = "Food",
  Wall = "Wall",
  Snake = "Snake",
  Empty = "Empty"
}

export enum Direction {
  Left = "Left",
  Right = "Right",
  Up = "Up",
  Down = "Down"
}

export enum State {
  Alive = "Alive",
  Dead = "Dead"
}

export interface Position {
  x: number;
  y: number;
}

export interface MapSize {
  height: number;
  width: number;
}
