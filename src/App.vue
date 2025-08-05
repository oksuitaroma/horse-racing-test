<template>
  <div class="app">
    <h1>🏇 Horse Racing Game</h1>
    <div class="layout">
      <div class="column left">
        <HorseList />
      </div>
      <div class="column center">
        <GameControls
          :isRunning="store.state.isRunning"
          @generate="handleGenerate"
          @start="start"
          @stop="stop"
          @reset="handleReset"
        />
        <RaceTrack @reset="handleReset" />
        <Results />
      </div>
      <div class="column right">
        <Program />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useGameRunner } from './composables/useGameRunner'

import GameControls from './components/Controls.vue'
import RaceTrack from './components/race/RaceTrack.vue'
import Results from './components/Results.vue'
import HorseList from './components/HorseList.vue'
import Program from './components/Program.vue'

const store = useStore()
const { start, stop, reset } = useGameRunner()

const handleGenerate = () => {
  store.dispatch('generateHorses')
  store.dispatch('generateRaces')
}

const handleReset = () => {
  reset()
  store.dispatch('generateHorses')
  store.dispatch('generateRaces')
}
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.layout {
  display: flex;
  gap: 16px;
}
.column {
  flex: 1;
}
.left {
  max-width: 300px;
}
.right {
  max-width: 200px;
}
</style>
