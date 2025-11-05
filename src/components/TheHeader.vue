<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { RouterLink } from 'vue-router'
import Image from 'primevue/image'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Button from 'primevue/button'
import { useThemeStore } from '@/stores/themeStore'
import { computed } from 'vue'
import { ref } from 'vue'
import Popover from 'primevue/popover'
import { useAuthentication } from '@/composables/useAuthentication'
import { useConfirm } from 'primevue'

defineProps<{
  role: string
  showMenu?: boolean
  isClient?:boolean
}>()

const routeMap: Record<string, string> = {
  ADMINISTRADOR: '/employee/administrator',
  ENCARGADOSEDE: '/employee/maneger',
  VETERINARIO: '/employee/veterinary',
  RECEPCIONISTA: '/employee/receptionist',
  CLIENTE: '/client',
}

const themeStore = useThemeStore()

const iconTheme = computed(() => (themeStore.isDark ? 'pi-moon' : 'pi-sun'))
const imageLogo = computed(() => (themeStore.isDark ? LogoWhite : LogoRose))


//define emit
const emit = defineEmits(['show-menu'])

//for emit show menu
const emitShowMenu = ()=>{
  emit('show-menu')
}

//for popover
const op = ref()

const toggle = (event: MouseEvent | KeyboardEvent) => {
  op.value.toggle(event)
}

//for session out

const { logoutUser } = useAuthentication()

//for confirm dialog logout
const confirm = useConfirm()

const confirmLogout = async () => {
  op.value.hide()
  confirm.require({
    group: 'confirmDialogGeneral',
    message: '¿Seguro que quieres cerrar sesión',
    header: 'Cerrar sesión',
    icon: 'pi pi-exclamation-circle',
    rejectProps: {
      label: 'No',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Si',
      severity: 'danger',
    },
    accept: () => logoutUser(),
  })
}
</script>

<template>
  <header class="sticky top-0 left-0 z-50">
    <Menubar :class="['h-16 py-4 bg-surface-0 dark:bg-neutral-900 border-b-1 border-neutral-300 dark:border-neutral-700 rounded-none border-0',isClient?'px-12':'']">
      <template #start>
        <div class="flex items-center gap-0.5">
                    <Button
            icon="pi pi-bars"
            severity="contrast"
            variant="text"
            rounded
            aria-label="Calendario"
            class="block md:hidden"
            @click="emitShowMenu()"
          />
          <RouterLink v-if="!showMenu" v-ripple :to="routeMap[role] ?? '/'">
            <Image :src="imageLogo" alt="Logo" width="48" />
          </RouterLink>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button
            :icon="`pi ${iconTheme}`"
            severity="contrast"
            variant="text"
            rounded
            aria-label="Calendario"
            @click="themeStore.toggleTheme"
          />
          <Button
            icon="pi pi-user"
            severity="contrast"
            variant="text"
            rounded
            aria-label="Usuario"
            @click="toggle($event)"
          />
          <Popover ref="op">
            <div class="w-44">
              <RouterLink
                :to="routeMap[role] ? `${routeMap[role]}/perfil` : '/'"
                @click="() => op.hide()"
              >
                <div
                  v-ripple
                  class="w-full flex items-center justify-between cursor-pointer rounded p-2 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800"
                >
                  <p>Perfil</p>
                  <i class="pi pi-user"></i></div
              ></RouterLink>

              <div
                v-ripple
                class="w-full flex items-center justify-between cursor-pointer rounded p-2 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800"
                @click="confirmLogout()"
              >
                Cerrar sesión
                <i class="pi pi-sign-out"></i>
              </div>
            </div>
          </Popover>
        </div>
      </template>
    </Menubar>
  </header>
</template>
