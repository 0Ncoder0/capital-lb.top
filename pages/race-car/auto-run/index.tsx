import { Component, Vue } from 'vue-property-decorator'
import { AI, RaceCar, Sensor, maps } from '../-main'

@Component
export default class extends Vue {
  public mounted() {
    RaceCar.config.map = maps[1]
    const instance = new RaceCar(this.$refs.container as HTMLDivElement)
    const sensor = new Sensor(instance)
    const ai = new AI(instance, sensor)
    instance.start()
  }

  public render() {
    return (
      <div>
        <div ref="container" style="display:flex;margin-top:120px;justify-content:center"></div>
      </div>
    )
  }
}
