import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseLane from '../../../src/components/race/HorseLane.vue'

describe('HorseLane.vue', () => {
  it('renders horse with correct name and style', () => {
    const wrapper = mount(HorseLane, {
      props: {
        horse: {
          name: 'Test Horse',
          progress: 50,
          color: '#ff0000',
          stopped: false
        },
        index: 0
      }
    })

    const horseDiv = wrapper.find('.horse-lane__horse')
    expect(horseDiv.text()).toContain('Test Horse')
    expect(horseDiv.attributes('style')).toContain('left: 50%')
  })
})