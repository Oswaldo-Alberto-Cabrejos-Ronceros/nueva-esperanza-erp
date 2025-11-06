<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import type { MenuItem } from 'primevue/menuitem'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MenuNav from '@/components/MenuNav.vue'
import { useAuthentication } from '@/composables/useAuthentication'

//for now getting the role by router
const route = useRoute()
const role = ref(route.meta.role as string)

const { getMainRole } = useAuthentication()

const mainRole = ref<string>('')

onMounted(() => {
  const role = getMainRole()
  if (role) mainRole.value = cleanRole(role)
})

const roleMap: Record<string, number> = {
  ADMINISTRADOR: 0,
  TRABAJADOR: 1,
  VENDEDOR: 2,
}

const cleanRole = (role: string): string => {
  return role.replace(/\s+/g, '').toUpperCase()
}

const items = ref<MenuItem[][]>([
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/administrator/home',
    },
    {
      label: 'Empleados',
      icon: 'fa-solid fa-users-line',
      to: '/employee/administrator/employee-management',
    },
    {
      label: 'Proveedores',
      icon: 'pi pi-truck',
      to: '/employee/administrator/proveedor-management',
    },
    {
      label: 'Items',
      icon: 'pi pi-objects-column',
      to: '/employee/administrator/home',
    },
    {
      label: 'Inventario',
      icon: 'pi pi-box',
      to: '/employee/administrator/home',
    },
    {
      label: 'Ubicaciones',
      icon: 'pi pi-map',
      to: '/employee/administrator/home',
    },
    {
      label: 'Sensores',
      icon: 'fa-solid fa-cloud-meatball',
      to: '/employee/administrator/home',
    },
    {
      label: 'Riegos',
      icon: 'fa-solid fa-droplet',
      to: '/employee/administrator/home',
    },
    {
      label: 'Clientes',
      icon: 'fa-solid fa-user-tag',
      to: '/employee/administrator/home',
    },
    {
      label: 'Productos',
      icon: 'fa-solid fa-wine-glass',
      to: '/employee/administrator/home',
    },
    {
      label: 'Ventas',
      icon: 'fa-solid fa-bag-shopping',
      to: '/employee/administrator/home',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/veterinary/home',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/receptionist/home',
    },
  ],
])

watch(
  () => route.meta.role,
  (newRole) => {
    role.value = newRole as string
  },
)

const itemsRole = computed(() => items.value[roleMap[mainRole.value]] ?? [])

const showMenu = ref(true)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
<template>
  <div class="w-full min-h-screen flex">
    <MenuNav
      :role="mainRole"
      :items="itemsRole"
      :show-menu="showMenu"
      @update:show-menu="toggleMenu()"
    />
    <main
      :class="[
        'w-full flex-1 flex flex-col transition-all duration-200 ease-out',
        showMenu ? 'md:ml-64' : 'ml-0 md:ml-20',
      ]"
    >
      <TheHeader @show-menu="toggleMenu()" :show-menu="showMenu" :role="mainRole" />
      <section
        class="flex-1 h-auto py-1 px-0.5 xs:px-4 transition-all duration-200 ease-out flex flex-col"
      >
        <router-view />
      </section>
    </main>
  </div>
</template>
