import { describe, expect, it } from "vitest"
import { mountWithPrimeVueAndRouter } from "../utils/mountWithPrimeVueAndRouter"
import ClientLayout from "@/layouts/ClientLayout.vue"
import TheHeader from "@/components/TheHeader.vue"
describe('ClientLayout',()=>{
  //check that TheHeader component exists
  it('Should render TheHeader',()=>{
    const wrapper = mountWithPrimeVueAndRouter(ClientLayout);
    const theHeader = wrapper.findComponent(TheHeader);
    expect(theHeader.exists()).toBe(true);
  })
})
