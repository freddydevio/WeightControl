<template>
  <div class="current-weight-target">
    <span class="help-text">{{$t('currentWeightHelpText')}}</span>
    <span class="text">{{currentWeightTarget|weightFormat}}</span>
  </div>
</template>

<script>
const WEIGHT_TYPE = 'kg'
const TARGET_WEIGHT_STORE_KEY = 'TARGET_WEIGHT_STORE'

export default {
  name: 'CurrentWeightTarget',
  mounted() {
    this.refresh()

    this.$eventBus.$on('refresh', this.refresh)
  },
  filters: {
    weightFormat(value) {
      return value + ' ' + WEIGHT_TYPE
    }
  },
  methods: {
    refresh() {
      this.currentWeightTarget = this.$storageHandler.get(TARGET_WEIGHT_STORE_KEY, 0).target;
    }
  },
  data() {
    return {
      currentWeightTarget: 0
    }
  }
}
</script>

<style lang="less" scoped>
  .current-weight-target {
    .help-text,
    .text {
      display: block;
      color: white;
    }
    .help-text {
      font-size: .95rem;
    }
    .text {
      font-size: 3rem;
    }
  }
</style>
