export class Timer {
  private work: Function
  private interval: number
  private timer: NodeJS.Timer | number | null = null

  public constructor(work: Function, interval: number = 1000 / 60) {
    this.work = work
    this.interval = interval
  }

  public start() {
    this.timer = setInterval(this.work, this.interval)
  }

  public stop() {
    if (!this.timer) return
    clearInterval(this.timer)
    this.timer = null
  }
}
