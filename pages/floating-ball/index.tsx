import { Component, Vue } from 'vue-property-decorator'
import { FloatingBall } from './main'

@Component
export default class extends Vue {
  private ball = new FloatingBall()

  public mounted() {
    this.ball.position.x = window.innerWidth / 2
    this.ball.position.y = window.innerHeight / 2

    this.ball.start()
  }

  public beforeDestroy() {
    this.ball.stop()
  }

  private Ball() {
    return (
      <div
        style={{
          position: 'fixed',
          width: '42px',
          height: '42px',
          top: `${this.ball.position.y - 21}px`,
          left: `${this.ball.position.x - 21}px`,
          borderRadius: '50%',
          backgroundColor: '#bfbfbf',
        }}
      ></div>
    )
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
        <span>按住鼠标，小球自会飞向你</span>
      </div>
    )
  }

  public render() {
    return (
      <div>
        {this.Tips()}
        {this.Ball()}
      </div>
    )
  }
}
