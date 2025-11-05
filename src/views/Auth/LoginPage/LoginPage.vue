<script setup lang="ts">
import CardLogin from './components/CardLogin.vue'
import SwitchTheme from '@/components/SwitchTheme.vue'
import type { FormValues as LoginSchema } from '@/validation-schemas-forms/schema-login'
import { useAuthentication } from '@/composables/useAuthentication'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'

//get methods for use
const { loading, error, loginClient, loginEmployee } = useAuthentication()
//for router
const router = useRouter()

const toast = useToast()

const showToast = (message: string) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: message,
    life: 3000,
  })
}

//for showToast error

watch(()=>error.loginClient,
(newVal)=>{
  if(newVal){
    showToast('Error al iniciar sesión como cliente')
  }
})

watch(()=>error.loginEmployee,
(newVal)=>{
  if(newVal){
    showToast('Error al iniciar sesión como empleado')
  }
})



//fuction for get info for cardLogin
const login = async (loginRequest: { loginRequest: LoginSchema; isEmployee: boolean }) => {
  if (loginRequest.isEmployee) {
    const user = await loginEmployee(
      loginRequest.loginRequest.email,
      loginRequest.loginRequest.password,
    )
    switch (user.mainRole) {
      case 'Recepcionista':
        router.push('/employee/receptionist/')
        break
      case 'Veterinario':
        router.push('/employee/veterinary/')
        break
      case 'Encargado Sede':
        router.push('/employee/manager/')
        break
      case 'Administrador':
        router.push('/employee/administrator/')
        break
      default:
        console.log('No existe rol en la UI')
        router.push('/login')
        break
    }
  } else {
    await loginClient(loginRequest.loginRequest.email, loginRequest.loginRequest.password)
    router.push('/client/')
  }
}
</script>
<template>
  <div class="layout-full-screen-flex relative">
    <div class="p-2 absolute top-0 w-full flex justify-end">
      <SwitchTheme />
    </div>
    <CardLogin
      :loading="Boolean(loading.loginClient) || Boolean(loading.loginEmployee)"
      @login="login($event)"
      class="self-center"
    />
  </div>
</template>
