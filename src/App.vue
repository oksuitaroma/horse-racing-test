<template>
  <div class="app">
    <h1>🏇 Horse Racing Game</h1>
    <div class="layout">
      <div class="column left">
        <HorseList />
      </div>
      <div class="column center">
        <h2> Race </h2>
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
  --app-padding: 20px;
  --layout-gap: 16px;
  --left-column-width: 250px;
  --right-column-width: 200px;
  font-family: Arial, sans-serif;
  padding: var(--app-padding);
  max-width: 1400px;
  margin: 0 auto;
}
.layout {
  display: flex;
  gap: var(--layout-gap);
  flex-wrap: wrap;
}
.column {
  flex: 1;
}
.left {
  max-width: var(--left-column-width);
}
.right {
  max-width: var(--right-column-width);
}
@media (max-width: 1024px) {
  .app {
    --app-padding: 10px;
    --left-column-width: 50%;
    --right-column-width: 50%;
  }
  .center {
    max-width: 100%;
    width: 100%;
    flex: none;
  }
  .left {
    order: 2;
  }
  .right {
    order: 3;
  }
}
</style>
