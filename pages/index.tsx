import { Component, Vue } from 'vue-property-decorator'
import { Button } from 'ant-design-vue'

@Component
export default class Index extends Vue {
  public routes = this.$router.options.routes

  public render() {
    return (
      <div style="display:grid;gap:12px;width:500px;margin:100px auto;">
        {this.routes?.map((route) => (
          <Button type="link" on-click={() => this.$router.push(route.path)}>
            {route.path}
          </Button>
        ))}
      </div>
    )
  }
}
