<template>
  <div class="target-button">
    <div class="toggle-button" v-on:click="toggle">
      <i class="fa fa-bullseye" aria-hidden="true"></i>
    </div>
    <transition name="slide-right-view">
      <Target v-if="showTarget"/>
    </transition>
  </div>
</template>

<script>
import Target from "@/components/Target";
export default {
  name: 'TargetButton',
  components: {Target},
  mounted() {
    this.$eventBus.$on('toggleTargetView', this.toggle)
  },
  methods: {
    toggle() {
      this.showTarget = !this.showTarget
    }
  },
  data() {
    return {
      showTarget: false
    }
  }
}
</script>

<style lang="less" scoped>
  .target-button {
    .toggle-button {
      position: fixed;
      top: 1rem;
      left: 1rem;
      color: lighten(#2f3640, 40);
      font-size: 2rem;
      padding: .5rem;
    }
  }
</style>
