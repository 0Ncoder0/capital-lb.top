import { Point } from '~/lib/_types'
import { list } from '~/lib/utils'
import { Mouse } from '~/lib/mouse'
import { Timer } from '~/lib/timer'
import { Calc } from '~/lib/calc'

type Circle = {
  center: Point
  radius: number
  depth: number
}

export class ISeeYou {
  private center: Point
  public circles: Circle[] = []

  private mouse = new Mouse()
  private timer = new Timer(this.main.bind(this))

  constructor(center: Point) {
    this.center = center
    this.circles = this.createCircles()
  }

  private createCircles(): Circle[] {
    return list(24, () => {
      const center = { x: this.center.x, y: this.center.y }
      const radius = 120 + Math.random() * 300
      const depth = radius / 500

      return { center, radius, depth }
    }).sort((a, b) => b.depth - a.depth)
  }

  private main() {
    const direction = Calc.direction(this.center, this.mouse.position)
    const distance = Calc.distance(this.center, this.mouse.position)
    const dx = direction.x * distance
    const dy = direction.y * distance

    this.circles.forEach((circle) => {
      circle.center.x = this.center.x + dx * ((circle.radius / 200) * circle.depth)
      circle.center.y = this.center.y + dy * ((circle.radius / 200) * circle.depth)
    })
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
