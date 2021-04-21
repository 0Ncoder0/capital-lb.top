import { ItemType } from ".";

export class Item {
  public type: ItemType;

  constructor(data: { type: ItemType }) {
    this.type = data.type;
  }
}
