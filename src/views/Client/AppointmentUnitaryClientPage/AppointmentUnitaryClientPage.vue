<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'
import { useAppointment } from '@/composables/useAppointment'
import type { Appointment } from '@/models/Appointment'
import CardHeadquarterInfo from '@/components/CardHeadquarterInfo.vue'
import type { InfoAppointmentForPanel } from '@/models/InfoAppointmentForPanel'
import type { PetInfoForAppointment } from '@/models/PetInfoForAppointment'
import type { ClientInfoForAppointment } from '@/models/ClientInfoForAppointment'
import type { PaymentInfoForAppointment } from '@/models/PaymentInfoForAppointment'
import type { Headquarter } from '@/models/Headquarter'
import { useHeadquarter } from '@/composables/useHeadquarter'
import { useClient } from '@/composables/useClient'

const props = defineProps<{
  appointmentId: string
}>()

//methods

const {
  getAppointmentPanelInfo,
  getPetInfoForAppointment,
  getClientInfoForAppointment,
  getPaymentInfoForAppointment,
  getAppointmentById,
} = useAppointment()

const { getHeadquarterById } = useHeadquarter()

const { getClientById } = useClient()

//ref
const appointmentBasicInfo = ref<Appointment | null>(null)

const appointmentInfo = ref<InfoAppointmentForPanel | null>(null)
const petInfo = ref<PetInfoForAppointment | null>(null)
const headquarter = ref<Headquarter | null>(null)
const ownerInfo = ref<ClientInfoForAppointment | null>(null)
const paymentInfo = ref<PaymentInfoForAppointment | null>(null)

onMounted(async () => {
  console.log(props.appointmentId)
  loadInfo()
})

const loadInfo = async () => {
  appointmentBasicInfo.value = await getAppointmentById(Number(props.appointmentId))
  if (appointmentBasicInfo.value) {
    const appoinmentId = appointmentBasicInfo.value.id
    //r const status = appointmentBasicInfo.value.statusAppointment
    appointmentInfo.value = await getAppointmentPanelInfo(appoinmentId)
    petInfo.value = await getPetInfoForAppointment(appoinmentId)
    ownerInfo.value = await getClientInfoForAppointment(appoinmentId)
    paymentInfo.value = await getPaymentInfoForAppointment(appoinmentId)
    if (ownerInfo.value) {
      const client = await getClientById(Number(ownerInfo.value.clientId))
      headquarter.value = await getHeadquarterById(client.headquarter.headquarterId)
    }
  }
}
</script>

<template>
  <div class="layout-principal-flex flex-col gap-2">
    <CardAppointmentInfo
      v-if="appointmentInfo"
      :time="appointmentInfo.timeAppointment"
      :serviceDuration="appointmentInfo.service.time"
      :serviceName="appointmentInfo.service.name"
      :veterinaryName="appointmentInfo.employee.name"
      :comentario="appointmentInfo.comment"
      :status="appointmentBasicInfo?.statusAppointment"
    />
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CardPetInfo
        v-if="petInfo"
        :name="petInfo.name"
        :specieName="petInfo.speciesName"
        :breedName="petInfo.breedName"
        :weight="petInfo.weight"
        :birthdate="petInfo.birthdate"
        gender="M"
        :comment="petInfo.petComment"
        :urlImage="petInfo.urlImage"
      ></CardPetInfo>
      <CardHeadquarterInfo
        v-if="headquarter"
        :headquarterId="headquarter.id"
        :phone="headquarter.phone"
        :name="headquarter.name"
        :address="headquarter.address"
        :email="headquarter.email"
        :district="headquarter.district"
      />
    </div>
  </div>
</template>
