<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import CardAppointmentInfo from '@/components/CardAppointmentInfo.vue'
import CardPetInfo from '@/components/CardPetInfo.vue'
import CardOwnerInfo from '@/components/CardOwnerInfo.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useAppointment } from '@/composables/useAppointment'
import type { Appointment } from '@/models/Appointment'
import { useCare } from '@/composables/useCare'
import { useDialog, useToast } from 'primevue'
import AddCareFromAppointment from '@/components/AddCareFromAppointment.vue'
import type { FormValues } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import CardBilling from '@/components/CardBilling.vue'
import type { InfoAppointmentForPanel } from '@/models/InfoAppointmentForPanel'
import type { PetInfoForAppointment } from '@/models/PetInfoForAppointment'
import type { ClientInfoForAppointment } from '@/models/ClientInfoForAppointment'
import type { PaymentInfoForAppointment } from '@/models/PaymentInfoForAppointment'
import { usePayment } from '@/composables/usePayment'
import { usePaymentTicket } from '@/composables/usePaymentTicket'

const props = defineProps<{
  appointmentId: string
}>()

//methods

const { error, getAppointmentPanelInfo,getPetInfoForAppointment,getClientInfoForAppointment,getPaymentInfoForAppointment,getAppointmentById } = useAppointment()
const { createCareFromAppointment } = useCare()

const typedError = error as Record<string, string | null>

const {setPaymentStatusComplete}=usePayment()

//for download ticket

const {downloadPaymentTicket}= usePaymentTicket()


const handleDownloadPaymentTicket = async ()=>{
  if(paymentInfo.value){
    await downloadPaymentTicket(paymentInfo.value.paymentId)
  }
}

//ref
const appointmentBasicInfo = ref<Appointment | null>(null)

const appointmentInfo = ref<InfoAppointmentForPanel|null>(null)
const petInfo = ref<PetInfoForAppointment|null>(null)
const ownerInfo = ref<ClientInfoForAppointment|null>(null)
const paymentInfo = ref<PaymentInfoForAppointment|null>(null)

onMounted(async () => {
  console.log(props.appointmentId)
  loadInfo()
})


const handleCompletePayment = async()=>{
  if(paymentInfo.value){
    await setPaymentStatusComplete(paymentInfo.value.paymentId)
    showToast('Pago completado', 'success', 'Éxito')
    loadInfo()
  }
}


const loadInfo = async () => {
  appointmentBasicInfo.value = await getAppointmentById(Number(props.appointmentId))
  if(appointmentBasicInfo.value){
    const appoinmentId = appointmentBasicInfo.value.id
   //r const status = appointmentBasicInfo.value.statusAppointment
    appointmentInfo.value=await getAppointmentPanelInfo(appoinmentId)
  petInfo.value= await getPetInfoForAppointment(appoinmentId)
  ownerInfo.value= await getClientInfoForAppointment(appoinmentId)
  paymentInfo.value = await getPaymentInfoForAppointment(appoinmentId)
  }
}

//for dialog
const dialog = useDialog()

//for create care when the client arrive
const openCreateCareConfirmArrive = () => {
  dialog.open(AddCareFromAppointment, {
    props: {
      modal: true,
      header: 'Crear Atención',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      appointmentId: Number(props.appointmentId),
      headquarterVetServiceId: appointmentBasicInfo.value?.headquarterVetService.id,
    },
    onClose: async (options) => {
      const data = options?.data as FormValues
      if (data) {
        try {
          console.log(data)
          await createCareFromAppointment(data)
          loadInfo()
          showToast(`Atención creada correctamente`, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.createCareFromAppointment) {
            showToast('Error al crear la atención: ' + typedError.createCareFromAppointment, 'warn', 'Error')
          } else {
            showToast('Error al crear la atención', 'warn', 'Error')
          }
        }
      }
    },
  })
}


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
      <CardPetInfo v-if="petInfo" :name="petInfo.name"
      :specieName="petInfo.speciesName"
      :breedName="petInfo.breedName"
      :weight="petInfo.weight"
      :birthdate="petInfo.birthdate"
      gender="M"
:comment="petInfo.petComment"
:urlImage="petInfo.urlImage"
      ></CardPetInfo>
      <CardOwnerInfo v-if="ownerInfo" :full-name="ownerInfo.fullName" :phone="ownerInfo.phone" headquarter-name="" :address="ownerInfo.address"/>
    </div>
    <!-- control -->
    <Card class="card-primary w-full">
      <template #title>
        <div class="flex gap-2 items-center">
          <i class="pi pi-clock"></i>
          <p>Control de cita</p>
        </div>
      </template>
      <template #subtitle>
        <p>Control de estado y tiempo de la cita</p>
      </template>
      <template #content>
        <div class="w-full grid grid-cols-2 gap-4">
          <!-- complete -->
          <div
            class="p-4 shadow-none border-1 rounded-sm border-blue-500 bg-blue-50 dark:bg-transparent w-full flex justify-between items-center"
          >
            <div class="text-blue-600 dark:text-blue-400">
              <p>Hora de llegada</p>
              <p class="textLg font-bold">{{ appointmentBasicInfo?.scheduleDateTime }}</p>
            </div>
            <Button
              v-if="appointmentBasicInfo?.statusAppointment === 'Confirmada'"
              size="small"
              icon="pi pi-check-circle"
              icon-pos="left"
              label="Confirmar llegada"
              class="bg-blue-500 border-blue-500"
              @click="openCreateCareConfirmArrive"
            />
          </div>
          <!-- time -->
          <div hidden
            v-if="appointmentBasicInfo?.statusAppointment === 'Confirmada'"
            class="p-4 shadow-none border-1 rounded-sm border-green-500 bg-green-50 dark:bg-transparent w-full flex justify-between items-center"
          >
            <div class="text-green-600 dark:text-green-400">
              <p>Tiempo de espera</p>
              <p class="textLg font-bold">5 minutos</p>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- payment -->

    <CardBilling :button-active="paymentInfo.status==='Completada'" @complete-payment="handleCompletePayment" @download-ticket="handleDownloadPaymentTicket" v-if="paymentInfo" :payment-id="paymentInfo.paymentId" :status="paymentInfo.status" :payment-method-id="paymentInfo.paymentMethod.id" :serviceName="paymentInfo.serviceName" :price="paymentInfo.amount"/>
  </div>
</template>
