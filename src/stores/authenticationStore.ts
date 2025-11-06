import { defineStore } from 'pinia'
import type { AuthenticationResponse } from '@/services/Authentication/domain/models/User'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    user: null as null | AuthenticationResponse,
  }),
  getters: {
    userRole: (state) => state.user?.type || null,
    userId:(state)=>state.user?.usuarioId||null
  },
  actions: {
    recoverUserFromSession(){
      const userString=localStorage.getItem('user')
      if(userString){
       try {
         const userSession:AuthenticationResponse=JSON.parse(userString)
         this.user=userSession
       } catch (error) {
        console.error('Error al recuperar usuario',error)
       }
      }
    },
    setUser(user: AuthenticationResponse) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    cleanUser() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
