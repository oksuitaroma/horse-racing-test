import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Controls from '../../../src/components/Controls.vue'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    isRunning: false,
    races: [],
    results: []
  }
})

describe('Controls.vue', () => {
  it('renders buttons and emits start when clicked', async () => {
    const wrapper = mount(Controls, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.find('button:nth-of-type(1)').trigger('click')
    expect(wrapper.emitted().generate).toBeTruthy()
  })
})
