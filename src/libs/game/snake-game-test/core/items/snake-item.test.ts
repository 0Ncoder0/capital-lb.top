import { SnakeItem, Direction, State, ItemType } from "../../../snake-game/core";

describe("snake item", () => {
  it("constructor", () => {
    const direction = Direction.Down;
    const positions = [
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 }
    ];
    const mapSize = { height: 20, width: 20 };
    const snake = new SnakeItem({ direction, positions, mapSize });

    expect(snake.type).toEqual(ItemType.Snake);
    expect(snake.state).toEqual(State.Alive);
    expect(snake.direction).toEqual(direction);

    expect(snake.mapSize).toStrictEqual(mapSize);
    expect(snake.positions).toStrictEqual(positions);
  });

  it("Lengthen", () => {
    const positions = [
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 }
    ];
    const length = positions.length;

    const lengthened = SnakeItem.Lengthen(positions);

    expect(lengthened.length).toEqual(length + 1);
    expect(lengthened).not.toEqual(positions);
    expect(lengthened).toStrictEqual([...positions, ...positions.slice(-1)]);
  });

  describe("Move", () => {
    const direction = Direction.Right;
    const positions = [
      { x: 4, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 1 }
    ];
    const mapSize = { height: 20, width: 20 };
    const length = positions.length;

    const moved = SnakeItem.Move(positions, direction, mapSize);

    expect(moved).not.toEqual(positions);
    expect(moved.length).toEqual(length);

    it("move to up", () => {
      const moved = SnakeItem.Move(positions, Direction.Up, mapSize);
      expect(moved).toStrictEqual([{ x: 4, y: 0 }, ...positions.slice(0, -1)]);
    });
    it("move to down", () => {
      const moved = SnakeItem.Move(positions, Direction.Down, mapSize);
      expect(moved).toStrictEqual([{ x: 4, y: 2 }, ...positions.slice(0, -1)]);
    });
    it("move to left", () => {
      const moved = SnakeItem.Move(positions, Direction.Left, mapSize);
      expect(moved).toStrictEqual([{ x: 3, y: 1 }, ...positions.slice(0, -1)]);
    });
    it("move to right", () => {
      const moved = SnakeItem.Move(positions, Direction.Right, mapSize);
      expect(moved).toStrictEqual([{ x: 5, y: 1 }, ...positions.slice(0, -1)]);
    });

    describe("move to boundary", () => {
      it("move to up boundary", () => {
        const moved = SnakeItem.Move([{ x: 10, y: 0 }], Direction.Up, mapSize);
        expect(moved).toStrictEqual([{ x: 10, y: mapSize.height - 1 }]);
      });
      it("move to down boundary", () => {
        const moved = SnakeItem.Move([{ x: 10, y: mapSize.height - 1 }], Direction.Down, mapSize);
        expect(moved).toStrictEqual([{ x: 10, y: 0 }]);
      });
      it("move to left boundary", () => {
        const moved = SnakeItem.Move([{ x: 0, y: 10 }], Direction.Left, mapSize);
        expect(moved).toStrictEqual([{ x: mapSize.width - 1, y: 10 }]);
      });
      it("move to right boundary", () => {
        const moved = SnakeItem.Move([{ x: mapSize.width - 1, y: 10 }], Direction.Right, mapSize);
        expect(moved).toStrictEqual([{ x: 0, y: 10 }]);
      });
    });
  });
});
