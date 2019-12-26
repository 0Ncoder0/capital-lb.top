<template lang="pug">
  .chosen-one(:style="chosenOneStyle" @click='$emit("click")')
    div test
</template>
<style lang="scss" scoped>
.chosen-one {
  position: absolute;
  background-color: rgb(194, 204, 201);
  transition: all 0.5s;
  width: 1100px;
  // transform: scale(0.5,0.5);
}
</style>
<script lang="ts">
const width = 1100;
export default {
  name: "chosenOne",
  props: ["view", "status", "height", "width", "left", "top", "zIndex"], // status:[ active hidden ]
  data() {
    return {
      chosenOneStyle: {
        "min-height": window.innerHeight + "px",
        width: width + "px",
        left: 0,
        top: 0,
        transform: "",
        "z-index": 1
      },
      transformTimer: null
    };
  },
  watch: {
    async status(status, oldStatus) {
      clearTimeout(this.transformTimer);
      if (status === "active") {
        this.chosenOneStyle["z-index"] = this.zIndex + 1;
        this.transformTimer = setTimeout(() => {
          this.chosenOneStyle.transform = `scale(1,1)`;
          this.chosenOneStyle.top = 0;
          this.chosenOneStyle.left = (window.innerWidth - width) / 2 + "px";
        }, 1);
      } else {
        this.chosenOneStyle.left =
          (window.innerWidth - width) / 2 + this.left + "px";
        this.chosenOneStyle.transform = `scale(${this.width / width},${this
          .height / window.innerHeight})`;
        this.transformTimer = setTimeout(() => {
          this.chosenOneStyle["z-index"] = this.zIndex;
        }, 500);
      }
    }
  },
  mounted() {
    this.chosenOneStyle.left =
      (window.innerWidth - width) / 2 + this.left + "px";
    this.chosenOneStyle.transform = `scale(${this.width / width},${this.height /
      window.innerHeight})`;
    this.chosenOneStyle["z-index"] = this.zIndex;
    console.log(this.$props);
  }
};
</script>
