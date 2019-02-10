<template>
  <div class="index">
    <div class="add-entry" v-on:click="toggleNewEntry">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </div>
    <div class="upper">
      <CurrentWeight/>
      <LastWeightDecreased/>
    </div>
    <div class="bottom">
      <WeightHistoryChart/>
    </div>
    <transition name="slide-view">
      <NewEntry v-if="weightEntryToggled"/>
    </transition>
    <FirstRun/>
  </div>
</template>

<script>
  import CurrentWeight from "@/components/CurrentWeight";
  import LastWeightDecreased from "@/components/LastWeightDecreased";
  import WeightHistoryChart from "@/components/WeightHistoryChart";
  import NewEntry from "@/components/NewEntry";
  import FirstRun from "@/components/FirstRun";
  export default {
    name: 'Index',
    components: {FirstRun, NewEntry, WeightHistoryChart, LastWeightDecreased, CurrentWeight},
    mounted() {
      this.$eventBus.$on('toggleWeightEntryView', this.toggleNewEntry)
    },
    methods: {
      toggleNewEntry() {
        this.weightEntryToggled = !this.weightEntryToggled
      }
    },
    data() {
      return {
        weightEntryToggled: false,
      }
    }
  }
</script>

<style lang="less">
  .index {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 1rem;
    .add-entry {
      position: fixed;
      top: 1rem;
      right: 1rem;
      color: lighten(#2f3640, 40);
      font-size: 2rem;
      padding: .5rem;
    }
  }

  .slide-view-enter-active, .slide-view-leave-active {
    transition: all .2s;
  }
  .slide-view-enter, .slide-view-leave-to {
    transform: translateX(100%);
  }
</style>
