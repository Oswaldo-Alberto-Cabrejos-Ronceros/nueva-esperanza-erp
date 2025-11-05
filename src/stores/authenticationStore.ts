import { defineStore } from 'pinia'
import type { UserSession } from '@/models/UserSession'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    user: null as null | UserSession,
  }),
  getters: {
    userRole: (state) => state.user?.mainRole || null,
    entityId:(state)=>state.user?.entityId||null
  },
  actions: {
    recoverUserFromSession(){
      const userString=localStorage.getItem('user')
      if(userString){
       try {
         const userSession:UserSession=JSON.parse(userString)
         this.user=userSession
       } catch (error) {
        console.error('Error al recuperar usuario',error)
       }
      }
    },
    setUser(user: UserSession) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    cleanUser() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
