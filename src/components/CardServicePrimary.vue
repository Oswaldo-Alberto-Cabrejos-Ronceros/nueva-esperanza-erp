<script lang="ts" setup>
import CardPrimary from './CardPrimary.vue'
import Image from 'primevue/image'
defineProps<{
  serviceId:number,
  serviceName: string
  serviceImageUrl: string
  specieName: string
  categoryName: string
  duration: number
  price: string
    headquarterName?: string
}>()
</script>

<template>
  <CardPrimary>
    <div class="w-full flex justify-end min-h-40 transition-opacity duration-300 hover:opacity-80 group cursor-pointer">
      <Image :src="serviceImageUrl" image-class="size-40 object-cover transition-transform duration-300 group-hover:scale-105" :alt="serviceName" />
      <div class="flex-1 flex flex-col gap-2 p-3">
        <p class="text-lg font-medium">{{ serviceName }}</p>
                <div v-if="headquarterName" class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 textSm">
          <i class="pi pi-warehouse"></i>
          <p>{{ headquarterName }}</p>
        </div>
        <p>{{ specieName }}</p>

        <p>{{ categoryName }}</p>
        <div class="w-full flex gap-1 text-lg flex-1 items-center justify-between">
          <div class="flex gap-1 text-pink-500 items-center">
            <i class="pi pi-clock text-xl"></i>
            <p>{{ duration }} minutos</p>
          </div>

          <div class="flex gap-1 text-green-500 items-center">
            <i class="pi pi-money-bill text-xl"></i>
            <p>S/{{ price }}</p>
          </div>
        </div>
      </div>
    </div>
  </CardPrimary>
</template>
