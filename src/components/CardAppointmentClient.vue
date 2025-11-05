<script lang="ts" setup>
import Tag from 'primevue/tag'
import Image from 'primevue/image'
defineProps<{
  petName: string
  petBreed: string
  employeeName?: string
  serviceName: string
  serviceImage: string
  serviceDuration: string
  time: string
  status: string
  servicePrice: string
  date: string
  headquarterName: string
  headquarterAddress: string
  comment?:string
}>()
</script>

<template>
  <div class="card-primary dark:bg-surface-900 flex w-full p-4 transition-opacity duration-300 hover:opacity-80 group">
    <Image
      class="size-20 mr-4 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
      image-class="size-full object-cover"
      :src="serviceImage"
    />
    <div class="flex-1 flex flex-col gap-1 justify-between">
      <div class="flex items-center gap-2">
        <p class=" font-semibold text-xl">{{ petName }}</p>
        <Tag :value="status" severity="secondary" />
      </div>
      <div class="grid grid-cols-2 gap-1 text-sm text-neutral-500 dark:text-neutral-400 w-max">
        <div class="flex items-center gap-2">
          <i class="pi pi-calendar"></i>
          <p>{{ date }}</p>
        </div>

        <div class="flex items-center gap-2">
          <i class="pi pi-clock"></i>
          <p>{{ `${time} (${serviceDuration} minutos)` }}</p>
        </div>

        <div class="flex items-center gap-2">
          <i class="pi pi-calendar-plus"></i>
          <p>{{ serviceName }}</p>
        </div>

        <div class="flex items-center gap-2" v-if="employeeName">
          <i class="pi pi-user"></i>
          <p>{{ employeeName }}</p>
        </div>

        <div class="flex items-center gap-2">
          <i class="pi pi-map-marker"></i>
          <p>{{ headquarterName }}</p>
        </div>

        <div class="flex items-center gap-2">
          <i class="pi pi-map"></i>
          <p>{{ headquarterAddress }}</p>
        </div>
      </div>
      <p class=" font-medium">Motivo</p>
      <p class="text-neutral-500 dark:text-neutral-400">{{ comment||'No contiene' }}</p>
      <p></p>
    </div>
          <div class="h-full">
        <p class="block">Precio</p>
        <p class=" text-primary font-semibold text-lg">S/ {{ servicePrice }}</p>
      </div>
  </div>
</template>
