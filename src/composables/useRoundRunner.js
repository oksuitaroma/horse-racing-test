import { 
  DEFAULT_BASE_TIME,
  DEFAULT_MIN_SPEED,
  DEFAULT_MAX_SPEED,
  PROGRESS_MAX,
  MILLISECONDS_FACTOR
} from '../constants'

export function useRoundRunner({ 
  baseTime = DEFAULT_BASE_TIME, 
  min = DEFAULT_MIN_SPEED, 
  max = DEFAULT_MAX_SPEED 
} = {}) {
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

  const initializeHorse = (horse) => {
    if (horse.progress >= PROGRESS_MAX) return false

    horse.elapsed ??= 0
    if (horse.speed == null) {
      const rawSpeed = baseTime * (PROGRESS_MAX / horse.condition)
      horse.speed = clamp(rawSpeed, min, max)
    }
    return true
  }

  return async function runRound(round, abortRef) {
    const horses = round.participants.filter(initializeHorse)

    if (!horses.length) {
      return [...round.participants].sort((a, b) => a.elapsed - b.elapsed)
    }

    return new Promise((resolve) => {
      let lastTime = performance.now()
      let animationFrameId = null

      const step = (now) => {
        if (abortRef?.value) {
          round.participants.forEach(h => h.stopped = true)
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = null
          }
          resolve(null)
          return
        }

        const delta = now - lastTime
        lastTime = now

        let allFinished = true

        horses.forEach((h) => {
          if (h.progress >= PROGRESS_MAX) return

          h.elapsed += delta
          h.progress = Math.min((h.elapsed / (h.speed * MILLISECONDS_FACTOR)) * PROGRESS_MAX, PROGRESS_MAX)

          if (h.progress < PROGRESS_MAX) {
            allFinished = false
          }
        })

        if (allFinished) {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
          const sorted = [...round.participants].sort((a, b) => a.elapsed - b.elapsed)
          resolve(sorted)
        } else {
          animationFrameId = requestAnimationFrame(step)
        }
      }

      animationFrameId = requestAnimationFrame(step)
    })
  }
}
