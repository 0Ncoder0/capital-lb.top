import { Point } from '~/lib/_types'
import { Mouse } from '~/lib/mouse'
import { Speed } from '~/lib/speed'
import { Timer } from '~/lib/timer'
import { Calc } from '~/lib/calc'

export class FloatingBall {
  public position: Point = { x: 0, y: 0 }

  private speed = new Speed()
  private mouse = new Mouse()
  private timer = new Timer(this.main.bind(this))

  private main() {
    const dir = this.mouse.isHolding ? Calc.direction(this.position, this.mouse.position) : undefined
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
