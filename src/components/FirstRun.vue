<template>
  <div class="first-run" v-if="firstRun">
    <form v-on:submit="submitForm">
      <span class="form-label">Your start weight</span>
      <input type="number" v-model="startWeight" min="0" max="300" step="0.1">
      <span class="form-label">Your target weight</span>
      <input type="number" v-model="targetWeight" min="0" max="300" step="0.1">
      <input type="submit" value="Start now">
    </form>
  </div>
</template>

<script>
  const WEIGHT_TYPE = 'kg'
  const WEIGHT_ENTRIES_STORE_KEY = 'WEIGHT_ENTRIES_STORE'
  const CURRENT_WEIGHT_STORE_KEY = 'CURRENT_WEIGHT_STORE'
  const FIRST_RUN_STORE_KEY = 'FIRST_RUN_STORE'
  const TARGET_WEIGHT_STORE_KEY = 'TARGET_WEIGHT_STORE'

  import moment from 'moment'

  export default {
    name: 'FirstRun',
    mounted() {
      this.firstRun = !this.$storageHandler.exist(FIRST_RUN_STORE_KEY)
    },
    filters: {
      weightFormat(value) {
        return value + ' ' + WEIGHT_TYPE
      }
    },
    methods: {
      submitForm(event) {
        event.preventDefault()

        this.$storageHandler.add(WEIGHT_ENTRIES_STORE_KEY, {
          weight: this.startWeight,
          date: moment()
        })

        this.$storageHandler.set(CURRENT_WEIGHT_STORE_KEY, {
          weight: this.startWeight
        })

        this.$storageHandler.set(FIRST_RUN_STORE_KEY, {
          success: true
        })

        this.$storageHandler.set(TARGET_WEIGHT_STORE_KEY, {
          target: this.targetWeight
        })

        this.firstRun = false
        this.$eventBus.$emit('refreshData')
      }
    },
    data() {
      return {
        startWeight: 0,
        targetWeight: 0,
        firstRun: false,
      }
    }
  }
</script>

<style lang="less" scoped>
  .first-run {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background: #192a56;
    padding: 1rem;
    height: 100vh;
    width: 100%;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .form-label {
        color: white;
        margin: .5rem 0;
        font-size: 1.2rem;
        font-weight: lighter;
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
