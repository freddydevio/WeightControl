<template>
  <div class="last-weight-decreased">
    <span class="weight">{{lastWeight|weightFormat}}</span>
    <span class="label">Last weight decreased to {{lastWeightEntry.date|formatDate}}</span>
  </div>
</template>

<script>
import moment from 'moment'

const WEIGHT_TYPE = 'kg'
const CURRENT_WEIGHT_STORE_KEY = 'CURRENT_WEIGHT_STORE'
const WEIGHT_ENTRIES_STORE_KEY = 'WEIGHT_ENTRIES_STORE'

export default {
  name: 'LastWeightDecreased',
  mounted() {
    this.getData()
    this.$eventBus.$on('refreshData', this.getData)
  },
  methods: {
    getData() {
      let data = this.$storageHandler.get(CURRENT_WEIGHT_STORE_KEY, 0)
      let currentWeight = data.weight

      let historyData = this.$storageHandler.get(WEIGHT_ENTRIES_STORE_KEY, [])

      if(historyData.length > 1) {
        let lastData = historyData[historyData.length - 2]

        this.lastWeight = currentWeight - lastData.weight
        this.lastWeightEntry = lastData
      }
    }
  },
  filters: {
    weightFormat(value) {
      return (value > 0 ? '+ ':'') + (value.toFixed(1) + ' ' + WEIGHT_TYPE)
    },
    formatDate(value) {
      return moment(value).format('dddd, DD.MM.YYYY')
    }
  },
  data() {
    return {
      lastWeight: 0,
      lastWeightEntry: {}
    }
  }
}
</script>

<style lang="less" scoped>
  .last-weight-decreased {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: .6;
    .label {
      font-weight: bolder;
      font-size: .7rem;
      color: #2f3640;
    }
    .weight {
      font-weight: normal;
      font-size: 1.4rem;
      color: #2f3640;
    }
  }
</style>
