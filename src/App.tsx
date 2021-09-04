import { Vue, Component } from "vue-property-decorator";
import "./app.scss";

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <span> | </span>
          <router-link to="/about">About</router-link>
          <span> | </span>
          <router-link to="/graphql-example">GraphQL Example</router-link>
        </div>
        <router-view />
      </div>
    );
  }
}
