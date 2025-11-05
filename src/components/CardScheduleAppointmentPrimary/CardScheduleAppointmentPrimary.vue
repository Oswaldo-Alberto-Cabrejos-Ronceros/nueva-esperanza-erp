<script lang="ts" setup>
import Card from 'primevue/card'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import StepPanels from 'primevue/steppanels'
import PetStep from './AppointmentSteps/PetStep.vue'
import ScheduleStep from './AppointmentSteps/ScheduleStep.vue'
import ServiceStep from './AppointmentSteps/ServiceStep.vue'
import ResumeStep from './AppointmentSteps/ResumeStep.vue'
import { onMounted, ref } from 'vue'
import StepItem from 'primevue/stepitem'
import type { PetByClient } from '@/models/PetByClient'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'
import type { TimesForTurn } from '@/models/TimesForTurn'
import type { FormatTime } from '@/models/FormatTime'
import type { PaymentMethod } from '@/models/PaymentMethod'

defineProps<{
  pets: PetByClient[]
  services?: BasicServiceForAppointment[]
  schedules?: TimesForTurn[]
  //for selecteds
  petSelected?: PetByClient
  serviceSelected?: BasicServiceForAppointment
  dateSelected?: Date
  timeSelected?: FormatTime
  paymentMethods: PaymentMethod[]
}>()

//for small screen
const isSmallScreen = ref<boolean>(false)

const checkSize = () => {
  isSmallScreen.value = window.innerWidth < 533
}

onMounted(() => {
  checkSize()
  window.addEventListener('resize', checkSize)
})

const emit = defineEmits([
  'pet-selected',
  'service-selected',
  'date-change',
  'time-selected',
  'confirm',
])

//for get petSelected
const getPetSelected = (pet: PetByClient) => {
  console.log('Obtenido', pet)
  emit('pet-selected', pet)
}

//for get serviceSelected
const getServiceSelected = (service: BasicServiceForAppointment) => {
  console.log('Obtenido', service)
  emit('service-selected', service)
}

//for get dateAppointment
const getDateAppointment = (date: Date) => {
  console.log('Obtenido', date)
  emit('date-change', date)
}

//for get timeSelected
const getTimeSelected = (time: FormatTime) => {
  console.log('Obtenido', time)
  emit('time-selected', time)
}

const getConfirm = (paymentMethodId: number) => {
  console.log('Obteniendo', paymentMethodId)
  emit('confirm', paymentMethodId)
}
</script>

<template>
  <Card class="card-principal-color-neutral">
    <template #title>
      <div class="textLg flex gap-2">
        <p>Agendar cita</p>
      </div>
    </template>
    <template #content>
      <Stepper linear value="1" v-if="!isSmallScreen">
        <!-- options -->
        <StepList>
          <Step value="1"> Mascota </Step>
          <Step value="2"> Servicio </Step>
          <Step value="3"> Horario </Step>
          <Step value="4"> Resumen </Step>
        </StepList>
        <!-- panels -->
        <StepPanels>
          <!-- for pet -->
          <PetStep :pets="pets" @select-pet="getPetSelected($event)"></PetStep>
          <!-- for service -->
          <ServiceStep
            :services="services"
            @select-service="getServiceSelected($event)"
          ></ServiceStep>
          <!-- for schedule -->
          <ScheduleStep
            :schedules="schedules"
            @date-change="getDateAppointment($event)"
            @select-time="getTimeSelected($event)"
          ></ScheduleStep>
          <!-- for resume -->
          <ResumeStep
            v-if="services"
            @confirm="getConfirm($event)"
            :petSelected="petSelected"
            :serviceSelected="serviceSelected"
            :dateSelected="dateSelected"
            :scheduleSelected="timeSelected"
            :payment-methods="paymentMethods"
          ></ResumeStep>
        </StepPanels>
      </Stepper>
      <Stepper v-if="isSmallScreen" value="1" linear>
        <!-- for pet -->
        <StepItem value="1">
          <Step value="1"> Mascota </Step>
          <!-- for pet -->
          <PetStep :pets="pets"  @select-pet="getPetSelected($event)"></PetStep>
        </StepItem>
        <StepItem value="2">
          <Step value="2"> Servicio </Step>
          <!-- for service -->
          <ServiceStep
            :services="services"
            @select-service="getServiceSelected($event)"
          ></ServiceStep>
        </StepItem>
        <StepItem value="3">
          <Step value="3"> Horario </Step>
          <!-- for schedule -->
          <ScheduleStep
            :schedules="schedules"
            @date-change="getDateAppointment($event)"
            @select-time="getTimeSelected($event)"
          ></ScheduleStep>
        </StepItem>
        <StepItem value="4">
          <Step value="4"> Resumen </Step>
          <!-- for resume -->
          <ResumeStep
            v-if="services"
            @confirm="getConfirm($event)"
            :petSelected="petSelected"
            :serviceSelected="serviceSelected"
            :dateSelected="dateSelected"
            :scheduleSelected="timeSelected"
            :payment-methods="paymentMethods"
          ></ResumeStep>
        </StepItem>
      </Stepper>
    </template>
  </Card>
</template>
