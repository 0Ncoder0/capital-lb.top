import { Direction } from './_types'
import { Calc } from './calc'

type SpeedConfig = {
  max: number
  factors: {
    increase: number
    friction: number
  }
}

export class Speed {
  private static defaultConfig: SpeedConfig = {
    max: 10,
    factors: {
      increase: 1.6,
      friction: 0.3,
    },
  }

  private config: SpeedConfig

  private speed = { x: 0, y: 0 }
  private acceleration = { x: 0, y: 0 }

  constructor(config: Partial<SpeedConfig> = {}) {
    this.config = Object.assign({}, Speed.defaultConfig, config)
  }

  public get x() {
    return this.speed.x
  }

  public get y() {
    return this.speed.y
  }

  private friction() {
    const dir = Calc.direction({ x: 0, y: 0 }, this.speed)
    this.speed.x -= (dir.x || 0) * this.config.factors.friction
    this.speed.y -= (dir.y || 0) * this.config.factors.friction
  }

  private accelerate(direction: Direction) {
    const maxX = this.config.max / direction.x
    const maxY = this.config.max / direction.y

    if (this.speed.x > maxX || this.speed.x < maxX) {
      this.speed.x += direction.x * this.config.factors.increase
    }
    if (this.speed.y > maxY || this.speed.y < maxY) {
      this.speed.y += direction.y * this.config.factors.increase
    }
  }

  public nextTick(direction?: Direction) {
    if (direction) this.accelerate(direction)
    this.friction()

    this.speed.x += this.acceleration.x
    this.speed.y += this.acceleration.y
  }
}
