import { Component, Vue } from 'vue-property-decorator'
import { RaceCar } from './-main'

@Component
export default class extends Vue {
  public instance = new RaceCar()

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
    this.instance.setPlayground(window.document.body)
  }

  public render() {
    return <div></div>
  }
}
