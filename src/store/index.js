import { createStore } from 'vuex'
import { 
  RANDOM_COLOR_CHARS, 
  RANDOM_COLOR_CHARS_LENGTH,
  COLOR_HEX_LENGTH,
  TOTAL_HORSES, 
  RACE_DISTANCES, 
  HORSES_PER_RACE, 
  PROGRESS_MAX,
  ID_RANDOM_SLICE_START,
  ID_RANDOM_SLICE_END,
  RANDOM_BASE
} from '../constants'

function getRandomColor() {
  return '#' + Array.from({ length: COLOR_HEX_LENGTH }).map(() => RANDOM_COLOR_CHARS[Math.floor(Math.random() * RANDOM_COLOR_CHARS_LENGTH)]).join('')
}

function generateHorses() {
  return Array.from({ length: TOTAL_HORSES }).map((_, i) => ({
    staticId: i + 1,
    name: `Horse ${i + 1}`,
    color: getRandomColor(),
    condition: Math.floor(Math.random() * PROGRESS_MAX) + 1,
    progress: 0
  }))
}

export default createStore({
  state: {
    isRunning: false,
    horses: [],
    races: [],
    results: [],
    currentRound: 0
  },
  mutations: {
    setIsRunning(state, value) {
      state.isRunning = value
    },
    setCurrentRound(state, round) {
      state.currentRound = round
    },
    setHorses(state, horses) {
      state.horses = horses
    },
    setRaces(state, races) {
      state.races = races
    },
    resetGame(state) {
      state.horses = []
      state.races = []
      state.results = []
      state.currentRound = 0
    },
    addResult(state, result) {
      state.results.push(result)
      state.currentRound++
    }
  },
  actions: {
    generateHorses({ commit }) {
      const horses = generateHorses()
      commit('setHorses', horses)
    },
    generateRaces({ state, commit }) {
      const races = RACE_DISTANCES.map(dist => ({
        distance: dist,
        participants: [...state.horses]
            .sort(() => 0.5 - Math.random())
            .slice(0, HORSES_PER_RACE)
            .map(h => ({
              ...h,
              id: h.staticId + '-' + Math.random().toString(RANDOM_BASE).slice(ID_RANDOM_SLICE_START, ID_RANDOM_SLICE_END),
              progress: 0
            }))
      }))
      commit('setRaces', races)
    }
  }
})