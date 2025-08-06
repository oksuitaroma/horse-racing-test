<template>
  <div class="race-track">
    <div v-if="gameFinished">
      <div class="race-track__winner">
        <h2>🎉 Winner: {{ leaderboard[0].name }} 🎉</h2>
        <button @click="$emit('reset')">Play Again</button>
      </div>
      <div v-if="leaderboard.length" class="race-track__leaderboard">
        <h2>🏆 Final Leaderboard</h2>
        <ol>
          <li v-for="(horse, index) in leaderboard" :key="index">
            {{ horse.name }} — {{ horse.points }} pts
          </li>
        </ol>
      </div>
    </div>
    <div class="race-track__round" v-else-if="currentRace">
      <h2 class="race-track__title">Round {{ currentRound + 1 }} — {{ currentRace.distance }}m</h2>
      <div class="race-track__wrapper">
        <div class="race-track__track">
          <HorseLane
            v-for="(horse, index) in currentRace.participants"
            :key="horse.id"
            :horse="horse"
            :index="index"
          />
        </div>
        <div class="race-track__finish">
          <span>FINISH</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import HorseLane from './HorseLane.vue'

const emit = defineEmits(['reset'])

const store = useStore()
const currentRound = computed(() => store.state.currentRound)
const races = computed(() => store.state.races)
const currentRace = computed(() => races.value?.[currentRound.value] || null)
const results = computed(() => store.state.results)
const leaderboard = computed(() => {
  const score = {}
  results.value.forEach(round => {
    round.result.slice(0, 3).forEach((horse, i) => {
      const key = horse.name
      if (!score[key]) {
        score[key] = { name: horse.name, points: 0 }
      }
      score[key].points += [3, 2, 1][i] || 0
    })
  })
  return Object.values(score).sort((a, b) => b.points - a.points)
})
const gameFinished = computed(() => results.value.length === 6)
</script>

<style scoped>
.race-track {
  --track-padding: 10px;
  --track-margin-top: 10px;
  --title-font-size: 18px;
  --finish-line-width: 105px;
  --finish-font-size: 20px;
  --winner-margin-top: 20px;
  --winner-padding: 12px;
  --button-margin-top: 10px;
  --button-padding-v: 8px;
  --button-padding-h: 16px;
  --button-font-size: 16px;
  --leaderboard-margin-top: 20px;
  --leaderboard-padding-top: 10px;
  --leaderboard-border-width: 2px;
  
  padding: var(--track-padding);
  border: 2px dashed #ccc;
}
.race-track__round {
  margin-top: var(--track-margin-top);
}
.race-track__title {
  font-size: var(--title-font-size);
}
.race-track__wrapper {
  position: relative;
}
.race-track__track {
  display: flex;
  flex-direction: column;
  padding: var(--track-padding) 0;
}
.race-track__finish {
  z-index: -1;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--finish-line-width);
  background-color: peachpuff;
  color: white;
}
.race-track__finish span {
  display: inline-block;
  transform: rotate(-90deg);
  font-size: var(--finish-font-size);
}
.race-track__winner {
  margin-top: var(--winner-margin-top);
  padding: var(--winner-padding);
  border: 2px dashed #4CAF50;
  background-color: #eaffea;
  text-align: center;
}
.race-track__winner h2 {
  color: #2c662d;
}
.race-track__winner button {
  margin-top: var(--button-margin-top);
  padding: var(--button-padding-v) var(--button-padding-h);
  font-size: var(--button-font-size);
  cursor: pointer;
}
.race-track__leaderboard {
  margin-top: var(--leaderboard-margin-top);
  padding-top: var(--leaderboard-padding-top);
  border-top: var(--leaderboard-border-width) solid #ccc;
}

@media (max-width: 768px) {
  .race-track {
    --track-padding: 8px;
    --finish-line-width: 80px;
    --finish-font-size: 16px;
    --title-font-size: 16px;
    --winner-padding: 8px;
    --button-padding-v: 6px;
    --button-padding-h: 12px;
  }
  
  .race-track__winner h2 {
    font-size: 18px;
  }
}
</style>
