<script lang="ts" setup>
import { Card } from 'primevue'
defineProps<{
  names: string
  lastnames: string
  phone: string
  address: string
}>()
</script>

<template>
  <Card class="card-primary">
    <template #content>
      <div class="flex flex-col xl:flex-row gap-2 justify-between">
        <div class="p-card-title flex items-center gap-2">
          <i class="pi pi-user"></i>
          <h3>Datos del propietario</h3>
        </div>
        <div class="flex flex-col sm:flex-row flex-1 justify-between sm:items-center gap-2">
          <p class="textLg">{{ names }} {{ lastnames }}</p>
          <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <i class="pi pi-phone"></i>
              <p>{{ phone }}</p>
            </div>
            <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <i class="pi pi-home"></i>
              <p>{{ address }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
