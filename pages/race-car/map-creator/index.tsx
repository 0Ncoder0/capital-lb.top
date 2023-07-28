import { Button, Input } from 'ant-design-vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  private isMouseDown = false
  private state: '*' | 'o' | '$' = '*'
  private map: string[][] = []
  private size = {
    width: 20,
    height: 20,
    print: 1,
  }

  private state2color = new Map([
    ['*', 'black'],
    ['o', 'gray'],
    ['$', 'red'],
  ])

  public created() {
    const storedMap = sessionStorage.getItem('race-car-map') as string
    if (storedMap) this.setMap(storedMap)
    else this.generateMap()

    window.addEventListener('mousedown', () => (this.isMouseDown = true))
    window.addEventListener('mouseup', () => (this.isMouseDown = false))
    ;(window as any).setMap = this.setMap
  }

  private setMap(map: string) {
    this.map = map.split('\n').map((row) => row.trim().split(''))
    this.size.height = this.map.length
    this.size.width = this.map[0].length
  }

  private toRaceCar() {
    sessionStorage.setItem('race-car-map', this.map.map((row) => row.join('')).join('\n'))
    this.$router.push({ name: 'race-car' })
  }

  private generate() {
    const map = this.map.map((row) => row.join('')).join('\n')
    // eslint-disable-next-line no-console
    console.log(map)
    alert('请在控制台查看生成的配置')
  }

  private generateMap() {
    this.map = Array.from({ length: this.size.height }, () => Array.from({ length: this.size.width }, () => '*'))
  }

  private onBlockClick(x: number, y: number) {
    for (let i = 0; i < this.size.print; i++) {
      this.map[y][x + i] = this.state
      this.map[y][x - i] = this.state
      this.map[y + i][x] = this.state
      this.map[y - i][x] = this.state
    }
    this.map = [...this.map]
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
          使用 * o $ 生成地图, 玩家初始状态为向上
          <br />
          控制台使用 setMap(map) 设置地图
        </span>
      </div>
    )
  }

  public render() {
    return (
      <div>
        {this.Tips()}
        <div style="height:120px"></div>
        <div style="display:flex;align-items:center;justify-content:center;gap:12px">
          <span>当前选中:</span>
          <div style={`height:24px;width:24px;opacity:0.7;background:${this.state2color.get(this.state)}`}></div>
          <Button on-click={() => (this.state = '*')} disabled={this.state === '*'}>
            <span>墙</span>
          </Button>
          <Button on-click={() => (this.state = 'o')} disabled={this.state === 'o'}>
            <span>路</span>
          </Button>
          <Button on-click={() => (this.state = '$')} disabled={this.state === '$'}>
            <span>玩家</span>
          </Button>
          <Button on-click={this.toRaceCar}>
            <span>测试地图</span>
          </Button>
          <Button on-click={this.generate}>
            <span style="color:#4690f7">生成配置</span>
          </Button>
        </div>
        <div style="height:24px"></div>
        <div style="display:flex;align-items:center;justify-content:center;gap:12px">
          <span>地图大小:</span>
          <Input style="width:120px" v-model={this.size.height} type="number" placeholder="height" />
          <Input style="width:120px" v-model={this.size.width} type="number" placeholder="width" />
          <Button on-click={this.generateMap}>生成地图</Button>
          <span>刷子:</span>
          <Input style="width:120px" v-model={this.size.print} type="number" placeholder="height" />
        </div>
        <div style="height:24px"></div>
        <div>
          {this.map.map((row, rowIndex) => (
            <div style="display:flex;justify-content:center">
              {row.map((item, colIndex) => (
                <div
                  style={`height:24px;width:24px;opacity:0.7;background:${this.state2color.get(item)};border:1px dashed white`}
                  on-click={() => this.onBlockClick(colIndex, rowIndex)}
                  on-mousemove={() => this.isMouseDown && this.onBlockClick(colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
