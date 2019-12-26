<template lang="pug">
  .home
    ChosenOne(:status="active===0?'active':''" :index='0' :height='600' :width='400' :left='-250' :z-index='1' @click='chose(0)' )
    ChosenOne(:status="active===1?'active':''" :index='1' :height='600' :width='400' :left='+250' :z-index='1' @click='chose(1)')
</template>
<style lang="scss" scoped>
</style>
<script lang="ts">
import ChosenOne from "../components/chosenOne.vue";
export default {
  name: "Home",
  components: { ChosenOne },
  data() {
    return {
      active: "1"
    };
  },
  mounted() {},
  methods: {
    chose(index) {
      this.active === index ? (this.active = "") : (this.active = index);
    }
  }
};
</script>
