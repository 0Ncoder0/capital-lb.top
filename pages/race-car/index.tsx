import { Component, Vue } from 'vue-property-decorator'
import { RaceCar } from './-main'

@Component
export default class extends Vue {
  public instance!: RaceCar

  public created() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'KeyW':
          return this.instance.setState({ accelerate: 1 })
        case 'KeyS':
          return this.instance.setState({ accelerate: -1 })
        case 'KeyA':
          return this.instance.setState({ rotate: -1 })
        case 'KeyD':
          return this.instance.setState({ rotate: 1 })
      }
    })

    window.addEventListener('keyup', (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'KeyS':
          return this.instance.setState({ accelerate: 0 })
        case 'KeyA':
        case 'KeyD':
          return this.instance.setState({ rotate: 0 })
      }
    })
  }

  public mounted() {
    const storedMap = sessionStorage.getItem('race-car-map') as string
    if (storedMap) RaceCar.config.map = storedMap

    this.instance = new RaceCar(this.$refs.container as HTMLDivElement)
    this.instance.start()
    ;(window as any).config = RaceCar.config
    ;(window as any).rebuild = () => this.instance.rebuild()
  }

  private Tips() {
    return (
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          opacity: '0.3',
        }}
      >
        <span>
          按住 W 加速，按住 A D 转向
          <br />
          控制台输入 config 修改配置, rebuild() 使用配置
          <br />
          config.map 中 * 是墙, o 是路, $ 是玩家, 玩家初始状态为向上
        </span>
      </div>
    )
  }

  public render() {
    return (
      <div>
        {this.Tips()}
        <div ref="container" style="display:flex;margin-top:120px;justify-content:center"></div>
      </div>
    )
  }
}
