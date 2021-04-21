import { Item, ItemType, Position } from ".";

export class FoodItem extends Item {
  public position: Position;

  constructor(data: { position: Position }) {
    super({ type: ItemType.Food });
    this.position = data.position;
  }
}
