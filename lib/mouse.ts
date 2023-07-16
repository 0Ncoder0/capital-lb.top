import { Point } from './_types'

export class Mouse {
  public position: Point = { x: 0, y: 0 }

  public isHolding = false

  private eventListeners = [
    {
      type: 'mousemove',
      listener: (event: MouseEvent) => {
        this.position.x = event.clientX
        this.position.y = event.clientY
      },
    },
    {
      type: 'mousedown',
      listener: () => {
        this.isHolding = true
      },
    },
    {
      type: 'mouseup',
      listener: () => {
        this.isHolding = false
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
