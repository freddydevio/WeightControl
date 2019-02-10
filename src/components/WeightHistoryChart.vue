<template>
  <div class="weight-history-chart">
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
  import moment from 'moment'

  const WEIGHT_TYPE = 'kg'
  const WEIGHT_ENTRIES_STORE_KEY = 'WEIGHT_ENTRIES_STORE'

  export default {
    name: 'WeightHistoryChart',
    mounted() {
      this.getData()
      this.createChart()

      this.$eventBus.$on('refreshData', this.getData)
      this.$eventBus.$on('refreshData', this.createChart)
    },
    methods: {
      formatDate(value) {
        return moment(value).format('DD.MM.YYYY')
      },
      weightFormat(value) {
        return value + ' ' + WEIGHT_TYPE
      },
      getData() {
        this.historyData = this.$storageHandler.get(WEIGHT_ENTRIES_STORE_KEY)
      },
      createChart() {
        let ctx = document.getElementById("myChart");

        let myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.historyData.map(a => this.formatDate(a.date)),
            datasets: [{
              label: '# of Votes',
              data: this.historyData.map(a => a.weight),
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  min: 80,
                  beginAtZero: false
                }
              }]
            }
          }
        });

      }
    },
    data() {
      return {
        historyData: []
      }
    }
  }
</script>

<style lang="less" scoped>
  .weight-history-chart {
  }
</style>
