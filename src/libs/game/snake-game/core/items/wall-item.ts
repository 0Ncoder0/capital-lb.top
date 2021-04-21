import { Item, ItemType, Position } from ".";

export class WallItem extends Item {
  public positions: Position[];

  constructor(data: { positions: Position[] }) {
    super({ type: ItemType.Wall });
    this.positions = data.positions;
  }
}
