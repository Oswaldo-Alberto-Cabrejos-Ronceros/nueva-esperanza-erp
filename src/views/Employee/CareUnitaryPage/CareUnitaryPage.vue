<script lang="ts" setup>
import { useCare } from '@/composables/useCare'
import { useEmployee } from '@/composables/useEmployee'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import { usePet } from '@/composables/usePet'
import type { Care } from '@/models/Care'
import type { Employee } from '@/models/Employee'
import type { HeadquarterVetService } from '@/models/HeadquarterVetService'
import type { Pet } from '@/models/Pet'
import { onMounted, ref } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'
import CardOwnerInfo from '@/components/CardOwnerInfo.vue'
import { useClient } from '@/composables/useClient'
import type { Client } from '@/models/Client'
import { usePayment } from '@/composables/usePayment'
import type { PaymentInfoForAppointment } from '@/models/PaymentInfoForAppointment'
import { useToast } from 'primevue'
import { usePaymentTicket } from '@/composables/usePaymentTicket'
import CardBilling from '@/components/CardBilling.vue'

const props = defineProps<{
  careId: string
}>()

const toast = useToast()

const showToast = (message: string, severity: string, sumary: string) => {
  toast.add({
    severity: severity,
    summary: sumary,
    detail: message,
    life: 3000,
  })
}

//methods

const handleDownloadPaymentTicket = async () => {
  if (paymentInfo.value) {
    await downloadPaymentTicket(paymentInfo.value.paymentId)
  }
}

const handleCompletePayment = async () => {
  if (paymentInfo.value) {
    await setPaymentStatusComplete(paymentInfo.value.paymentId)
    showToast('Pago completado', 'success', 'Éxito')
    loadInfo()
  }
}
//for download ticket

const { downloadPaymentTicket } = usePaymentTicket()

const { getCareById } = useCare()
const { getHeadquarterVetServiceById } = useHeadquarterVetService()
const { getPetById } = usePet()
const { getEmployeeById } = useEmployee()
const { getClientById } = useClient()
const { setPaymentStatusComplete, getPaymentInfoByCareId } = usePayment()
//ref

const care = ref<Care | null>(null)
const headquarterVetService = ref<HeadquarterVetService | null>(null)
const pet = ref<Pet | null>(null)
const employee = ref<Employee | null>(null)
const client = ref<Client | null>(null)
const paymentInfo = ref<PaymentInfoForAppointment | null>(null)

//const appointmentInfo = ref<InfoAppointmentForPanel|null>(null)

const loadInfo = async () => {
  care.value = await getCareById(Number (props.careId))
  headquarterVetService.value = await getHeadquarterVetServiceById(
    care.value.headquarterVetService.id,
  )
  pet.value = await getPetById(care.value.pet.id)
  employee.value = await getEmployeeById(care.value.employee.id)
  if (pet.value.clientId) {
    client.value = await getClientById(pet.value.clientId)
  }
  paymentInfo.value = await getPaymentInfoByCareId(Number( props.careId))
}

onMounted(() => {
  loadInfo()
})
</script>

<template>
  <div class="layout-principal-flex flex-col gap-2">
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
    <!--  <CardBilling serviceName="Consulta General" :price="80" /> -->
    <!-- payment -->

    <CardBilling
      @complete-payment="handleCompletePayment"
      @download-ticket="handleDownloadPaymentTicket"
      v-if="paymentInfo"
      :button-active="false"
      :payment-id="paymentInfo.paymentId"
      :status="paymentInfo.status"
      :payment-method-id="paymentInfo.paymentMethod.id"
      :serviceName="paymentInfo.serviceName"
      :price="paymentInfo.amount"
    />
  </div>
</template>
