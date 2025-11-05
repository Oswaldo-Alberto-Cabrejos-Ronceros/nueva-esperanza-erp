<script lang="ts" setup>
import Card from 'primevue/card'
import CardAppointmentLarge from '@/components/CardAppointmentLarge.vue'
import { onMounted, ref } from 'vue'
import type { CareAndAppointmentPanelEmployee } from '@/models/CareAndAppointmentPanelEmployee'
import { useAuthentication } from '@/composables/useAuthentication'
import { useCare } from '@/composables/useCare'
import { useRouter } from 'vue-router'
const appointments = ref<CareAndAppointmentPanelEmployee[]>([])
const { getEntityId } = useAuthentication()
const { loading, error,getCaresForEmployee } = useCare()

onMounted(async () => {
  const employeeId = getEntityId()
  if (employeeId) appointments.value = await getCaresForEmployee(employeeId)
}

)


const router = useRouter()

const redirect = (url: string) => {
  router.push(url)
}

const handleRedirectPet = (petId:number)=>{
  redirect(`pets-management/pet/${petId}`)
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">Mis citas</h2>
      </template>
      <template #subtitle>
        <p >Gestiona tus citas</p>
      </template>
      <template #content>
        <!-- for messague loading  -->
        <Message
          v-if="loading.getCaresForEmployee"
          severity="warn"
          size="small"
          variant="simple"
        >
          Cargando ...
        </Message>
        <!-- for messague error -->
        <Message
          v-if="error.getCaresForEmployee"
          severity="error"
          size="small"
          variant="simple"
        >
          Error al cargar las citas
        </Message>

        <div class="w-full flex flex-col gap-2">
          <CardAppointmentLarge
            v-for="appoinment of appointments"
            :appointement-id="appoinment.id"
            :key="appoinment.id"
            :pet-name="appoinment.pet.name"
            :pet-breed="appoinment.pet.breedName"
            :service-name="appoinment.serviceName"
            :service-duration="''"
            :owner-name="appoinment.clientName"
            :time="appoinment.hour"
            :status="appoinment.status"
            :type="appoinment.type"
            :pet-id="appoinment.pet.id"
            @view-pet="handleRedirectPet($event)"
          />
          <p v-if="appointments.length===0">No hay citas registradas</p>
        </div>
      </template>
    </Card>
  </div>
</template>
