import { Item, State, ItemType, Direction, Position, MapSize } from ".";

export class SnakeItem extends Item {
  public mapSize: MapSize;

  public direction: Direction;
  public positions: Position[];

  public state = State.Alive;

  constructor(data: { direction: Direction; positions: Position[]; mapSize: MapSize }) {
    super({ type: ItemType.Snake });
    this.direction = data.direction;
    this.positions = data.positions;
    this.mapSize = data.mapSize;
  }

  public lengthen = () => {
    const length = this.positions.length;
    const tail = { ...this.positions[length - 1] };
    this.positions = [...this.positions, tail];
  };

  public move = () => {
    const { Left, Right, Top, Bottom } = Direction;
    const { height, width } = this.mapSize;

    const increasement = new Map([
      [Left, { x: -1, y: 0 }],
      [Right, { x: +1, y: 0 }],
      [Top, { x: 0, y: -1 }],
      [Bottom, { x: 0, y: +1 }]
    ]).get(this.direction);

    const head = this.positions[0];
    const newHead = {
      x: head.x + increasement!.x,
      y: head.y + increasement!.y
    };

    if (newHead.x >= width) newHead.x = 0;
    if (newHead.y >= height) newHead.y = 0;

    this.positions.pop();
    this.positions = [newHead, ...this.positions];
  };
}
