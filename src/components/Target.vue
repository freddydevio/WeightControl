<template>
  <div class="target">
    <div class="go-back" v-on:click="goBack">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </div>
    <CurrentWeightTarget/>
    <ChangeWeightTargetForm/>
  </div>
</template>

<script>
  import CurrentWeightTarget from "@/components/CurrentWeightTarget";
  import ChangeWeightTargetForm from "@/components/ChangeWeightTargetForm";
  export default {
    name: 'Target',
    components: {ChangeWeightTargetForm, CurrentWeightTarget},
    methods: {
      goBack() {
        this.$eventBus.$emit('toggleTargetView')
      },
    }
  }
</script>

<style lang="less">
  .target {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #00B4DB;
    background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);
    background: linear-gradient(to right, #0083B0, #00B4DB);
    padding: 1rem;
    align-items: center;
    justify-content: center;
    z-index: 100;
    .go-back {
      font-size: 2rem;
      color: white;
      padding: .5rem;
      position: fixed;
      top: 1rem;
      right: 1rem;
    }
  }
</style>
