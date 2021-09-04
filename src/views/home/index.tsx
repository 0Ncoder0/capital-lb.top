import { Vue, Component } from "vue-property-decorator";
import HelloWorld from "@/components/hello-world";
@Component({
  components: { HelloWorld },
})
export default class About extends Vue {
  render() {
    return (
      <div class="home">
        <img alt="Vue logo" src={require("@/assets/logo.png")} />
        <hello-world msg="Welcome to Your Vue.js App" />
      </div>
    );
  }
}
