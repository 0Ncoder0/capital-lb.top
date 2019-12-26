<template lang='pug'>
  .app
    Home
</template>

<style lang="scss" >
body{
  padding: 0;
  margin: 0
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Home from "./views/Home.vue";

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {}
</script>
