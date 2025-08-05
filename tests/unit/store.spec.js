import { describe, it, expect } from 'vitest'
import store from '../../src/store'

describe('Vuex store', () => {
  it('generates 20 horses with unique staticId', () => {
    store.dispatch('generateHorses')
    const horses = store.state.horses

    expect(horses).toHaveLength(20)
    const ids = new Set(horses.map(h => h.staticId))
    expect(ids.size).toBe(20)
  })

  it('creates 6 races with 10 horses each', () => {
    store.dispatch('generateHorses')
    store.dispatch('generateRaces')
    const races = store.state.races

    expect(races).toHaveLength(6)
    races.forEach(r => {
      expect(r.participants).toHaveLength(10)
    })
  })
})