<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'
import CardOwnerInfo from '@/components/CardOwnerInfo.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'
import CardVitalSigns from './components/CardVitalSigns.vue'
import CardHistoryVeterinaryRecord from './components/CardHistoryVeterinaryRecord.vue'
import CardAddVeterinaryRecord from './components/CardAddVeterinaryRecord.vue'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import { useCare } from '@/composables/useCare'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import { useEmployee } from '@/composables/useEmployee'
import { usePet } from '@/composables/usePet'
import { useClient } from '@/composables/useClient'
import type { Care } from '@/models/Care'
import type { Employee } from '@/models/Employee'
import type { HeadquarterVetService } from '@/models/HeadquarterVetService'
import type { Pet } from '@/models/Pet'
import type { Client } from '@/models/Client'
import type { FormValues as SchemaEditWeight } from '@/validation-schemas-forms/schema-add-weight-pet'
import { useToast } from 'primevue/usetoast'
import type { FormValues as CreateRecordSchema } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import { useVeterinaryRecord } from '@/composables/useVeterinaryRecord'

const props = defineProps<{
  appointmentId: string
}>()
onMounted(async () => {
  console.log(props.appointmentId)
  loadInfo()
})

const { loading, updatePetWeight } = usePet()

const { completeCare, setOnGoingCare } = useCare()

//for toast
//toast
const toast = useToast()

const showToast = (message: string, severity: string, sumary: string) => {
  toast.add({
    severity: severity,
    summary: sumary,
    detail: message,
    life: 3000,
  })
}
const reloadKey = ref(0)
const { createVeterinaryRecord } = useVeterinaryRecord()
const handleCreateRecord = async (schema: CreateRecordSchema) => {
  await createVeterinaryRecord(schema)
  showToast('Diagostico creado exitosamente', 'success', 'Éxito')
  await loadInfo()
  reloadKey.value++
}

const handleEditWeight = async (schema: SchemaEditWeight) => {
  try {
    const petId = pet.value?.id
    if (petId) {
      const response = await updatePetWeight(petId, schema.weight)
      await loadInfo()
      showToast(`Peso actualizado correctamente ${response.name}`, 'success', 'Éxito')
    }
  } catch (error) {
    console.error('Error al cambiar el peso', 'warn', 'Error', error)
  }
}

//methods
const { getCareById } = useCare()
const { getHeadquarterVetServiceById } = useHeadquarterVetService()
const { getPetById } = usePet()
const { getEmployeeById } = useEmployee()
const { getClientById } = useClient()
//ref
const care = ref<Care | null>(null)
const headquarterVetService = ref<HeadquarterVetService | null>(null)
const pet = ref<Pet | null>(null)
const employee = ref<Employee | null>(null)
const client = ref<Client | null>(null)

const loadInfo = async () => {
  care.value = await getCareById(Number(props.appointmentId))
  headquarterVetService.value = await getHeadquarterVetServiceById(
    care.value.headquarterVetService.id,
  )
  pet.value = await getPetById(care.value.pet.id)
  employee.value = await getEmployeeById(care.value.employee.id)
  if (pet.value.clientId) {
    client.value = await getClientById(pet.value.clientId)
  }
}

const setOnGoingTo = async () => {
  const response = await setOnGoingCare(Number(props.appointmentId))
  if (response) {
    showToast('Cambiado en curso exitosamente', 'success', 'Éxito')
    loadInfo()
  }
}

const handleCompleteCare = async () => {
  const response = await completeCare(Number(props.appointmentId))
  if (response) {
    showToast('Cambiado en curso exitosamente', 'success', 'Éxito')
    loadInfo()
  }
}
</script>

<template>
  <div class="layout-principal-flex flex-col gap-2" v-if="headquarterVetService && care">
    <div class="w-full flex justify-end">
      <Button
        severity="success"
        icon-pos="left"
        icon="pi pi-check-circle"
        v-if="care.statusCare === 'En espera'"
        variant="outlined"
        label="Atender consulta"
        @click="setOnGoingTo()"
      />
    </div>
    <CardAppointmentInfo
      v-if="headquarterVetService && care"
      is-care
      :time="care?.dateTime || ''"
      :serviceDuration="headquarterVetService?.service.duration"
      :serviceName="headquarterVetService.service.name"
      :veterinaryName="`${employee?.names} ${employee?.lastnames}`"
      :status="care?.statusCare"
    />
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CardPetInfo
        v-if="pet"
        :name="pet.name"
        :specie-name="pet.specie.name"
        :breed-name="pet.breed.name"
        :weight="pet.weight"
        :birthdate="String(pet.birthdate)"
        :gender="pet.gender"
        :comment="pet.comment"
        :url-image="pet.urlImage"
      />
      <CardOwnerInfo
        v-if="client"
        :fullName="`${client.names} ${client.lastnames}`"
        :phone="client.phone"
        :address="client.address"
        :headquarter-name="client.headquarter.name"
      />
    </div>
    <!-- actions -->
    <Card class="card-primary">
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0"> <i class="pi pi-clipboard"> </i> <span>Exámen</span> </Tab>
            <Tab value="1"> <i class="pi pi-book"> </i> <span>Historial</span> </Tab>
            <Tab value="2"> <i class="pi pi-pen-to-square"> </i> <span>Diagnóstico</span> </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0"
              ><CardVitalSigns
                :desactive="care.statusCare === 'En espera' || care.statusCare === 'Completado'"
                @set-weight="handleEditWeight($event)"
                :loading="loading.updatePetWeight"
              ></CardVitalSigns
            ></TabPanel>
            <TabPanel value="1">
              <CardHistoryVeterinaryRecord :key="reloadKey" v-if="pet" :pet-id="pet?.id" />
            </TabPanel>
            <TabPanel value="2"
              ><CardAddVeterinaryRecord

                @create-record="handleCreateRecord($event)"
                :disabled="care.statusCare === 'En espera' || care.statusCare === 'Completado'"
                v-if="employee"
                :careId="Number(appointmentId)"
                :employeeId="employee.employeeId"
            /></TabPanel>
          </TabPanels>
        </Tabs>
        <Divider />
        <div class="w-full flex justify-end" v-if="headquarterVetService && care">
          <Button
            severity="success"
            icon-pos="left"
            icon="pi pi-check-circle"
            label="Finalizar consulta"
            v-if="care.statusCare === 'En curso'"
            @click="handleCompleteCare()"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
