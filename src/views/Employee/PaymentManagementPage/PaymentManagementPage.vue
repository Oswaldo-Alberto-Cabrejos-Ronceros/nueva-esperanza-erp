<script lang="ts" setup>
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-payment'
import type { FormValues as SearchPaymentMethodSchema } from '@/validation-schemas-forms/schema-search-payment'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Message from 'primevue/message'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import { usePayment } from '@/composables/usePayment'
import type { PaymentList } from '@/models/PaymentList'
import type { OptionSelect } from '@/models/OptionSelect'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { Headquarter } from '@/models/Headquarter'
import { useVeterinaryService } from '@/composables/useVeterinaryService'
import type { Service } from '@/models/Service'
import { DateAdapter } from '@/adapters/DateAdapter'
import { debounce } from 'lodash'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import { usePaymentTicket } from '@/composables/usePaymentTicket'
import InputMask from 'primevue/inputmask'
import CardLoader from '@/components/CardLoader.vue'


//methods

const { error, loading, setPaymentStatusComplete, setPaymentStatusCancelled, searchPayments } =
  usePayment()
const { getAllHeadquarters } = useHeadquarter()
//for download ticket

const { loading:loadingTicket,downloadPaymentTicket } = usePaymentTicket()

const { getAllVeterinaryServices } = useVeterinaryService()

const { getEmployeeMyInfo } = useEmployee()

const payments = ref<PaymentList[]>([])
const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

onMounted(() => {
  loadPayments()
})

//for search payments

const searchPaymentsDebounce = debounce(() => {
  loadPayments()
})

const { getMainRole, getEntityId } = useAuthentication()

const roleMain = ref<string>('')

const handleDownloadPaymentTicket = async (paymentId: number) => {
  await downloadPaymentTicket(paymentId)
}

const loadPayments = async (event?: DataTablePageEvent) => {
  const role = getMainRole()
  if (role) {
    roleMain.value = role
    if (role === 'Administrador') {
      headquartersOptions.value = headquartersServicesToOptionsSelect(await getAllHeadquarters())
    } else {
      const id = getEntityId()
      if (id) {
        const info = await getEmployeeMyInfo(id)
        headquarterId.value = info.headquarter.id
      }
    }
  }

  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await searchPayments(page, size, {
    dni: dni.value,
    headquarterId: headquarterId.value,
    serviceId: servicesId.value,
    status: status.value,
    startDate: startDate.value ? DateAdapter.toDateYYYYmmDD(startDate.value) : undefined,
    endDate: endDate.value ? DateAdapter.toDateYYYYmmDD(endDate.value) : undefined,
  })

  payments.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements

  headquartersOptions.value = headquartersServicesToOptionsSelect(await getAllHeadquarters())
  servicesOptions.value = headquartersServicesToOptionsSelect(await getAllVeterinaryServices())
}

//form
const { resetForm,handleSubmit, errors, defineField } = useForm<SearchPaymentMethodSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    headquarterId: undefined,
    serviceId: undefined,
    status: '',
    startDate: undefined,
    endDate: undefined,
  },
})

const handleResetForm = () => {
  resetForm()
  loadPayments()
}


const [dni, dniAttrs] = defineField('dni')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [servicesId, servicesIdAttrs] = defineField('serviceId')
const [status, statusAttrs] = defineField('status')
const [startDate, startDateAttrs] = defineField('startDate')
const [endDate, endDateAttrs] = defineField('endDate')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//options status
const statusOptions: OptionSelect[] = [
  {
    value: 'COMPLETADA',
    name: 'Completada',
  },
  {
    value: 'CANCELADA',
    name: 'Cancelada',
  },
  {
    value: 'PENDIENTE',
    name: 'Pendiente',
  },
  {
    value: 'REEMBOLSADA',
    name: 'Reembolsada',
  },
]

//headquarterIds
const headquartersOptions = ref<OptionSelect[]>([])
//services
const servicesOptions = ref<OptionSelect[]>([])

const headquartersServicesToOptionsSelect = (items: Headquarter[] | Service[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}

//for confirm

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

//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const confirmCacelPayment = (event: MouseEvent | KeyboardEvent, payment: PaymentList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere cancelar este pago?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Cancelar',
      severity: 'danger',
    },
    accept: async () => {
      await setPaymentStatusCancelled(payment.id) // esta es la que viene de usePet()
      loadPayments()
      showToast('Pago cancelado correctamente', 'success', 'Éxito')
    },
    reject: () => {
      console.log('Cancelando eliminación')
    },
  })
}

//for confirm

//for delete with confirm popup
const confirmCompletePayment = (event: MouseEvent | KeyboardEvent, payment: PaymentList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere completar este pago?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Completar',
      severity: 'success',
    },
    accept: async () => {
      await setPaymentStatusComplete(payment.id) // esta es la que viene de usePet()
      loadPayments()
      showToast('Pago completado correctamente', 'success', 'Éxito')
    },
    reject: () => {
      console.log('Cancelando eliminación')
    },
  })
}

//for export


</script>

<template>
  <div class="layout-principal-flex">
        <CardLoader
      v-if="loading.setPaymentStatusCancelled || loading.setPaymentStatusComplete||loadingTicket.downloadPaymentTicket"
    ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Pagos</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <!-- cliente -->
            <div>
              <label class="block mb-2">Cliente</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-id-card"></i>
                </InputGroupAddon>
                <InputMask
                  v-model="dni"
                  v-bind="dniAttrs"
                  :invalid="Boolean(errors.dni)"
                  class="w-full"
                  fluid
                  mask="99999999"
                  placeholder="74852321"
                  @update:model-value="searchPaymentsDebounce()"
                />
              </InputGroup>
              <Message v-if="errors.dni" severity="error" size="small" variant="simple">
                {{ errors.dni }}
              </Message>
            </div>
            <!-- sedes -->
            <div v-if="roleMain === 'Administrador'">
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                showClear
                v-bind="headquarterIdAttrs"
                v-model="headquarterId"
                :invalid="Boolean(errors.headquarterId)"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
                @update:model-value="searchPaymentsDebounce()"
              />
            </div>

            <!-- services -->

            <div>
              <label class="block mb-2">Servicio</label>
              <Select
                class="w-full"
                showClear
                v-bind="servicesIdAttrs"
                v-model="servicesId"
                :invalid="Boolean(errors.serviceId)"
                :options="servicesOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Servicio"
                @update:model-value="searchPaymentsDebounce()"
                filter
                />
            </div>

            <div>
              <label class="block mb-2">Fecha de inicio</label>
              <DatePicker
                v-bind="startDateAttrs"
                v-model="startDate"
                :invalid="Boolean(errors.startDate)"
                showIcon
                fluid
                showButtonBar
                iconDisplay="input"
                @update:model-value="searchPaymentsDebounce()"
              />
              <Message v-if="errors.startDate" severity="error" size="small" variant="simple">
                {{ errors.startDate }}
              </Message>
            </div>

            <div>
              <label class="block mb-2">Fecha de fin</label>
              <DatePicker
                v-bind="endDateAttrs"
                v-model="endDate"
                :invalid="Boolean(errors.endDate)"
                showIcon
                fluid
                showButtonBar
                iconDisplay="input"
                @update:model-value="searchPaymentsDebounce()"
              />
              <Message v-if="errors.endDate" severity="error" size="small" variant="simple">
                {{ errors.endDate }}
              </Message>
            </div>

            <!-- status -->

            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                showClear
                v-bind="statusAttrs"
                v-model="status"
                :invalid="Boolean(errors.status)"
                :options="statusOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Estado"
                @update:model-value="searchPaymentsDebounce()"
              />
            </div>
                        <div class="form-button-search-container-grid-col-5-end">
              <Button
                size="small"
                class="py-2"
                severity="secondary"
                variant="outlined"
                label="Limpiar"
                iconPos="left"
                icon="pi pi-replay"
                @click="handleResetForm"
              />
            </div>
          </form>

          <!-- for messague loading  -->
          <Message
            v-if="loading.getAllPaymentsForTable"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message
            v-if="error.getAllPaymentsForTable"
            severity="error"
            size="small"
            variant="simple"
          >
            Error al cargar los pagos
          </Message>

          <!-- tabla -->

          <DataTable
            :value="payments"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="loading.searchPayments"
            @page="loadPayments"
            scrollable
            removableSort
            :rows-per-page-options="[1, 2, 3, 4]"
            ref="dt"
          >

            <Column field="clientDni" header="DNI" sortable style="width: 10%"></Column>
            <Column field="headquarterName" sortable style="width: 12%" header="Sede"></Column>
            <Column field="serviceName" sortable style="width: 15%" header="Servicio"></Column>
            <Column field="amount" sortable style="width: 10%" header="Monto"></Column>
            <Column field="paymentMethod" sortable style="width: 10%" header="Método"></Column>
            <Column field="paymentDate" sortable style="width: 10%" header="Fecha"></Column>
            <Column field="status" sortable style="width: 12%" header="Estado"></Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-col sm:flex-row lg:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    size="small"
                    aria-label="Ver"
                    rounded
                    hidden
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    size="small"
                    aria-label="Cancelar"
                    rounded
                    v-if="data.status !== 'Cancelada' && data.status !== 'Completada'"
                    @click="confirmCacelPayment($event, data)"
                  ></Button>

                  <Button
                    icon="pi pi-check"
                    severity="success"
                    variant="text"
                    size="small"
                    aria-label="Completar"
                    rounded
                    v-if="data.status !== 'Completada' && data.status !== 'Cancelada'"
                    @click="confirmCompletePayment($event, data)"
                  ></Button>

                  <Button
                    icon="pi pi-file"
                    severity="success"
                    variant="text"
                    v-if="data.status === 'Completada'"
                    @click="handleDownloadPaymentTicket(data.id)"
                    size="small"
                    aria-label="Descargar comprobante"
                    rounded
                  ></Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
