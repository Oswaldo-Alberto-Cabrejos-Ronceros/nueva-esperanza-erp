<script lang="ts" setup>
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-appointment'
import type { FormValues as SearchAppointmentSchema } from '@/validation-schemas-forms/schema-search-appointment'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Message from 'primevue/message'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import type { OptionSelect } from '@/models/OptionSelect'
import { useHeadquarter } from '@/composables/useHeadquarter'
import { ref } from 'vue'
import { onMounted } from 'vue'
import type { Headquarter } from '@/models/Headquarter'
import type { Category } from '@/models/Category'
import { useCategory } from '@/composables/useCategory'
import { useAppointment } from '@/composables/useAppointment'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { useDialog } from 'primevue/usedialog'
import AddEditAppointementCard from './components/AddEditAppointementCard.vue'
import type { FormValues as AddEditPaymentSchema } from '@/validation-schemas-forms/schema-add-appointment'
import type { PaymentMethod } from '@/models/PaymentMethod'
import { usePaymentMethod } from '@/composables/usePaymentMethod'
import type { AppointmentRequest } from '@/models/AppointmentRequest'
import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'
import { DateAdapter } from '@/adapters/DateAdapter'
import { debounce } from 'lodash'
import type { AppointmentList } from '@/models/AppointmentList'
import { useConfirm } from 'primevue/useconfirm'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import CardLoader from '@/components/CardLoader.vue'

onMounted(async () => {
  loadAppoinments()
  if (route.query.add === '1') {
    addAppointment()
  }
})

//methods for appointments

const {
  loading,
  error,
  searchAppointments,
  createAppointment,
  confirmAppointment,
  completeAppointment,
  deleteAppointment,
} = useAppointment()

const typedError = error as Record<string, string | null>

const { getAllPaymentMethods } = usePaymentMethod()

const { getMainRole, getEntityId } = useAuthentication()

const { getEmployeeMyInfo } = useEmployee()

const roleMain = ref<string>('')

//for appoinments

const appointments = ref<AppointmentList[]>([])
const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

//for search appointments

const searchAppointmentsDebounce = debounce(() => {
  loadAppoinments()
})

//for load appoinments

const loadAppoinments = async (event?: DataTablePageEvent) => {
  const role = getMainRole()
  if (role) {
    roleMain.value = role
    if (role === 'Administrador') {
      headquartersOptions.value = headquartersCategoriesToOptionsSelect(await getAllHeadquarters())
    } else {
      const id = getEntityId()
      if (id) {
        const info = await getEmployeeMyInfo(id)
        headquarter.value = info.headquarter.name
      }
    }
  }

  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await searchAppointments({
    day: date.value ? DateAdapter.toDateYYYYmmDD(date.value) : undefined,
    headquarter: headquarter.value ?? undefined,
    categoryService: category.value ?? undefined,
    appointmentStatus: status.value ?? undefined,
    page: page,
    size: size,
  })

  appointments.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements
  categoriesOptions.value = headquartersCategoriesToOptionsSelect(await getAllCategories())
}

const handleChangeStatus = async (appointmentId: number, status: string) => {
  try {
    if (status === 'CONFIRMADA') {
      await confirmAppointment(appointmentId)
      showToast('Cita confirmada exitodamente', 'success', 'Éxito')
    } else if (status === 'COMPLETADA') {
      await completeAppointment(appointmentId)
      showToast('Cita completada exitodamente', 'success', 'Éxito')
    } else if (status == 'CANCELADA') {
      await deleteAppointment(appointmentId)
      showToast('Cita cancelada exitodamente', 'success', 'Éxito')
    }
    await loadAppoinments()
  } catch (err) {
    console.error('Error al cambiar estado de la cita:', err)
  }
}

//form
const { resetForm, errors, defineField } = useForm<SearchAppointmentSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    headquarter: undefined,
    category: undefined,
    date: undefined,
    status: undefined,
  },
})

const handleResetForm = () => {
  resetForm()
  loadAppoinments()
}

const [headquarter, headquarterAttrs] = defineField('headquarter')
const [category, categoryAttrs] = defineField('category')
const [date, dateAttrs] = defineField('date')
const [status, statusAttrs] = defineField('status')

//for get headquarters and categories
const { getAllHeadquarters } = useHeadquarter()
const { getAllCategories } = useCategory()
const headquartersOptions = ref<OptionSelect[]>([])
const categoriesOptions = ref<OptionSelect[]>([])

//for get options from headquarters

const headquartersCategoriesIdsToOptionsSelect = (
  items: Headquarter[] | Category[] | PaymentMethod[],
): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}

const headquartersCategoriesToOptionsSelect = (
  items: Headquarter[] | Category[] | PaymentMethod[],
): OptionSelect[] => {
  return items.map((item) => ({
    value: item.name,
    name: item.name,
  }))
}

//for status

const statusOptions: OptionSelect[] = [
  {
    value: 'PROGRAMADA',
    name: 'Programada',
  },
  {
    value: 'CANCELADA',
    name: 'Cancelada',
  },
  {
    value: 'CONFIRMADA',
    name: 'Confirmada',
  },
  {
    value: 'COMPLETADA',
    name: 'Completada',
  },
]

//for export

//for dialog
const dialog = useDialog()
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

//for send

const sendConfirm = async (
  petId: number,
  headquarterServiceId: number,
  time: string,
  date: Date,
  paymentMethodId: number,
  comment?: string,
) => {
  console.log(petId, headquarterServiceId, time, date, paymentMethodId)
  const appointmentRequest: AppointmentRequest = {
    date: date,
    time: time,
    headquarterVetServiceId: headquarterServiceId,
    petId: petId,
    paymentMethodId: paymentMethodId,
    comment: comment,
  }
  console.log(appointmentRequest)
  const appointment = await createAppointment(appointmentRequest)
  if (appointment) {
    showToast(`Cita creada exitosamente: ${appointment.scheduleDateTime}`, 'success', 'Éxito')
    loadAppoinments()
  }
}

//for add
const addAppointment = async () => {
  dialog.open(AddEditAppointementCard, {
    props: {
      modal: true,
      header: 'Agendar cita',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      paymentMethodsOptions: headquartersCategoriesIdsToOptionsSelect(await getAllPaymentMethods()),
    },
    onClose: async (options) => {
      const data = options?.data as AddEditPaymentSchema
      router.replace({ query: { ...route.query, add: undefined } })
      if (data) {
        console.log('Datos recibidos:', data)
        try {
          await sendConfirm(
            data.petId,
            data.headquarterVetServiceId,
            data.scheduleDateTime,
            data.date,
            data.paymentMethodId,
            data.comment,
          )
          loadAppoinments()
          showToast('Cita agendada exitosamente', 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.createAppointment) {
            showToast('Error al agendar la cita' + typedError.createAppointment, 'warn', 'Error')
          } else {
            showToast('Error al agendar la cita', 'error', 'Error')
          }
        }
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for complete confirm

const confirmAppoinmentConfirm = (event: MouseEvent | KeyboardEvent, appointmentId: number) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere confirmar esta cita?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Confirmar',
      severity: 'success',
    },
    accept: async () => {
      console.log('Confirmando cita ', appointmentId)
      handleChangeStatus(appointmentId, 'CONFIRMADA')
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

const cancelAppoinmentConfirm = (event: MouseEvent | KeyboardEvent, appointmentId: number) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere cancelar esta cita?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Abortar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Cancelar',
      severity: 'danger',
    },
    accept: async () => {
      console.log('Cancelando cita ', appointmentId)
      handleChangeStatus(appointmentId, 'CANCELADA')
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

const router = useRouter()
const route = useRoute()

//for attend
const attendAppointment = (appointmentId: number) => {
  router.push(`${route.fullPath}/attend/${appointmentId}`)
}
</script>

<template>
  <div class="layout-principal-flex">
        <CardLoader
      v-if="loading.deleteAppointment || loading.completeAppointment || loading.confirmAppointment || loading.createAppointment"
    ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de citas</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form class="form-search-grid-col-5">
            <!-- date -->
            <div>
              <label class="block mb-2">Fecha</label>
              <DatePicker
                showIcon
                fluid
                iconDisplay="input"
                class="w-full"
                v-bind="dateAttrs"
                v-model="date"
                :invalid="Boolean(errors.date)"
                placeholder="Selecciona Fecha"
                showButtonBar
                @update:model-value="searchAppointmentsDebounce()"
              />

              <Message v-if="errors.date" severity="error" size="small" variant="simple">
                {{ errors.date }}
              </Message>
            </div>
            <!-- headquarter -->
            <div v-if="roleMain === 'Administrador'">
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="headquarterAttrs"
                v-model="headquarter"
                :invalid="Boolean(errors.headquarter)"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
                showClear
                @update:model-value="searchAppointmentsDebounce()"
              />

              <Message v-if="errors.headquarter" severity="error" size="small" variant="simple">
                {{ errors.headquarter }}
              </Message>
            </div>
            <!-- category -->
            <div>
              <label class="block mb-2">Categoria</label>
              <Select
                class="w-full"
                v-bind="categoryAttrs"
                v-model="category"
                :invalid="Boolean(errors.category)"
                :options="categoriesOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Categoria"
                showClear
                @update:model-value="searchAppointmentsDebounce()"
                filter
              />

              <Message v-if="errors.category" severity="error" size="small" variant="simple">
                {{ errors.category }}
              </Message>
            </div>
            <!-- status -->
            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                v-bind="statusAttrs"
                v-model="status"
                :invalid="Boolean(errors.status)"
                :options="statusOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Estado"
                showClear
                @update:model-value="searchAppointmentsDebounce()"
              />

              <Message v-if="errors.status" severity="error" size="small" variant="simple">
                {{ errors.status }}
              </Message>
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
          <Message v-if="loading.getAllAppointments" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllAppointments" severity="error" size="small" variant="simple">
            Error al cargar las citas
          </Message>
          <!-- table -->
          <DataTable
            v-if="appointments"
            :value="appointments"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="loading.searchAppointments"
            @page="loadAppoinments"
            scrollable
            removableSort
            :rows-per-page-options="[1, 2, 3, 4]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Cita"
                  @click="addAppointment()"
                />
              </div>
            </template>
            <Column header="Fecha" field="date" sortable style="width: 16%"></Column>
            <Column field="petName" header="Masctota" sortable style="width: 13%"></Column>
            <Column field="petOwner" header="Dueño" sortable style="width: 20%"></Column>
            <Column field="headquarter" header="Sede" sortable style="width: 14%"></Column>
            <Column field="categoryService" header="Categoria" sortable style="width: 15%"></Column>
            <Column field="appointmentStatus" header="Estado" sortable style="width: 12%"> </Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-row lg:flex-col xl:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    v-tooltip="'Ver todos datos'"
                    severity="info"
                    size="small"
                    variant="text"
                    aria-label="Ver todos datos"
                    v-if="data.appointmentStatus === 'Completada'"
                    @click="attendAppointment(data.id)"
                    rounded
                  />

                  <Button
                    icon="pi pi-calendar-clock"
                    v-tooltip="'Ver todos datos'"
                    severity="warn"
                    size="small"
                    variant="text"
                    aria-label="Ver todos datos"
                    v-if="data.appointmentStatus !== 'Completada'"
                    @click="attendAppointment(data.id)"
                    rounded
                  />

                  <Button
                    icon="pi pi-check"
                    severity="success"
                    size="small"
                    variant="text"
                    aria-label="Confirmar"
                    rounded
                    v-tooltip="'Confirmar'"
                    v-if="data.appointmentStatus === 'Programada'"
                    @click="confirmAppoinmentConfirm($event, data.id)"
                  />
                  <!--                   <Button
                    icon="pi pi-calendar-check"
                    severity="help"
                    size="small"
                    variant="text"
                    aria-label="Completar"
                    v-tooltip="'Completar'"
                    rounded
                    @click="handleChangeStatus(data.id, 'COMPLETADA')"
                  /> -->

                  <Button
                    icon="pi pi-times-circle"
                    severity="danger"
                    size="small"
                    v-tooltip="'Cancelar'"
                    variant="text"
                    aria-label="Cancelar"
                    rounded
                    v-if="
                      data.appointmentStatus !== 'Completada' &&
                      data.appointmentStatus !== 'Cancelada'
                    "
                    @click="cancelAppoinmentConfirm($event, data.id)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
