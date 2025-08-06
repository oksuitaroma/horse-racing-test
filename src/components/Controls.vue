<template>
  <div class="controls">
    <button v-if="!racesExist" @click="emit('generate')">Generate Races</button>
    <button v-if="racesExist" :disabled="isRunning" @click="emit('reset')">Reset Races</button>
    <button v-if="!isRunning && !isFinished" :disabled="!racesExist" @click="emit('start')">Start</button>
    <button v-else-if="isRunning" @click="emit('stop')">Stop</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const emit = defineEmits(['generate', 'start', 'stop', 'reset'])
const store = useStore()
const racesExist = computed(() => store.state.races.length > 0)
const isRunning = computed(() => store.state.isRunning);
const isFinished = computed(() => store.state.results.length === store.state.races.length)
</script>

<style scoped>
.controls {
  --controls-margin-bottom: 20px;
  margin-bottom: var(--controls-margin-bottom);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
button {
  cursor: pointer;
  padding: 6px 12px;
}
@media (max-width: 768px) {
  .controls {
    --controls-margin-bottom: 12px;
    justify-content: center;
  }
}
</style>
