<script lang="ts" setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useAppointment } from '@/composables/useAppointment'
import type { InfoBasicAppointmentClient } from '@/models/InfoBasicAppointmentClient'
import { onMounted, ref } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication'
import CardAppointmentClient from '@/components/CardAppointmentClient.vue'

//methods
const { getEntityId } = useAuthentication()

const { error, loading, getAppointmentsForClient } = useAppointment()

//for get info
const appointments = ref<InfoBasicAppointmentClient[]>([])

const loadAppointments = async () => {
  const clientId = getEntityId()
  if (clientId) {
    appointments.value = await getAppointmentsForClient(clientId)
  }
}

onMounted(() => {
  loadAppointments()
})
//for router
const router = useRouter()

const redirectToScheduleAppointment = () => {
  router.push('/client/my-appointments/schedule-appointment')
}

const redirectToAppointmentUnitary = (appointmentId: number) => {
  router.push(`/client/my-appointments/appointment/${appointmentId}`)
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <div class="flex justify-between">
          <h3 class="h3">Mis citas</h3>
          <Button
            severity="success"
            label="Agendar cita"
            icon="pi pi-calendar"
            iconPos="right"
            @click="redirectToScheduleAppointment()"
          ></Button>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-6 mt-2">
          <!-- for messague loading  -->
          <Message
            v-if="loading.getAppointmentsForClient"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message
            v-if="error.getAppointmentsForClient"
            severity="error"
            size="small"
            variant="simple"
          >
            Error al cargar tus citas
          </Message>
          <CardAppointmentClient
            class="cursor-pointer"
            v-ripple
            v-for="appointment in appointments"
            :key="appointment.id"
            :pet-name="appointment.pet.name"
            :pet-breed="''"
            :service-name="appointment.service.name"
            :service-description="appointment.service.description"
            :service-duration="appointment.duration.toString()"
            :service-image="appointment.service.image"
            :time="appointment.time"
            :status="appointment.status"
            :service-price="'60'"
            :appointment-status="appointment.status"
            :date="appointment.date"
            :headquarter-name="appointment.headquarter.name"
            :headquarter-address="appointment.headquarter.address"
            @click="redirectToAppointmentUnitary(appointment.id)"
          ></CardAppointmentClient>
          <div v-if="appointments.length === 0" class="size-full flex items-center justify-center">
            <p>No tiene citas agendas</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
