import { Position, MapSize, FoodItem, SnakeItem, WallItem, State, ItemType } from "..";

export class Processer {
  public readonly wall: WallItem;

  public readonly mapSize: MapSize;

  public readonly snake: SnakeItem;

  public readonly foods: FoodItem[] = [];

  public timer: NodeJS.Timeout | null = null;

  public interval: number;

  public itemMap: ItemType[][] = [];

  public score: number;

  constructor(data: { snake: SnakeItem; wall: WallItem; mapSize: MapSize; interval: number }) {
    this.snake = data.snake;
    this.wall = data.wall;
    this.mapSize = data.mapSize;
    this.interval = data.interval;

    this.score = this.snake.positions.length;

    this.setItemMap();
  }

  public setTimer() {
    this.timer = setTimeout(() => {
      this.work();
      this.setTimer();
    }, this.interval);
  }

  public clearTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  public work() {
    this.snake.move();

    const isSnakeDead = this.isSnakeDead();
    if (isSnakeDead) this.snake.state = State.Dead;

    const eatenFood = this.eatenFood();
    if (eatenFood) {
      this.snake.lengthen();
      this.removeFood(eatenFood);
      this.createFood();
    }

    this.setItemMap();
  }

  private getEmptyItemMap() {
    const { height, width } = this.mapSize;

    const itemMap: ItemType[][] = [];

    for (let i = 0; i < height; i++) {
      itemMap.push([]);
      for (let k = 0; k < width; k++) {
        itemMap[i].push(ItemType.Empty);
      }
    }

    return itemMap;
  }

  public setItemMap() {
    const itemMap = this.getEmptyItemMap();
    this.foods.forEach(({ position: { x, y } }) => (itemMap[y][x] = ItemType.Food));
    this.snake.positions.forEach(({ x, y }) => (itemMap[y][x] = ItemType.Snake));
    this.wall.positions.forEach(({ x, y }) => (itemMap[y][x] = ItemType.Wall));
    this.itemMap = itemMap;
  }

  public isSnakeDead() {
    const [head, ...body] = this.snake.positions;
    const isSelfEaten = body.some(({ x, y }) => head.x === x && head.y === y);
    const isIntoWall = this.wall.positions.some(({ x, y }) => head.x === x && head.y === y);
    return isIntoWall || isSelfEaten;
  }

  public eatenFood() {
    const head = this.snake.positions[0];
    const eatenFood = this.foods.find(({ position: { x, y } }) => head.x === x && head.y === y);
    return eatenFood;
  }

  public createFood() {
    const availables: Position[] = [];

    const usedPosition = ([] as Position[]).concat(
      this.snake.positions,
      this.wall.positions,
      this.foods.map(food => food.position)
    );

    for (let y = 0; y < this.mapSize.height; y++) {
      for (let x = 0; x < this.mapSize.width; x++) {
        const isUsed = usedPosition.find(({ x: ux, y: uy }) => x === ux && y === uy);
        if (!isUsed) availables.push({ x, y });
      }
    }

    const index = Math.floor(Math.random() * availables.length);
    const position = availables[index];
    this.foods.push(new FoodItem({ position }));
  }

  public removeFood(food: FoodItem) {
    const index = this.foods.indexOf(food);
    this.foods[index] = this.foods[this.foods.length - 1];
    this.foods.pop();
  }
}
