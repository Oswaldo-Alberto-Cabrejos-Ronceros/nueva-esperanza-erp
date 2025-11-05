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
  ENCARGADOSEDE: 1,
  VETERINARIO: 2,
  RECEPCIONISTA: 3,
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
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/employee/administrator/client-management',
    },
    {
      label: 'Mascotas',
      icon: 'fa-solid fa-paw',
      to: '/employee/administrator/pets-management',
    },
    {
      label: 'Categorias',
      icon: 'pi pi-sort-amount-up-alt',
      to: '/employee/administrator/category-management',
    },
    {
      label: 'Servicios',
      icon: 'pi pi-calendar-plus',
      to: '/employee/administrator/services-management',
    },
    {
      label: 'Métodos de Pago',
      icon: 'pi pi-wallet',
      to: '/employee/administrator/payment-method-management',
    },
    {
      label: 'Sedes',
      icon: 'pi pi-map-marker',
      to: '/employee/administrator/headquarter-management',
    },
    {
      label: 'Especies',
      icon: 'fa-solid fa-shield-dog',
      to: '/employee/administrator/species-management',
    },
    {
      label: 'Razas',
      icon: 'fa-solid fa-shield-dog',
      to: '/employee/administrator/breeds-management',
    },
    {
      label: 'Servicios por Sede',
      icon: 'pi pi-arrow-right-arrow-left',
      to: '/employee/administrator/services-headquarters-management',
    },
    {
      label: 'Pagos',
      icon: 'pi pi-receipt',
      to: '/employee/administrator/payment-management',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/employee/administrator/appoinment-management',
    },
    {
      label: 'Atenciones',
      icon: 'pi pi-file-edit',
      to: '/employee/administrator/care-management',
    },
    {
      label: 'Analiticas',
      icon: 'pi pi-chart-line',
      to: '/employee/administrator/analitics',
    },
    {
      label: 'Reportes',
      icon: 'pi pi-file',
      to: '/employee/administrator/reports',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/manager/home',
    },
    {
      label: 'Empleados',
      icon: 'fa-solid fa-users-line',
      to: '/employee/manager/employee-management',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/employee/manager/client-management',
    },
    {
      label: 'Mascotas',
      icon: 'fa-solid fa-paw',
      to: '/employee/manager/pets-management',
    },
    {
      label: 'Categorias',
      icon: 'pi pi-sort-amount-up-alt',
      to: '/employee/manager/category-management',
    },
    {
      label: 'Servicios',
      icon: 'pi pi-calendar-plus',
      to: '/employee/manager/services-management',
    },
    {
      label: 'Métodos de Pago',
      icon: 'pi pi-wallet',
      to: '/employee/manager/payment-method-management',
    },

    {
      label: 'Especies',
      icon: 'fa-solid fa-shield-dog',
      to: '/employee/manager/species-management',
    },
    {
      label: 'Razas',
      icon: 'fa-solid fa-shield-dog',
      to: '/employee/manager/breeds-management',
    },

    {
      label: 'Servicios por Sede',
      icon: 'pi pi-arrow-right-arrow-left',
      to: '/employee/manager/services-headquarters-management',
    },
    {
      label: 'Pagos',
      icon: 'pi pi-receipt',
      to: '/employee/manager/payment-management',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/employee/manager/appoinment-management',
    },
    {
      label: 'Atenciones',
      icon: 'pi pi-file-edit',
      to: '/employee/manager/care-management',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/veterinary/home',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/employee/veterinary/appointments',
    },
    {
      label: 'Mascotas',
      icon: 'fa-solid fa-paw',
      to: '/employee/veterinary/pets-management',
    },
  ],
  [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      to: '/employee/receptionist/home',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      to: '/employee/receptionist/client-management',
    },
    {
      label: 'Mascotas',
      icon: 'fa-solid fa-paw',
      to: '/employee/receptionist/pets-management',
    },
    {
      label: 'Pagos',
      icon: 'pi pi-receipt',
      to: '/employee/receptionist/payment-management',
    },
    {
      label: 'Citas',
      icon: 'pi pi-clipboard',
      to: '/employee/receptionist/appoinment-management',
    },
    {
      label: 'Atenciones',
      icon: 'pi pi-file-edit',
      to: '/employee/receptionist/care-management',
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
      <section class="flex-1 h-auto py-1 px-0.5 xs:px-4 transition-all duration-200 ease-out flex flex-col">
        <router-view />
      </section>
    </main>
  </div>
</template>
