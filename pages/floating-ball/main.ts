type Point = { x: number; y: number }
type Direction = { x: number; y: number }

class Utils {
  public static distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    return Math.sqrt(dx ** 2 + dy ** 2)
  }

  public static direction(p1: Point, p2: Point): Direction {
    const dist = Utils.distance(p1, p2)
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    return {
      x: dx / dist,
      y: dy / dist,
    }
  }
}

class Speed {
  private static max = 10
  private static increaseFactor = 1.6
  private static frictionFactor = 0.3

  private speed = { x: 0, y: 0 }
  private acceleration = { x: 0, y: 0 }

  public get x() {
    return this.speed.x
  }

  public get y() {
    return this.speed.y
  }

  private friction() {
    const dir = Utils.direction({ x: 0, y: 0 }, this.speed)
    this.speed.x -= (dir.x || 0) * Speed.frictionFactor
    this.speed.y -= (dir.y || 0) * Speed.frictionFactor
  }

  private accelerate(direction: Direction) {
    const maxX = Speed.max / direction.x
    const maxY = Speed.max / direction.y

    if (this.speed.x > maxX || this.speed.x < maxX) {
      this.speed.x += direction.x * Speed.increaseFactor
    }
    if (this.speed.y > maxY || this.speed.y < maxY) {
      this.speed.y += direction.y * Speed.increaseFactor
    }
  }

  public nextTick(direction?: Direction) {
    if (direction) this.accelerate(direction)
    this.friction()

    this.speed.x += this.acceleration.x
    this.speed.y += this.acceleration.y
  }
}

class MousePosition {
  public position: Point | null = null

  private eventListeners = [
    {
      type: 'mousedown',
      listener: (event: MouseEvent) => {
        this.position = {
          x: event.clientX,
          y: event.clientY,
        }
      },
    },
    {
      type: 'mousemove',
      listener: (event: MouseEvent) => {
        if (!this.position) return
        this.position.x = event.clientX
        this.position.y = event.clientY
      },
    },
    {
      type: 'mouseup',
      listener: () => {
        this.position = null
      },
    },
  ]

  public listen() {
    this.eventListeners.forEach(({ type, listener }) => {
      window.addEventListener(type as never, listener)
    })
  }

  public drop() {
    this.eventListeners.forEach(({ type, listener }) => {
      window.removeEventListener(type as never, listener)
    })
  }
}

class Timer {
  private work: Function
  private timer: NodeJS.Timer | number | null = null

  public constructor(work: Function) {
    this.work = work
  }

  public start() {
    this.timer = setInterval(this.work, 1000 / 60)
  }

  public stop() {
    if (!this.timer) return
    clearInterval(this.timer)
    this.timer = null
  }
}

export class FloatingBall {
  public position: Point = { x: 0, y: 0 }

  private speed = new Speed()
  private mouse = new MousePosition()
  private timer = new Timer(this.main.bind(this))

  private main() {
    const dir = this.mouse.position ? Utils.direction(this.position, this.mouse.position) : undefined
    this.speed.nextTick(dir)

    this.position.x += this.speed.x
    this.position.y += this.speed.y
  }

  public start() {
    this.mouse.listen()
    this.timer.start()
  }

  public stop() {
    this.mouse.drop()
    this.timer.stop()
  }
}
