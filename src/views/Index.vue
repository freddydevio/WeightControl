<template>
  <div class="index">
    <NewEntryButton/>
    <TargetButton/>
    <div class="upper">
      <CurrentWeight/>
      <LastWeightDecreased/>
    </div>
    <div class="bottom">
      <WeightHistoryChart/>
    </div>
    <FirstRun/>
  </div>
</template>

<script>
  import CurrentWeight from "@/components/CurrentWeight";
  import LastWeightDecreased from "@/components/LastWeightDecreased";
  import WeightHistoryChart from "@/components/WeightHistoryChart";
  import NewEntry from "@/components/NewEntry";
  import FirstRun from "@/components/FirstRun";
  import TargetButton from "@/components/TargetButton";
  import NewEntryButton from "@/components/NewEntryButton";
  export default {
    name: 'Index',
    components: {
      NewEntryButton,
      TargetButton, FirstRun, WeightHistoryChart, LastWeightDecreased, CurrentWeight},
  }
</script>

<style lang="less">
  .index {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 1rem;
  }

  .slide-left-view-enter-active,
  .slide-left-view-leave-active,
  .slide-right-view-enter-active,
  .slide-right-view-leave-active {
    transition: all .2s;
  }
  .slide-left-view-enter, .slide-left-view-leave-to {
    transform: translateX(100%);
  }
  .slide-right-view-enter, .slide-right-view-leave-to {
    transform: translateX(-100%);
  }
</style>
