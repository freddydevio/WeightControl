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
              data: this.historyData.map(a => a.weight),
              borderWidth: 1,
              borderColor: "#80b6f4",
              pointBorderColor: "#80b6f4",
              pointBackgroundColor: "#80b6f4",
              pointHoverBackgroundColor: "#80b6f4",
              pointHoverBorderColor: "#80b6f4",
              pointBorderWidth: 10,
              pointHoverRadius: 10,
              pointHoverBorderWidth: 1,
              pointRadius: 1,
              fill: false,
            }]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                labelColor: function(tooltipItem, chart) {
                  return false
                },
              }
            },
            scales: {
              yAxes: [{
                ticks: {
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
