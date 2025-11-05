<script lang="ts" setup>
import CardPrimary from './CardPrimary.vue'
import Image from 'primevue/image'

defineProps<{
  appointmentId: number
  serviceImageUrl: string
  serviceName: string
  petName: string
  date: string
  time: string
  headquarterName?: string
  headquarterAddress?:string
}>()
</script>
<template>
  <CardPrimary class="transition-opacity duration-300 hover:opacity-80 group">
    <div class="w-full flex justify-end">
      <Image :src="serviceImageUrl" image-class="size-40 object-cover transition-transform duration-300 group-hover:scale-105" :alt="serviceName" />
      <div class="flex-1 flex flex-col gap-2 p-3">
        <p class="text-lg font-medium">{{ serviceName }}</p>
        <p>{{ petName }}</p>
                <div v-if="headquarterName&&headquarterAddress" class="flex items-center gap-2">
          <i class="pi pi-map-marker"></i>
          <p>{{ headquarterName }} - {{ headquarterAddress }}</p>
        </div>
        <div class="w-full flex justify-between text-lg flex-1 items-end">
          <p>{{ date }}</p>
          <p>{{ time }}</p>
        </div>
      </div>
    </div>
  </CardPrimary>
</template>
