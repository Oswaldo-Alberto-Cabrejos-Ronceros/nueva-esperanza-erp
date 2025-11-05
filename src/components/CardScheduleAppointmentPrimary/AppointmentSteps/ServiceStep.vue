<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import CardServiceSecondary from '@/components/CardServiceSecondary.vue'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'
import Message from 'primevue/message'
import { ref } from 'vue'
defineProps<{
  services?: BasicServiceForAppointment[]
}>()

//service selected
const serviceSelected = ref<BasicServiceForAppointment | null>(null)
//function for select services
const selectService = (service: BasicServiceForAppointment) => {
  console.log(service)
  serviceSelected.value = service
}
//for emit
const emit = defineEmits(['select-service'])
const emitSelectService = ()=>{
  if(serviceSelected.value){
    emit('select-service',serviceSelected.value)
  }
}

</script>

<template>
  <!-- for service -->
  <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="2">
    <div class="min-h-48">
      <p>Servicio</p>
      <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
        <CardServiceSecondary v-ripple
          v-for="service in services"
          @click="selectService(service)"
          :key="service.id"
          :serviceId="service.id"
          :serviceName="service.name"
          :serviceImageUrl="service.imageUrl"
          :specieName="service.specie.name"
          :categoryName="service.category.name"
          :duration="service.duration"
          :price="service.price"
          :selected="serviceSelected?.headquarterServiceId==service.headquarterServiceId"
        ></CardServiceSecondary>
        <!-- for messague nothing  -->
        <Message v-if="services?.length === 0" severity="error" size="small" variant="simple">
          No hay servicios para esta especie
        </Message>
      </div>
    </div>
    <div class="flex justify-between">
      <Button
        label="Atrás"
        severity="secondary"
        icon="pi pi-arrow-left"
        icon-pos="left"
        @click="activateCallback('1')"
      />

      <Button
      :disabled="serviceSelected===null"
        label="Siguiente"
        icon="pi pi-arrow-right"
        icon-pos="right"
        @click="()=>{
          emitSelectService()
          activateCallback('3')}"
      />
    </div>
  </StepPanel>
</template>
