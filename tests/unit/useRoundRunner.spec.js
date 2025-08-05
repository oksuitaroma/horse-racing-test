import { describe, it, expect, beforeEach } from 'vitest'
import { useRoundRunner } from '../../src/composables/useRoundRunner'

describe('useRoundRunner', () => {
  beforeEach(() => {
    global.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16)
  })

  it('should simulate race and return sorted results', async () => {
    const round = {
      participants: Array.from({ length: 3 }, (_, i) => ({
        condition: 80 + i * 10,
        progress: 0
      }))
    }

    const runRound = useRoundRunner()
    const result = await runRound(round, { value: false })

    expect(result).toHaveLength(3)
    expect(result[0].condition).toBeGreaterThanOrEqual(result[1].condition)
  })
})
