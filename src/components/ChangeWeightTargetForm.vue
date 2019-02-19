<template>
  <div class="current-weight-target-form">
    <span class="help-text">{{$t('changeWeightTargetHelpText')}}</span>
    <form v-on:submit="submitForm">
      <input type="number" pattern="\d*" v-model="weight" min="0" max="300" step="0.1" :disabled="!editingWeightPossible">
      <input type="submit" :value="$t('changeWeightTargetFormButtonText')" v-if="editingWeightPossible">
    </form>
  </div>
</template>

<script>
import moment from 'moment'

const TARGET_WEIGHT_STORE_KEY = 'TARGET_WEIGHT_STORE'
const MINIMUM_DATE_UPDATE = 7

export default {
  name: 'ChangeWeightTargetForm',
  mounted() {
    let lastEntry = this.$storageHandler.get(TARGET_WEIGHT_STORE_KEY, 0);
    this.weight = lastEntry.target

    this.editingWeightPossible = moment(lastEntry.lastUpdate).diff(moment(), 'days') >= MINIMUM_DATE_UPDATE
  },
  methods: {
    submitForm(event) {
      event.preventDefault()

      this.$storageHandler.set(TARGET_WEIGHT_STORE_KEY, {
        target: this.weight,
        lastUpdate: this.currentDate
      })

      this.editingWeightPossible = false
      this.$eventBus.$emit('refresh')
    }
  },
  filters: {
    weightFormat(value) {
      return value + ' ' + WEIGHT_TYPE
    }
  },
  data() {
    return {
      weight: 0,
      editingWeightPossible: false,
      currentDate: moment()
    }
  }
}
</script>

<style lang="less" scoped>
  .current-weight-target-form {
    .help-text {
      font-size: .95rem;
      color: white;
      padding: 0 1rem;
      display: block;
      text-align: center;
      margin-top: 2rem;
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
