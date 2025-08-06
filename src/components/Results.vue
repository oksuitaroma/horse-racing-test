<template>
  <div v-if="results.length" class=" result-block">
    <h2>Race Results</h2>
    <div class="race-results">
      <div v-for="(result, index) in results" :key="index" class="result-block">
        <h3>Round {{ result.round }} — Top 3</h3>
        <div v-for="(horse, index) in result.result.slice(0, 3)" :key="horse.id">
          <span class="badge">{{ ['🥇', '🥈', '🥉'][index] }}</span>
          <span class="horse-name">{{ horse.name }}</span>
          <span class="condition">({{ horse.condition }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const results = computed(() => store.state.results)

</script>

<style scoped>
.race-results {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}
.result-block {
  margin-bottom: 16px;
}
.badge {
  margin-right: 8px;
}
.horse-name {
  font-weight: bold;
}
.condition {
  margin-left: 6px;
  color: #777;
}
</style>
