import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),
  actions: {
    setTheme(value: 'light' | 'dark') {
      this.isDark = value === 'dark'
      localStorage.setItem('theme', value)
      document.documentElement.classList.toggle('dark', this.isDark)
    },
    initTheme(){
      const savedTheme = localStorage.getItem('theme');
      if(savedTheme==='dark' ||(!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        this.setTheme('dark')
      } else{
        this.setTheme('light')
      }
    },
    toggleTheme(){
      this.setTheme(this.isDark?'light':'dark')
    }
  },
})
