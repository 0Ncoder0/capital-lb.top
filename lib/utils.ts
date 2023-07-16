import { Point, Direction } from './_types'

export class Utils {
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
