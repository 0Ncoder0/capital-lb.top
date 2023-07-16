import { Component, Vue } from 'vue-property-decorator'
import { ISeeYou } from './-main'

@Component
export default class extends Vue {
  private iSeeYou = new ISeeYou({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  })

  public mounted() {
    this.iSeeYou.start()
  }

  public beforeDestroy() {
    this.iSeeYou.stop()
  }

  public render() {
    return (
      <div>
        {this.iSeeYou.circles.map((circle) => {
          const borderWidth = circle.depth * 10 + 3
          const opacity = circle.depth
          return (
            <div
              style={{
                position: 'fixed',
                top: circle.center.y - circle.radius + 'px',
                left: circle.center.x - circle.radius + 'px',
                width: circle.radius * 2 + 'px',
                height: circle.radius * 2 + 'px',
                borderRadius: '50%',
                border: `${borderWidth}px solid #40a9ff`,
                opacity: opacity + '',
              }}
            ></div>
          )
        })}
      </div>
    )
  }
}
