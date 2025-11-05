<script lang="ts" setup>
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import { Button } from 'primevue'
const props = defineProps<{
  recordId: number
  date: string
  petName: string
  breedName: string
  petId: number
  status: string
  serviceName: string
  clientName: string
  diagnosisContent: string
  treatment: string
  observations?: string,
}>()

const emit = defineEmits(['view-history'])
const emitView = () => {
  emit('view-history', props.petId)
}
</script>

<template>
  <div class="card-primary flex w-full p-4 gap-3">
    <Avatar class="size-10" shape="circle" :label="petName.slice(0, 2)"> </Avatar>
    <div class="flex-1 flex flex-col gap-1 justify-center items-start">
      <div class="w-full flex flex-col gap-2 sm:flex-row justify-between">
        <!-- petName and serviceName -->
        <div class="flex gap-1 items-center">
          <p>{{ petName }}</p>
          <p class="text-neutral-500 text-sm">{{ serviceName }}</p>
        </div>
        <!-- date and tag -->
        <div class="text-neutral-500 text-sm flex gap-1 items-center">
          <Tag severity="secondary" :value="status"></Tag>
          <i class="pi pi-calendar"></i>
          <p>{{ date }}</p>
        </div>
      </div>

      <p class="text-neutral-500 text-sm">
        {{ breedName }} - {{ clientName }}
        :
      </p>

      <p class="font-semibold">Diagnóstico</p>
      <p>
        {{ diagnosisContent }}
      </p>
      <p class="font-semibold">Tratamiento</p>
      <p>
        {{ treatment }}
      </p>

      <p class="font-semibold" v-if="observations">Observaciones</p>
      <p v-if="observations">
        {{ observations }}
      </p>
      <div class="flex justify-end w-full">
        <Button
          hidden
          class="py-1.5"
          label="Ver historial"
          size="small"
          icon-pos="left"
          icon="pi pi-eye"
          @click="emitView"
        />
      </div>
    </div>
  </div>
</template>
