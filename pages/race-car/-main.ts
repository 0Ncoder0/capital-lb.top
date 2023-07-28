import { Engine, Runner, Composite, Bodies, Render, Body } from 'matter-js'

const maps = [
  `
  ****************************************
  ****************************************
  ****************************************
  ****************************************
  ****************************************
  **********ooooo********oo***************
  *********ooooooo*****ooooo****ooooo*****
  ********ooooooooo***ooooooo**ooooooo****
  ********ooo***ooo***ooooooo**ooooooo****
  *******oooo**oooo**oooo*ooo*oooo*ooo****
  *******oooo**ooo***ooo**oooo*ooo*ooo****
  ********ooo**ooo***ooo***ooo*ooo*ooo****
  ********ooo**ooo***ooo***ooo*ooo*ooo****
  ****o***oooo*ooo***ooo***ooo*ooo*ooo****
  ***ooo***ooo*ooo***ooo***ooo*ooo*ooo****
  **oooo**oooo*ooo***ooo***ooo*ooo*ooo****
  **oooo**ooo**ooo***ooo***ooo*ooo*ooo****
  **ooooooooo**ooo***ooo***ooo*ooo*ooo****
  **oooooooo***oooo**ooo***ooo*ooo*ooo****
  **oooooooo****oooooooo***ooo*ooo*ooo****
  *oooo*ooo*****ooooooo****ooo*ooo*ooo****
  *ooo***********ooooo*****ooo*ooo*ooo****
  *ooo*********************ooo*ooo*ooo****
  *ooo***oooo*************oooo*ooo*ooo****
  *ooo**oooooo************ooo**ooo*ooo****
  *oooooooooooo***********ooo**ooo*ooo****
  *ooooooo**ooo***********ooo**ooo*ooo****
  **ooooo***ooo***********oooooooo*ooo****
  ***oo*****oooo***ooo****oooooooo*o$o****
  ***********ooo**ooooo****oooooo**ooo****
  ***********ooo*ooooooo******oo**oooo****
  ***********ooo*ooo*oooo********oooo*****
  ***********ooo*ooo**ooo********ooo******
  ***********oooooo***oooo******ooo*******
  ************ooooo****oooooooooooo*******
  *************ooo******oooooooooo********
  ***********************oooooooo*********
  ***************************oo***********
  ****************************************
  ****************************************
  `,
  `
  ****************************************
  ****************************************
  ****************************************
  ************************oooooooo********
  **********************oooooooooooo******
  ********************ooooooooooooooo*****
  *******************ooooooooooooooooo****
  *****************oooooooooooooooooooo***
  ****************ooooooooo******oooooo***
  ***************oooooooo*********oooooo**
  **************ooooooo************ooooo**
  **************ooooo**************ooooo**
  *************oooooo**************ooooo**
  ************oooooo***************ooooo**
  ***********oooooo****************oo$oo**
  **********oooooo****************oooooo**
  *********oooooo*****************ooooo***
  ********oooooo*****************oooooo***
  *******oooooo******************ooooo****
  *******ooooo******************oooooo****
  ******oooooo******************ooooo*****
  *****oooooo******************oooooo*****
  *****ooooo*******************ooooo******
  ****oooooo******************oooooo******
  ****ooooo******************oooooo*******
  ***oooooo*****************oooooo********
  ***ooooo*****************oooooo*********
  ***ooooo****************oooooo**********
  **oooooo***************oooooo***********
  **ooooo***************oooooo************
  **ooooo**************oooooo*************
  **ooooo************ooooooo**************
  **ooooooo*********ooooooo***************
  ***ooooooooooooooooooooo****************
  ****ooooooooooooooooooo*****************
  *****ooooooooooooooooo******************
  ******oooooooooooooo********************
  ********ooooooooooo*********************
  ************oooo************************
  ************o***************************
  `,
]

export class RaceCar {
  public static config = {
    car: {
      height: 20,
      with: 12,
      direction: [0, -1],
      force: 0.1,
      rotate: 0.03,
      mass: 1,
    },
    wall: {
      height: 24,
      with: 24,
    },
    map: maps[0],
  }

  private static getPlayerPosition(): [x: number, y: number] {
    const chars = RaceCar.config.map
      .trim()
      .split('\n')
      .map((row) => row.trim().split(''))
    const y = chars.findIndex((row) => row.includes('$'))
    const x = chars[y].findIndex((char) => char === '$')
    return [x * RaceCar.config.wall.with, y * RaceCar.config.wall.height]
  }

  private chars = RaceCar.config.map
    .trim()
    .split('\n')
    .map((row) => row.trim().split(''))

  private walls = this.chars.map((row, rowIndex) => {
    const { wall } = RaceCar.config
    return row.map((char, colIndex) => {
      if (char !== '*') return null
      const x = colIndex * wall.with
      const y = rowIndex * wall.height
      return Bodies.rectangle(x, y, wall.with, wall.height, { isStatic: true, mass: 100, frictionStatic: 0, friction: 0, frictionAir: 0 })
    })
  })

  private playState = {
    accelerate: 0 as 0 | -1 | 1,
    rotate: 0 as 0 | -1 | 1,
  }

  private player = Bodies.rectangle(...RaceCar.getPlayerPosition(), RaceCar.config.car.height, RaceCar.config.car.with, {
    angle: -Math.PI / 2,
    mass: RaceCar.config.car.mass,
    frictionAir: 0.03,
  })

  private engine = Engine.create({ gravity: { x: 0, y: 0 } })
  private runner = Runner.create()
  private render: Render
  private playground: HTMLElement

  constructor(playground: HTMLElement) {
    this.playground = playground
    this.render = Render.create({
      element: playground,
      engine: this.engine,
      options: {
        height: this.chars.length * RaceCar.config.wall.height,
        width: this.chars[0].length * RaceCar.config.wall.with,
      },
    })
  }

  public start() {
    Composite.add(this.engine.world, [this.player, ...(this.walls.flat().filter(Boolean) as never)])
    Render.run(this.render)
    Runner.run(this.runner, this.engine)

    setInterval(() => {
      this.accelerate()
      this.rotate()
    }, 1000 / 60)
  }

  public stop() {
    Render.stop(this.render)
    Runner.stop(this.runner)
  }

  public setState(state: Partial<RaceCar['playState']>) {
    this.playState = { ...this.playState, ...state }
  }

  private accelerate() {
    const state = this.playState.accelerate
    const angle = this.player.angle
    const direction = [Math.cos(angle), Math.sin(angle)]

    const speed = this.player.velocity
    const velocity = {
      x: speed.x + direction[0] * state * RaceCar.config.car.force,
      y: speed.y + direction[1] * state * RaceCar.config.car.force,
    }

    Body.setVelocity(this.player, velocity)
  }

  private rotate() {
    const angular = this.player.angularVelocity
    Body.setAngularVelocity(this.player, this.playState.rotate * RaceCar.config.car.rotate - angular * 0.1)
  }

  public rebuild() {
    this.stop()
    this.playground.removeChild(this.playground.firstChild!)
    Object.assign(this, new RaceCar(this.playground))
    this.start()
  }
}
