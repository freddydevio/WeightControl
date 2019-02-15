<template>
  <div class="current-weight">
    <span class="label">{{$t('currentWeightText')}}</span>
    <span class="weight">{{weight|weightFormat}}</span>
  </div>
</template>

<script>
const WEIGHT_TYPE = 'kg'
const CURRENT_WEIGHT_STORE_KEY = 'CURRENT_WEIGHT_STORE'

export default {
  name: 'CurrentWeight',
  mounted() {
    this.getData()
    this.$eventBus.$on('refreshData', this.getData)
  },
  methods: {
    getData() {
      let data = this.$storageHandler.get(CURRENT_WEIGHT_STORE_KEY, 0)
      this.weight = data.weight
    }
  },
  filters: {
    weightFormat(value) {
      return value + ' ' + WEIGHT_TYPE
    }
  },
  data() {
    return {
      weight: 0
    }
  }
}
</script>

<style lang="less" scoped>
  .current-weight {
    display: flex;
    flex-direction: column;
    align-items: center;
    .label {
      font-weight: normal;
      font-size: 1.1rem;
      color: #2f3640;
    }
    .weight {
      font-weight: lighter;
      font-size: 4.5rem;
      color: #00a8ff;
    }
  }
</style>
