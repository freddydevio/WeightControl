<template>
  <div class="new-entry-button">
    <div class="add-entry" v-on:click="toggleNewEntry">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </div>
    <transition name="slide-left-view">
      <NewEntry v-if="showNewEntry"/>
    </transition>
  </div>
</template>

<script>
import NewEntry from "@/components/NewEntry";
export default {
  name: 'NewEntryButton',
  components: {NewEntry},
  mounted() {
    this.$eventBus.$on('toggleWeightEntryView', this.toggleNewEntry)
  },
  methods: {
    toggleNewEntry() {
      this.showNewEntry = !this.showNewEntry
    }
  },
  data() {
    return {
      showNewEntry: false
    }
  }
}
</script>

<style lang="less" scoped>
  .new-entry-button {
    .add-entry {
      position: fixed;
      top: 1rem;
      right: 1rem;
      color: lighten(#2f3640, 40);
      font-size: 2rem;
      padding: .5rem;
    }
  }
</style>
