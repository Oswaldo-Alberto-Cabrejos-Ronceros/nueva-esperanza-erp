<script lang="ts" setup>
import Image from 'primevue/image'
defineProps<{
  serviceId: number
  serviceName: string
  serviceImageUrl: string
  specieName: string
  categoryName: string
  duration: number
  price: string
  headquarterName: string
}>()
</script>

<template>
  <div class="card-primary flex w-full p-4 items-center gap-3 transition-opacity duration-300 hover:opacity-80 group">
    <Image
      class="size-max shadow self-start"
      image-class=" rounded size-12 object-cover transition-transform duration-300 group-hover:scale-105"
      :src="serviceImageUrl"
    />
    <div class="flex-1 flex flex-col gap-1 justify-center items-start">
      <div class="flex w-full justify-between gap-1 items-center">
        <p class="font-semibold">{{ serviceName }}</p>
      </div>
      <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 textSm">
        <i class="pi pi-warehouse"></i>
        <p>{{ headquarterName }}</p>
      </div>
      <p class="text-neutral-500 dark:text-neutral-400">{{ `${categoryName} - ${specieName}` }}</p>
      <div class="w-full flex justify-between text-neutral-500 dark:text-neutral-400">
        <div class="flex w-full justify-between gap-1 items-center">
          <div class="flex items-center gap-2">
            <i class="pi pi-money-bill"></i>
            <p>S/{{ price }}</p>
          </div>

          <div class="flex items-center gap-2">
            <i class="pi pi-clock"></i>
            <p>{{ duration }} min</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
