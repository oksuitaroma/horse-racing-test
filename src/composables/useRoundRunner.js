export function useRoundRunner({ baseTime = 2.5, min = 1.2, max = 6.0 } = {}) {
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

  const initializeHorse = (horse) => {
    if (horse.progress >= 100) return false

    horse.elapsed ??= 0
    if (horse.speed == null) {
      const rawSpeed = baseTime * (100 / horse.condition)
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

      const step = (now) => {
        if (abortRef?.value) {
          round.participants.forEach(h => h.stopped = true)
          resolve(null)
          return
        }

        const delta = now - lastTime
        lastTime = now

        let allFinished = true

        horses.forEach((h) => {
          if (h.progress >= 100) return

          h.elapsed += delta
          h.progress = Math.min((h.elapsed / (h.speed * 1000)) * 100, 100)

          if (h.progress < 100) {
            allFinished = false
          }
        })

        if (allFinished) {
          const sorted = [...round.participants].sort((a, b) => a.elapsed - b.elapsed)
          resolve(sorted)
        } else {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    })
  }
}
