<script lang="ts" setup>
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-care'
import type { FormValues as SearchCareSchema } from '@/validation-schemas-forms/schema-search-care'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Message from 'primevue/message'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import type { OptionSelect } from '@/models/OptionSelect'
import { useHeadquarter } from '@/composables/useHeadquarter'
import { useVeterinaryService } from '@/composables/useVeterinaryService'
import { onMounted, ref } from 'vue'
import type { Headquarter } from '@/models/Headquarter'
import type { Service } from '@/models/Service'
import { useCare } from '@/composables/useCare'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDialog, useToast } from 'primevue'
import AddEditCareCard from './components/AddEditCareCard.vue'
import type { FormValues as AddCareFromRequestSchema } from '@/validation-schemas-forms/schema-add-care'
import { useRoute, useRouter } from 'vue-router'
import type { DataTablePageEvent } from 'primevue/datatable'
import { debounce } from 'lodash'
import type { CareList } from '@/models/CareList'
import type { PaymentMethod } from '@/models/PaymentMethod'
import { usePaymentMethod } from '@/composables/usePaymentMethod'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import CardLoader from '@/components/CardLoader.vue'


onMounted(async () => {
  headquartersOptions.value = headquartersServicesToOptionsSelect(await getAllHeadquarters())
  servicesOptions.value = headquartersServicesToOptionsSelect(await getAllVeterinaryServices())
  await loadCares()
      if (route.query.add === '1') {
    addCare()
  }
})

//methods for care
const { loading, error, searchCares, completeCare, createCareFromRequest } = useCare()

const { getMainRole, getEntityId } = useAuthentication()
const { getEmployeeMyInfo } = useEmployee()

const typedError = error as Record<string, string | null>

const roleMain = ref<string>('')
//for cares

const cares = ref<CareList[]>([])

const totalRecords = ref(0)
const rows = ref(10)
const first = ref(0)

//for loads care
const loadCares = async (event?: DataTablePageEvent) => {

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

  const formattedDate = date.value ? date.value.toISOString().split('T')[0] : undefined

  const result = await searchCares(
    status.value ?? undefined,
    formattedDate,
    headquarterId.value ?? undefined,
    headquarterServiceId.value ?? undefined,
    page,
    size,
  )

  cares.value = result.content
  totalRecords.value = result.totalElements
  console.log(cares.value)
}

const searchCaresDebounced = debounce(() => {
  loadCares()
}, 400)

const onCompleteCare = async (careId: number) => {
  try {
    await completeCare(careId)
    showToast('Completada correctamente', 'success', 'Éxito')
    await loadCares()
  } catch (err) {
    console.error('Error al completar atención' + err, 'warn', 'Error')
  }
}

const { resetForm,handleSubmit, errors, defineField } = useForm<SearchCareSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    headquarterId: undefined,
    headquarterServiceId: undefined,
    date: undefined,
    status: '',
  },
})

const handleResetForm = () => {
  resetForm()
  loadCares()
}

const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [headquarterServiceId, headquarterServiceIdAttrs] = defineField('headquarterServiceId')
const [date, dateAttrs] = defineField('date')
const [status, statusAttrs] = defineField('status')

//for submit
const onSubmit = handleSubmit(async () => {
  first.value = 0 // resetear a página 0
  await loadCares()
})

const { getAllPaymentMethods } = usePaymentMethod()

//for get headquarters and services
const { getAllHeadquarters } = useHeadquarter()
const { getAllVeterinaryServices } = useVeterinaryService()
const headquartersOptions = ref<OptionSelect[]>([])
const servicesOptions = ref<OptionSelect[]>([])
//for get options from headquarters

const headquartersServicesToOptionsSelect = (
  items: Headquarter[] | Service[] | PaymentMethod[],
): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}

//for status

const statusOptions: OptionSelect[] = [

{
    value: 'EN_ESPERA',
    name: 'En espera',
  },
{
    value: 'EN_CURSO',
    name: 'En Curso',
  },
  {
    value: 'COMPLETADO',
    name: 'Completada',
  },
]

//for export

//for toast
const toast = useToast()

const showToast = (message: string, severity: string, sumary: string) => {
  toast.add({
    severity: severity,
    summary: sumary,
    detail: message,
    life: 3000,
  })
}

//for dialog
const dialog = useDialog()

//for add
const addCare = async () => {
  dialog.open(AddEditCareCard, {
    props: {
      modal: true,
      header: 'Crear atención',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      paymentMethodsOptions: headquartersServicesToOptionsSelect(await getAllPaymentMethods()),
    },
    onClose: async (options) => {
      const data = options?.data as AddCareFromRequestSchema
          router.replace({ query: { ...route.query, add: undefined } })
      console.log(data)
      if (data) {
        try {
          const care = await createCareFromRequest(data)
          loadCares()
          showToast(`Atención creada: ${care.dateTime}`, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if(typedError.createCareFromRequest) {
            showToast('Error al crear la atención: ' + typedError.createCareFromRequest, 'warn', 'Error')
          } else {
            showToast('Error al crear la atención', 'warn', 'Error')
          }
        }
      }
    },
  })
}
const router = useRouter()
const route = useRoute()

const viewCare = (careId: number) => {
  router.push(`${route.fullPath}/care/${careId}`)
}
</script>
<template>
  <div class="layout-principal-flex">
            <CardLoader
          v-if="loading.createCareFromRequest || loading.completeCare"
        ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de atenciones</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">Fecha</label>
              <DatePicker
                showIcon
                fluid
                iconDisplay="input"
                class="w-full"
                v-bind="dateAttrs"
                v-model="date"
                showButtonBar
                :invalid="Boolean(errors.date)"
                @update:model-value="searchCaresDebounced"
                placeholder="Selecciona Fecha"
              />

              <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
                {{ errors.headquarterId }}
              </Message>
            </div>
            <!-- headquarter -->
            <div v-if="roleMain==='Administrador'">
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="headquarterIdAttrs"
                v-model="headquarterId"
                :options="headquartersOptions"
                @update:model-value="searchCaresDebounced"
                :invalid="Boolean(errors.headquarterId)"
                optionLabel="name"
                optionValue="value"
                showClear
                placeholder="Selecciona Sede"
              />

              <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
                {{ errors.headquarterId }}
              </Message>
            </div>
            <!-- service -->

            <!-- headquarter -->
            <div>
              <label class="block mb-2">Servicio</label>
              <Select
                class="w-full"
                v-bind="headquarterServiceIdAttrs"
                v-model="headquarterServiceId"
                :options="servicesOptions"
                @update:model-value="searchCaresDebounced"
                :invalid="Boolean(errors.headquarterServiceId)"
                optionLabel="name"
                optionValue="value"
                showClear
                placeholder="Selecciona Servicio"
                filter
              />

              <Message
                v-if="errors.headquarterServiceId"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ errors.headquarterServiceId }}
              </Message>
            </div>

            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                v-bind="statusAttrs"
                v-model="status"
                :options="statusOptions"
                @update:model-value="searchCaresDebounced"
                :invalid="Boolean(errors.status)"
                optionLabel="name"
                optionValue="value"
                showClear
                placeholder="Selecciona Estado"
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
          <Message v-if="loading.searchCares" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.searchCares" severity="error" size="small" variant="simple">
            Error al cargar las atenciones
          </Message>
          <!-- table -->
          <DataTable
            :value="cares"
            lazy
            paginator
            :rows="rows"
            :first="first"
            :totalRecords="totalRecords"
            :loading="loading.searchCares"
            :rows-per-page-options="[10, 15, 20, 25, 30]"
            @page="loadCares"
            scrollable
            removableSort
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-plus-circle"
                  iconPos="right"
                  severity="success"
                  label="Agregar Atencíon"
                  @click="addCare()"
                />

              </div>
            </template>
            <Column
              field="careDateTime"
              sortable

              style="width: 16%"

              header="Dia programado"
              class="hidden lg:table-cell"

            ></Column>
            <Column
              field="status"
              sortable
              style="width: 20%"

              header="Estado"
              class="hidden lg:table-cell"

            ></Column>
            <Column sortable header="Mascota" class="hidden lg:table-cell" style="width: 20%">
              <template #body="{ data }">
                {{ data.pet.name }}
              </template>
            </Column>

            <Column sortable header="Empleado" class="hidden lg:table-cell" style="width: 30%">
              <template #body="{ data }">
                {{ data.employee.fullName ? data.employee.fullName : '' }}
              </template>
            </Column>

            <Column sortable header="Sede" class="hidden lg:table-cell" style="width: 30%">
              <template #body="{ data }">
                {{ data.headquarter.name }}
              </template>
            </Column>

            <Column header="Acciones">
              <template #body="slotProps">
                <div class="flex items-center flex-row lg:flex-col xl:flex-row gap-1">
                  <Button
                    v-if="slotProps.data.status === 'Completado'"
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    size="small"
                    aria-label="Ver"
                    rounded
                    @click="viewCare(slotProps.data.id)"
                  ></Button>
                  <Button
                    icon="pi pi-calendar-clock"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Atender"
                    rounded
                    v-if="slotProps.data.status !== 'Completado'"
                    @click="viewCare(slotProps.data.id)"
                  ></Button>

                  <!-- completar si esta en curso -->
                  <Button
                    v-if="slotProps.data.status === 'En curso'"
                    icon="pi pi-check-circle"
                    severity="success"
                    variant="text"
                    size="small"
                    aria-label="Completar"
                    rounded
                    @click="onCompleteCare(slotProps.data.id)"
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
