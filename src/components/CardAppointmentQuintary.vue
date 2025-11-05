<script lang="ts" setup>
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
const props = defineProps<{
  appointementId:number
  petName: string
  petBreed: string
  petId:number
  serviceName: string
  serviceDuration: string
  ownerName: string
  time: string
  status: string
}>()

const emit = defineEmits(['redirect-appointment','view-pet'])

const emitAppointment = ()=>{
  emit('redirect-appointment',props.appointementId)
}

const emitView = ()=>{
  emit('view-pet',props.petId)
}
</script>
<template>
  <div class="card-primary flex items-center w-full p-4">
    <div class="flex flex-col gap-1.5">
      <i class="pi pi-clock mr-4 text-lg"> </i>
      <p class="text-lg font-semibold">{{ time }}</p>
      <p class="text-neutral-500 text-sm">{{ serviceDuration }}</p>
    </div>
    <!-- info general -->
    <div class="flex-1 flex flex-col mx-4 gap-2">
      <!-- avatar , pet breed and owner name -->
      <div class="flex  gap-2">
        <Avatar class="size-10" shape="circle" :label="petName.slice(0,2)"></Avatar>
        <div class="flex flex-col gap-0.5">
          <div class="flex gap-2 items-center">
          <p>{{ petName }}</p>
                   <Tag class="block xs:hidden" :value="status" severity="secondary"> </Tag>
          </div>

          <p class="text-neutral-500 text-sm w-min xs:w-fit">{{ petBreed }}  {{ ownerName }}</p>

        </div>
      </div>
      <div class="flex flex-col xs:flex-row gap-2">
        <Button
          v-if="status === 'En curso'"
          label="Finalizar"
          severity="success"
          icon-pos="left"
          icon=" pi pi-check-circle"
          size="small"
           class="py-1.5"
           @click="emitAppointment"
        />
        <Button
          v-if="status === 'En espera'"
          label="Atender"
          severity="info"
          icon-pos="left"
          icon="pi pi-clipboard"
          size="small"
           class="py-1.5"
            @click="emitAppointment"
        />
        <Button
          label="Ver historial"
          severity="secondary"
          variant="outlined"
          icon-pos="left"
          icon="pi pi-eye"
          size="small"
           class="py-1.5"
            @click="emitView"
        >
        </Button>

      </div>
    </div>
    <Tag class="hidden xs:block" :value="status" severity="secondary"> </Tag>
  </div>
</template>
