export function useRoundRunner({ baseTime = 2.5, min = 1.2, max = 6.0 } = {}) {
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
  }

  return async function runRound(round, abortRef) {
    const stepTime = 50
    let runningCount = 0

    round.participants.forEach((h) => {
      if (h.progress >= 100) return

      if (h.elapsed == null) h.elapsed = 0
      if (h.speed == null) {
        const rawSpeed = baseTime * (100 / h.condition)
        h.speed = clamp(rawSpeed, min, max)
      }

      runningCount++
    })

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (abortRef?.value) {
          round.participants.forEach(h => h.stopped = true)
          clearInterval(interval)
          resolve(null)
          return
        }

        round.participants.forEach((h) => {
          if (h.progress >= 100) return

          h.elapsed += stepTime
          h.progress = Math.min((h.elapsed / (h.speed * 1000)) * 100, 100)

          if (h.progress >= 100) {
            runningCount--
          }
        })

        if (runningCount <= 0) {
          clearInterval(interval)
          const sorted = [...round.participants].sort((a, b) => a.elapsed - b.elapsed)
          resolve(sorted)
        }
      }, stepTime)
    })
  }
}
