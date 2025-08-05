import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoundRunner } from './useRoundRunner'

export function useGameRunner() {
  const isStopped = ref(false)
  const store = useStore()
  const runRound = useRoundRunner()

  const start = async () => {
    isStopped.value = false
    store.commit('setIsRunning', true)

    for (let i = store.state.currentRound; i < store.state.races.length; i++) {
      if (isStopped.value) break

      store.commit('setCurrentRound', i)
      const round = store.state.races[i]

      const isRoundFinished = round.participants.every(h => h.progress >= 100)
      if (isRoundFinished) continue

      const result = await runRound(round, isStopped)

      if (!result) break
      store.commit('addResult', { round: i + 1, result })

      await new Promise(resolve => setTimeout(resolve, 500))
    }

    store.commit('setIsRunning', false)
  }

  const stop = () => {
    isStopped.value = true
    store.commit('setIsRunning', false)
  }

  const reset = () => {
    isStopped.value = true
    store.commit('resetGame')
    store.commit('setIsRunning', false)
  }

  return {
    start,
    stop,
    reset,
    isStopped
  }
}
