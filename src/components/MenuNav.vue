<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref } from 'vue'
import Menu from 'primevue/menu'
import { RouterLink, useRoute } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'
import Image from 'primevue/image'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Button from 'primevue/button'
import { useThemeStore } from '@/stores/themeStore'

//define props
const props = defineProps<{
  items: MenuItem[]
  showMenu: boolean
  role: string
}>()

//for theme
const storeTheme = useThemeStore()
const imageLogo = computed(() => (storeTheme.isDark ? LogoWhite : LogoRose))

const routeMap: Record<string, string> = {
  ADMINISTRADOR: '/employee/administrator',
  ENCARGADOSEDE: '/employee/maneger',
  VETERINARIO: '/employee/veterinary',
  RECEPCIONISTA: '/employee/receptionist',
  CLIENTE: '/client',
}

//emits
const emit = defineEmits<{
  (e: 'update:showMenu', value: boolean): void
}>()

const emitCloseMenu = () => {
  emit('update:showMenu', false)
}

const emitOpenMenu = () => {
  emit('update:showMenu', true)
}

const asideRef = ref<HTMLElement | null>(null)
const menuWrapperRef = ref<HTMLElement | null>(null)

//for closes menu if do click outside menu
const handleClick = (event: MouseEvent) => {
  const target = event.target as Node
  const clickedInsideHeader = document.querySelector('header')?.contains(target)
  if (
    props.showMenu &&
    window.innerWidth < 769 &&
    asideRef.value &&
    !menuWrapperRef.value?.contains(target) &&
    !clickedInsideHeader
  ) {
    emitCloseMenu()
  }
}

//event for verify if show menu is true, if width screen < 640, close cmenu
const handleResize = () => {
  if (window.innerWidth < 769 && props.showMenu) {
    emitCloseMenu()
  }
}

//for close menu if screen < 640 and click in item menu

const handleMenuItemClick = (navigate: () => void) => {
  navigate()
  if (window.innerWidth < 769) {
    emitCloseMenu()
  }
}

// add listener and verify if screen < 640
onMounted(() => {
  document.addEventListener('click', handleClick)
  window.addEventListener('resize', handleResize)
  if (window.innerWidth < 769) {
    emitCloseMenu()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
  window.removeEventListener('resize', handleResize)
})

//route

const route = useRoute()

//function for active route
const isActive = (path: string) => route.path.startsWith(path)
</script>

<template>
  <aside
    ref="asideRef"
    :class="[
      'transition-all duration-200 ease-out fixed top-0 left-0 h-screen max-h-screen z-[100] backdrop-blur-xs border-r border-neutral-300 dark:border-neutral-800 ',
      showMenu ? ' w-screen md:w-64' : 'w-0 md:w-20 overflow-hidden',
    ]"
  >
    <div class="w-2/3 md:w-auto h-screen bg-surface-0 dark:bg-neutral-800 z-30" ref="menuWrapperRef">
      <div
        :class="[
          'w-full h-16 flex items-center px-3 border-b-1 border-neutral-300 dark:border-neutral-700',
          showMenu ? 'justify-between' : 'justify-center',
        ]"
      >
        <RouterLink v-if="showMenu" v-ripple :to="routeMap[role] ?? '/'">
          <Image :src="imageLogo" alt="Logo" width="48" />
        </RouterLink>
        <Button
          :icon="`pi ${props.showMenu ? 'pi-chevron-left' : 'pi-chevron-right'}`"
          severity="primary"
          variant="text"
          size="small"
          rounded
          aria-label="Notificaciones"
          @click="emitOpenMenu()"
        />
      </div>
      <div class="px-3 overflow-x-hidden overflow-y-auto max-h-[calc(100vh-64px)]">
        <Menu
          v-if="showMenu"
          :model="props.items"
          class="sm:h-min border-none shadow-none dark:bg-neutral-800"
        >
          <template #item="{ item, props }">
            <router-link
              class=""
              v-if="item.to"
              v-slot="{ navigate }"
              :to="item.to"
              custom
              v-ripple
            >
              <a
                v-bind="props.action"
                @click="handleMenuItemClick(navigate)"
                :class="[
                  ' group flex align-items-center hover:bg-primary-50 dark:hover:bg-primary-100 hover:text-primary duration-300 my-1 rounded-lg transition-colors',
                  isActive(item.to)
                    ? ' font-semibold bg-primary-400 dark:bg-primary-500 text-surface-0 hover:bg-primary-400 dark:hover:bg-primary-600'
                    : '',
                ]"
              >
                <span
                  v-if="item.icon"
                  :class="[
                    item.icon,
                    'mr-2 rounded-lg bg-primary-50 text-primary dark:bg-primary-300 dark:text-surface-0 p-1.5',
                    isActive(item.to) ? 'bg-primary-300 dark:bg-primary-400 text-surface-0' : '',
                  ]"
                ></span>
                <span
                  :class="[
                    isActive(item.to)
                      ? ' group-hover:text-neutral-950 dark:group-hover:text-surface-0 transition-colors duration-150 '
                      : '',
                  ]"
                  >{{ item.label }}</span
                >
              </a>
            </router-link>
          </template>
        </Menu>

        <div
          v-if="!showMenu"
          :model="props.items"
          class="sm:h-min border-none shadow-none py-1 dark:bg-neutral-800 flex flex-col justify-center gap-2"
        >
          <div v-for="item in items" :key="item.to">
            <router-link
              class="w-min"
              v-if="item.to"
              v-slot="{ navigate }"
              :to="item.to"
              custom
              v-ripple
            >
              <a
                @click="handleMenuItemClick(navigate)"
                :class="[
                  ' group rounded-full flex align-items-center hover:bg-primary-50 dark:hover:bg-primary-100 hover:text-primary duration-300 my-1 w-min transition-all hover:scale-110',
                  isActive(item.to)
                    ? ' font-semibold bg-primary-400 dark:bg-primary-500 text-surface-0 hover:bg-primary-400 dark:hover:bg-primary-600'
                    : '',
                ]"
                v-tooltip="item.label"
              >
                <span
                  v-if="item.icon"
                  :class="[
                    item.icon,
                    ' text-lg dark:bg-primary-300 text-neutral-700 dark:text-neutral-800 p-4 cursor-pointer ',
                    isActive(item.to)
                      ? 'bg-primary-300 dark:bg-primary-400 text-surface-0 dark:text-surface-0'
                      : '',
                  ]"
                ></span>
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
