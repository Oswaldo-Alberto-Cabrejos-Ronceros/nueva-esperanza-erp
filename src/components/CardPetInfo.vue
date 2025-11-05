<script lang="ts" setup>
import Card from 'primevue/card'
import Image from 'primevue/image'
import Tag from 'primevue/image'
import { computed } from 'vue';


const props = defineProps<{
  name: string
  specieName: string
  breedName: string
  weight: number
  birthdate: string
  gender: string
  comment: string
  urlImage: string
}>()

const infoBasic = computed(() => [
  {
    title: 'Especie',
    icon: 'pi pi-heart',
    content: props.specieName,
  },
  {
    title: 'Peso',
    icon: 'pi pi-info',
    content: `${props.weight} Kg`,
  },
  {
    title: 'Nacimiento',
    icon: 'pi pi-calendar',
    content: props.birthdate,
  },
])

</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-heart"></i>
        <p>Información del paciente</p>
      </div>
    </template>
    <template #subtitle>
      <p>Datos básicos</p>
    </template>
    <template #content>
      <div class="w-full flex gap-2">
        <Image :src="urlImage" image-class="object-cover" class="size-16 overflow-hidden rounded-full" preview :alt="name" />
        <div class="flex-1">
          <h3 class="h3 font-bold block">{{ name }}</h3>
          <div class="w-full grid grid-cols-1 gap-2">
            <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 2xl:gap-2">
              <div v-for="(item, index) of infoBasic" :key="index" class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-300">
                <i :class="`${item.icon}`"></i>
                <p class=" font-semibold ">{{ item.title }}:</p>
                <p>{{ item.content }}</p>
              </div>
            </div>
            <div>
              <p class="block font-semibold">Comentario:</p>
              <p>
                {{ comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-4 rounded-sm bg-surface-100 dark:bg-surface-800 flex items-center justify-between p-3"
      >
        <div>
          <p class="block">Raza</p>
          <p class="text-neutral-500">{{ breedName }}</p>
        </div>
        <Tag :value="gender" severity="secondary" />
      </div>
    </template>
  </Card>
</template>
