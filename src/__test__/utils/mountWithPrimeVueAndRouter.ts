import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import * as components from 'primevue'
import router from '@/router'
import { createTestingPinia } from '@pinia/testing'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import { ToastService } from 'primevue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mountWithPrimeVueAndRouter(component: any, options = {}) {
  return mount(component, {
    global: {
      plugins: [
        PrimeVue,
        router,
        createTestingPinia({ stubActions: false }),
        ConfirmationService,
        ToastService,
      ],
      components: {
        ...components,
        ConfirmDialog,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(options as any).global,
    },
    ...options,
  })
}
