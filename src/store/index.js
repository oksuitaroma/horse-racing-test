import { createStore } from 'vuex'

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  return '#' + Array.from({ length: 6 }).map(() => letters[Math.floor(Math.random() * 16)]).join('')
}

function generateHorses() {
  return Array.from({ length: 20 }).map((_, i) => ({
    staticId: i + 1,
    name: `Horse ${i + 1}`,
    color: getRandomColor(),
    condition: Math.floor(Math.random() * 100) + 1,
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
      const distances = [1200, 1400, 1600, 1800, 2000, 2200]
      const races = distances.map(dist => ({
        distance: dist,
        participants: [...state.horses]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10)
            .map(h => ({
              ...h,
              id: h.staticId + '-' + Math.random().toString(36).slice(2, 6),
              progress: 0
            }))
      }))
      commit('setRaces', races)
    }
  }
})