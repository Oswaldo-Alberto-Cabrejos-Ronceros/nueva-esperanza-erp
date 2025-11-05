import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
//importamos prime vue
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
//import esLocale
import esLocale from '@/assets/locale/es.json'
import Ripple from 'primevue/ripple'
import App from './App.vue'
import router from './router'

import { definePreset } from '@primeuix/themes'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)
const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{pink.50}',
      100: '{pink.100}',
      200: '{pink.200}',
      300: '{pink.300}',
      400: '{pink.400}',
      500: '{pink.500}',
      600: '{pink.600}',
      700: '{pink.700}',
      800: '{pink.800}',
      900: '{pink.900}',
      950: '{pink.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}',
        },
      },
    },
  },
})

app.use(createPinia())
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark',
      prefix: 'p',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
  locale: esLocale,
})

//user dialog service
app.use(DialogService)
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)

app.mount('#app')
