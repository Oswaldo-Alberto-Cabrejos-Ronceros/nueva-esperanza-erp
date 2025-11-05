<script lang="ts" setup>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
const props = defineProps<{
  petId: number
  petName: string
  petBreed: string
  petImage: string
  petWeight: number
  petGender: string
  petBirtdate: string
  ownerName: string
  lastAppoinmentDate?: string
  nextAppontmentDate?: string
}>()
const emit = defineEmits(['view-pet'])

const emitView = () => {
  emit('view-pet', props.petId)
}
</script>
<template>
  <div class="card-primary flex w-full p-4 gap-3">
    <Avatar class="size-10" shape="circle" :label="petName.slice(0, 2)"> </Avatar>
    <div class="flex-1 flex flex-col gap-2 2xl:gap-1 justify-center items-start">
      <p>{{ petName }}</p>
      <p class="text-neutral-500 text-sm">{{ petBreed }} - {{ ownerName }}</p>
      <div class="flex flex-col md:flex-row gap-1 md:items-center">
        <div class="flex items-center gap-2">
          <i class="pi pi-clock"></i>
          <p>Ultima visita: {{ lastAppoinmentDate || 'No tiene' }}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="pi pi-calendar"></i>
          <p>Próxima: {{ nextAppontmentDate || 'No tiene' }}</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-1">
        <div class="flex items-center gap-2">
          <p class="font-semibold">Peso:</p>
          <p>{{ petWeight }} Kg</p>
        </div>

        <div class="flex items-center gap-2">
          <p class="font-semibold">Sexo:</p>
          <p>{{ petGender }} Kg</p>
        </div>

        <div class="flex items-center gap-2">
          <p class="font-semibold">Nacimiento:</p>
          <p>{{ petBirtdate }}</p>
        </div>
      </div>
      <div class="w-full flex   justify-end">
        <Button
          class="py-1.5 w-full xs:w-auto"
          label="Ver completo"
          severity="info"
          size="small"
          icon-pos="left"
          icon="pi pi-eye"
          @click="emitView"
        />
      </div>
    </div>
  </div>
</template>
