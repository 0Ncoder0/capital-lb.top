import { Item, State, ItemType, Direction, Position, MapSize } from ".";

export class SnakeItem extends Item {
  public static readonly Lengthen = (positions: Position[]) => {
    const length = positions.length;
    return [...positions, { ...positions[length - 1] }];
  };

  public static readonly Move = (positions: Position[], direction: Direction, mapSize: MapSize) => {
    const { Left, Right, Up, Down } = Direction;
    const { height, width } = mapSize;

    const increasement = new Map([
      [Left, { x: -1, y: 0 }],
      [Right, { x: 1, y: 0 }],
      [Up, { x: 0, y: -1 }],
      [Down, { x: 0, y: 1 }]
    ]).get(direction);

    const head = positions[0];

    const newHead = {
      x: head.x + increasement!.x,
      y: head.y + increasement!.y
    };

    if (newHead.x >= width) newHead.x = 0;
    if (newHead.x < 0) newHead.x = width - 1;

    if (newHead.y >= height) newHead.y = 0;
    if (newHead.y < 0) newHead.y = height - 1;

    return [newHead, ...positions.slice(0, -1)];
  };

  public mapSize: MapSize;

  public direction: Direction;
  public positions: Position[];

  public state = State.Alive;

  constructor(data: { direction: Direction; positions: Position[]; mapSize: MapSize }) {
    super({ type: ItemType.Snake });
    this.mapSize = data.mapSize;
    this.direction = data.direction;
    this.positions = [...data.positions];
  }

  public lengthen = () => (this.positions = SnakeItem.Lengthen(this.positions));

  public move = () => (this.positions = SnakeItem.Move(this.positions, this.direction, this.mapSize));
}
