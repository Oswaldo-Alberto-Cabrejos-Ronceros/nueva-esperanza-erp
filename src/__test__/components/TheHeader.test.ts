import { describe, expect, it } from "vitest"
import TheHeader from "@/components/TheHeader.vue"
import { mountWithPrimeVueAndRouter } from "../utils/mountWithPrimeVueAndRouter"
import Menubar from "primevue/menubar"
import { RouterLink } from "vue-router"
import router from "@/router"
import Button from "primevue/button"
describe('TheHeader.vue',()=>{
  //for check that MenuBar exists
  it('MenuBar exists',()=>{
    const wrapper = mountWithPrimeVueAndRouter(TheHeader);
    const menuBar = wrapper.findComponent(Menubar);
    expect(menuBar.exists()).toBe(true);
  });
  //for check RouterLink exist
  it('RouterLink exists',()=>{
    const wrapper = mountWithPrimeVueAndRouter(TheHeader);
    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.exists()).toBe(true);
  })
  //for check atributte to of RouterLink "/"
  it('Atribute of RouterLink is "/"',()=>{
    const wrapper = mountWithPrimeVueAndRouter(TheHeader);
    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.props('to')).toBe('/')
  });
  //for check RouterLink redirect to '/'
  it('Check RouterLink, should redirect to "/"',async ()=>{
    const wrapper = mountWithPrimeVueAndRouter(TheHeader);
    const routerLink = wrapper.findComponent(RouterLink);
    await routerLink.trigger('click');
    expect(router.currentRoute.value.path).toBe('/auth/login')
  });
  //for check buttons
  it('Check Buttons,should render 3 Buttons',()=>{
    const wrapper = mountWithPrimeVueAndRouter(TheHeader);
    const buttons = wrapper.findAllComponents(Button);
    //for now
    expect(buttons.length).toBe(3);
  });

})
