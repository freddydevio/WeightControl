<template>
  <div class="new-entry">
    <div class="go-back" v-on:click="goBack">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </div>
    <form v-on:submit="submitForm">
      <span class="current-date">{{currentDate|formatDate}}</span>
      <input type="number" pattern="\d*" v-model="weight" min="0" max="300" step="0.1">
      <input type="submit" :value="$t('addEntryButtonText')">
    </form>
  </div>
</template>

<script>
  import moment from 'moment'

  const WEIGHT_TYPE = 'kg'
  const WEIGHT_ENTRIES_STORE_KEY = 'WEIGHT_ENTRIES_STORE'
  const CURRENT_WEIGHT_STORE_KEY = 'CURRENT_WEIGHT_STORE'

  export default {
    name: 'NewEntry',
    filters: {
      weightFormat(value) {
        return value + ' ' + WEIGHT_TYPE
      },
      formatDate(value) {
        return moment(value).locale(navigator.languages[0]).format('dddd, DD.MM.YYYY')
      }
    },
    mounted() {
      this.currentDate = moment()
    },
    methods: {
      goBack() {
        this.$eventBus.$emit('toggleWeightEntryView')
      },
      submitForm(event) {
        event.preventDefault()

        this.$storageHandler.add(WEIGHT_ENTRIES_STORE_KEY, {
          weight: this.weight,
          date: this.currentDate
        })

        this.$storageHandler.set(CURRENT_WEIGHT_STORE_KEY, {
          weight: this.weight
        })

        this.weight = 0
        this.currentDate = {}
        this.goBack()

        this.$eventBus.$emit('refreshData')
      }
    },
    data() {
      return {
        weight: 0,
        currentDate: {}
      }
    }
  }
</script>

<style lang="less" scoped>
  .new-entry {
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
      left: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .current-date {
        color: white;
        margin: 1rem 0;
      }
      input[type=number] {
        outline: none;
        border: none;
        padding: .5rem 2rem;
        font-size: 2rem;
        margin: .5rem 0;
        background: transparent;
        color: white;
        border-bottom: .2rem solid white;
        -webkit-appearance: none;
      }
      input[type=submit] {
        outline: none;
        margin: .5rem 0;
        border: none;
        background: white;
        color: black;
        padding: .5rem 2rem;
        border-radius: 1rem;
        -webkit-appearance: none;
      }
    }
  }
</style>
