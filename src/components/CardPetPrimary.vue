<script lang="ts" setup>
import CardPrimary from './CardPrimary.vue'
import Image from 'primevue/image'
defineProps<{
  petId: number
  petImageUrl: string
  petName: string
  petSpecie: string
  petBreed: string
  petGender: string
  birthdate: string
  selected?: boolean
}>()
</script>
<template>
  <CardPrimary
    class="transition-opacity duration-300 hover:opacity-80 group cursor-pointer"
    :class="
      selected
        ? ' bg-surface-100 hover:bg-surface-100 dark:bg-surface-950 hover:dark:bg-surface-900 !border-primary-500 !dark:border-primary-900'
        : ''
    "
  >
    <div class="w-full flex justify-end h-40">
      <Image
        :src="petImageUrl"
        image-class="size-40 object-cover transition-transform duration-300 group-hover:scale-105"
        :alt="petName"
      />
      <div class="flex-1 flex flex-col gap-2 p-3">
        <div class="flex items-center justify-between">
          <p class="text-lg font-medium">{{ petName }}</p>
          <i
            :class="
              petGender === 'H'
                ? 'pi pi-venus text-pink-500 text-xl'
                : 'pi pi-mars text-blue-600 text-xl'
            "
          ></i>
        </div>

        <p>{{ petSpecie }} - {{ petBreed }}</p>
        <div class="w-full flex gap-1 text-lg flex-1 items-center">
          <i class="pi pi-calendar text-xl"></i>
          <p>{{ birthdate }}</p>
        </div>
      </div>
    </div>
  </CardPrimary>
</template>
