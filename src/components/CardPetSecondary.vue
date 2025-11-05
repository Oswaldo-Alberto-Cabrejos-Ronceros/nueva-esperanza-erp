<script lang="ts" setup>
import CardPrimary from './CardPrimary.vue';
import Image from 'primevue/image'
defineProps<{
  id: number
  imageUrl: string
  name: string
  description: string
  specie: string
  breed: string
  gender: string
  weight: number
  birthdate: string
}>()
</script>

<template>
  <CardPrimary class="transition-opacity duration-300 hover:opacity-80 group cursor-pointer dark:bg-surface-900">
    <div class="w-full flex justify-end">
      <Image :src="imageUrl" image-class="size-40 object-cover transition-transform duration-300 group-hover:scale-105" :alt="name" />
      <div class="flex-1 flex flex-col gap-2 p-3">
        <div class="flex items-center justify-between">
          <div class="flex gap-2 items-center">
          <h3 class="text-lg font-medium">{{ name }}</h3>
          <p>{{ specie }}</p>

          <p>{{ breed }}</p>
          </div>

          <i
            :class="
              gender === 'H'
                ? 'pi pi-venus text-pink-500 text-xl'
                : 'pi pi-mars text-blue-600 text-xl'
            "
          ></i>
        </div>
        <div class="flex-1">
          {{ description }}
        </div>
        <div class="w-full flex gap-2 text-lg justify-between">
          <div class="flex items-center gap-2">
            <i class="pi pi-calendar text-xl"></i>
            <p>{{ birthdate }}</p>
          </div>
          <div class="flex items-center gap-2">
            <p>{{ weight }} Kg</p>
            <i class="pi pi-arrow-circle-down text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </CardPrimary>
</template>
