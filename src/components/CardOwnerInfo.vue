<script lang="ts" setup>
import Card from 'primevue/card'
import {  ref } from 'vue'
import CardInfoPrimary from './CardInfoPrimary.vue';

const props = defineProps<{
  fullName: string
  phone: string
  headquarterName: string
  address: string
}>()



const items = ref<{ icon: string; title: string; content: string }[]>([
  {
    icon: 'pi pi-phone',
    title: 'Celular',
    content: props.phone,
  },
  {
    icon: 'pi pi-warehouse',
    title: 'Sede',
    content: props.headquarterName,
  },
  {
    icon: 'pi pi-home',
    title: 'Dirección',
    content: props.address,
  },
])
</script>

<template>
  <Card class="card-primary w-full ">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-user"></i>
        <p>Información del dueño</p>
      </div>
    </template>
    <template #subtitle>
      <p>Datos de contacto y ubicación</p>
    </template>
    <template #content>
      <h3 class="h3 font-semibold mb-3">{{ fullName }}</h3>
      <CardInfoPrimary class="mb-3" v-for="(item, index) of items" :key="index" v-bind="item" />
    </template>
  </Card>
</template>
