import { describe, expect, it } from 'vitest'
import { mountWithPrimeVueAndRouter } from '../utils/mountWithPrimeVueAndRouter'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import TheHeader from '@/components/TheHeader.vue'
describe('EmployeeLayout', () => {
  //check that TheHeader component exists
  it('Should render TheHeader', () => {
    const wrapper = mountWithPrimeVueAndRouter(EmployeeLayout)
    const theHeader = wrapper.findComponent(TheHeader)
    expect(theHeader.exists()).toBe(true)
  })
})
