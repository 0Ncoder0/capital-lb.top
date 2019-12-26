<template lang="pug">
  //- .home(:style="{'width':windowWidth+'px','min-height':windowHeight+'px'}")
  .home(:class="active")
    .left-block(@click="choice('active-left')")
      .block left
    .right-block(@click="choice('active-right')")
      .block right
</template>
<style lang="scss" scoped>
$block-width: 300px;
.home {
  overflow-y: scroll;
  // non-active
  .left-block,
  .right-block {
    width: 1000px;
    height: 1500px;
    overflow: hidden;
    background-color: wheat;
    transform: scale(0.4, 0.4);
    position: absolute;
    top: -350px;
    transition: all 0.5s;
  }
  .left-block {
    left: auto;
    right: calc(50% - 200px);
  }
  .right-block {
    left: calc(50% - 200px);
  }
  // active
}
.home.active-left {
  .right-block {
    visibility: hidden;
  }
  .left-block {
    right: calc(50% - 500px);
    top: 0px;
    z-index: 10;
    transform: scale(1, 1);
  }
}
.home.active-right {
  .left-block {
    visibility: hidden;
  }
  .right-block {
    left: calc(50% - 500px);
    top: 0px;
    z-index: 10;
    transform: scale(1, 1);
  }
}
</style>
<script lang="ts">
// import { Component, Vue } from "vue-property-decorator";
// export default class App extends Vue {
//   private windowWidth = window.innerWidth;
//   private windowHeight = window.innerHeight;

//   mounted() {
//     console.log(this.windowWidth,this.windowHeight);
//   }
// }

export default {
  name: "Home",
  data() {
    return {
      active: "",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  },
  mounted() {},
  methods: {
    choice(cl) {
      this.active = this.active === cl ? "" : cl;
    }
  }
};
</script>
