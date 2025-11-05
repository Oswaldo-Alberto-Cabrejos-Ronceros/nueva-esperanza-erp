<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import CardPetPrimary from '@/components/CardPetPrimary.vue'
import CardServicePrimary from '@/components/CardServicePrimary.vue'
import type { PetByClient } from '@/models/PetByClient'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'
import type { FormatTime } from '@/models/FormatTime'
import { DateAdapter } from '@/adapters/DateAdapter'
import type { PaymentMethod } from '@/models/PaymentMethod'
import Select from 'primevue/select'
import type { OptionSelect } from '@/models/OptionSelect'
import { computed, ref} from 'vue'
const props = defineProps<{
  petSelected?: PetByClient
  serviceSelected?: BasicServiceForAppointment
  dateSelected?: Date
  scheduleSelected?: FormatTime
  paymentMethods: PaymentMethod[]
}>()

const paymentMethodSelected = ref<number>(1)

const paymentMethodsOptions = computed<OptionSelect[]>(()=>{
  return props.paymentMethods.map((paymentMethod)=>({
    value: paymentMethod.id,
    name:paymentMethod.name
  }))
})



//for emitr
const emit = defineEmits(['confirm'])
const emitConfirm = ()=>{
  if(paymentMethodSelected.value){
    emit('confirm',paymentMethodSelected.value)
  }
}
</script>

<template>
  <!-- for resume -->

  <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="4">
    <div class="min-h-48">
      <p>Resumen</p>
      <div class="w-full grid gap-2 md:grid-cols-1 lg:grid-cols-2 my-4">
        <!-- pet -->
        <div>
          <p class="block mb-2">Mascota</p>
          <CardPetPrimary
            v-if="petSelected"
            :petId="petSelected.id"
            :petImageUrl="petSelected.urlImage"
            :petName="petSelected.name"
            :petSpecie="petSelected.specieName"
            :petBreed="petSelected.breedName"
            :petGender="petSelected.gender"
            :birthdate="petSelected.birthdate"
          ></CardPetPrimary>
        </div>
        <!-- Servicio -->
        <div>
          <p class="block mb-2">Servicio</p>
          <CardServicePrimary
            v-if="serviceSelected"
            :key="serviceSelected.id"
            :serviceId="serviceSelected.id"
            :serviceName="serviceSelected.name"
            :serviceImageUrl="serviceSelected.imageUrl"
            :specieName="serviceSelected.specie.name"
            :categoryName="serviceSelected.category.name"
            :duration="serviceSelected.duration"
            :price="serviceSelected.price"
          ></CardServicePrimary>
        </div>
      </div>
      <p>Horario</p>
      <div class="flex gap-3 my-4 items-center">
        <i class="pi pi-clock text-2xl"></i>
        <p v-if="dateSelected">{{ DateAdapter.fromDateToFormatLong(dateSelected) }}</p>
        <i class="pi pi-calendar text-2xl"></i>
        <p>{{ scheduleSelected?.timeRange }}</p>
      </div>
      <p>Métodos de pago</p>
      <Select
      class=" min-w-3xs mt-2"
        v-model="paymentMethodSelected"
        :options="paymentMethodsOptions"
        optionLabel="name"
        optionValue="value"
        placeholder="Selecciona método de pago"
      />
    </div>
    <div class="flex justify-between mt-2">
      <Button
      :disabled="paymentMethodSelected===null"
        label="Atrás"
        severity="secondary"
        icon="pi pi-arrow-left"
        icon-pos="left"
        @click="activateCallback('3')"
      />

      <Button label="Agendar" security="success" @click="emitConfirm()" />
    </div>
  </StepPanel>
</template>
