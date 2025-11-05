import { describe, expect, it } from 'vitest'
import CardLogin from '@/views/Auth/LoginPage/components/CardLogin.vue'
import { mountWithPrimeVue } from '@/__test__/utils/mountWithPrimeVue'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
describe('CardLogin.vue', () => {
  //for title
  it('Show "Iniciar Sesion" ', () => {
    const wrapper = mountWithPrimeVue(CardLogin)
    const h3 = wrapper.find('h3')

    // exists
    expect(h3.exists()).toBe(true)

    // text
    expect(h3.text()).toBe('Iniciar Sesión')
  })
  //for image
  it('Rendering the image ', () => {
    const wrapper = mountWithPrimeVue(CardLogin)
    const imgComponent = wrapper.findComponent(Image)
    //if Image exists
    expect(imgComponent.exists()).toBe(true)
    //tag img in Image Component
    const img = imgComponent.find('img')
    expect(img.exists()).toBe(true)
    //image src include logo-rose
    expect(img.attributes('src')).toContain('logo-rose')
    //image alt is Logo
    expect(img.attributes('alt')).toBe('Logo')
  })
  //for input for email
  it('Check input for Email', () => {
    const wrapper = mountWithPrimeVue(CardLogin)
    const inputComponent = wrapper.findComponent(InputText)
    //check that InputText exists
    expect(inputComponent.exists()).toBe(true)
    const inputTag = inputComponent.find('input')
    //check that input tag exist
    expect(inputTag.exists()).toBe(true)
    //check that the attribute type of input tag were 'email'
    expect(inputTag.attributes('type')).toBe('email')
  })
  //for input password
  it('Check input for Password', () => {
    const wrapper = mountWithPrimeVue(CardLogin)
    const passwordComponent = wrapper.findComponent(Password)
    //check that Password Component exists
    expect(passwordComponent.exists()).toBe(true)
    const inputTag = passwordComponent.find('input')
    //check that input tag exists
    expect(inputTag.exists()).toBe(true)
    //check that the atribute type of input tag were 'password'
    expect(inputTag.attributes('type')).toBe('password')
  })
  //check button
  it('Check button', () => {
    const wrapper = mountWithPrimeVue(CardLogin)
    const button = wrapper.findComponent(Button)
    //check that button exists
    expect(button.exists()).toBe(true)
    //check that button include the word 'Ingresar'
    expect(button.text()).toContain('Ingresar')
    //cheack that button include the icon 'pi-sign-in'
    expect(button.props('icon')).toContain('pi-sign-in')
  })
})
