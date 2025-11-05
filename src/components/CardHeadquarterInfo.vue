<script lang="ts" setup>
import Card from 'primevue/card'
import { ref } from 'vue'
import CardInfoPrimary from './CardInfoPrimary.vue'

const props = defineProps<{
  headquarterId: number
  phone: string
  name: string
  address: string
  email: string
  district: string
}>()

const items = ref<{ icon: string; title: string; content: string }[]>([
  {
    icon: 'pi pi-phone',
    title: 'Celular',
    content: props.phone,
  },
  {
    icon: 'pi pi-map-marker',
    title: 'Dirección',
    content: `${props.address} - ${props.district}`,
  },
  {
    icon: 'pi pi-envelope',
    title: 'Correo',
    content: props.email,
  },
])
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-warehouse"></i>
        <p>Información de la sede</p>
      </div>
    </template>
    <template #subtitle>
      <p>Datos de contacto y ubicación</p>
    </template>
    <template #content>
      <h3 class="h3 font-semibold mb-3">{{ name }}</h3>
      <CardInfoPrimary class="mb-3" v-for="(item, index) of items" :key="index" v-bind="item" />
    </template>
  </Card>
</template>
