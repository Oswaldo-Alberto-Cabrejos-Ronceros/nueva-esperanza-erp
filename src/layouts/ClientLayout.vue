<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'
import TabNav from '@/components/TabNav.vue'

//for menuItems
const items = ref<MenuItem[]>([
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    to: '/client/home',
  },
  {
    label: 'Citas',
    icon: 'pi pi-clipboard',
    to: '/client/my-appointments',
  },
    {
    label: 'Mis mascotas',
    icon: 'fa-solid fa-paw',
    to: '/client/my-pets',
  }
])

const showMenu = ref(true)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
<template>
  <div class="w-full min-h-screen flex flex-col">
    <TheHeader is-client @toggle-menu="toggleMenu" role="CLIENTE" />

    <main class="w-full flex-1 flex-col flex  overflow-hidden">
      <div class="w-full px-12 p-tablist-tab-list">
<TabNav :items="items"/>
      </div>

      <section class="flex-1 mt-4 h-auto px-0.5 xs:px-12 transition-all duration-200 ease-out flex flex-col">

        <router-view />
      </section>
    </main>
  </div>
</template>
