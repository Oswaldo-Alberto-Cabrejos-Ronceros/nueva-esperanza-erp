<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-headquarter'
import type { FormValues as SearchHeadquarterSchema } from '@/validation-schemas-forms/schema-search-headquarter'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { onMounted, ref } from 'vue'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { useConfirm, useDialog, useToast } from 'primevue'
import AddEditHeadquarterCard from './components/AddEditHeadquarterCard.vue'
import ViewHeadquaterCard from './components/ViewHeadquaterCard.vue'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { FormValues as HeadquarterAddEditSchema } from '@/validation-schemas-forms/schema-add-edit-headquarter'
import type { HeadquarterList } from '@/models/HeadquarterList'
import { debounce } from 'lodash'
import type { OptionSelect } from '@/models/OptionSelect'
import { DateAdapter } from '@/adapters/DateAdapter'
import CardLoader from '@/components/CardLoader.vue'

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

//get from compose
const {
  loading,
  error,
  createHeadquarter,
  updateHeadquarter,
  deleteHeadquarter,
  activateHeadquarter,
  searchHeadquarters,
  getHeadquarterById,
} = useHeadquarter()

const typedError = error as Record<string, string | null>

//headquarters
const headquarters = ref<HeadquarterList[]>([])
const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

onMounted(() => {
  loadHeadquarters()
})

//for search headquarters

const searchHeadquartersDebounce = debounce(() => loadHeadquarters())

//for load headquarters

const loadHeadquarters = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await searchHeadquarters(
    page,
    size,
    fieldMap.name[0].value,
    fieldMap.phone[0].value,
    fieldMap.address[0].value,
    fieldMap.email[0].value,
    district.value,
    province.value,
    status.value,
  )
  headquarters.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements
}

//form
const { resetForm,errors, defineField } = useForm<SearchHeadquarterSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    address: '',
    province: '',
    district: '',
    phone: '',
    email: '',
    status: true,
  },
})

const handleResetForm = () => {
  resetForm()
  loadHeadquarters()
}

//fieldMap

const fieldMap = {
  name: defineField('name'),
  address: defineField('address'),
  phone: defineField('phone'),
  email: defineField('email'),
}

//for additionals

const [province, provinceAttrs] = defineField('province')
const [district, districtAttrs] = defineField('district')
const [status, statusAttrs] = defineField('status')

//textfields
const textFields: { title: string; key: keyof typeof fieldMap; type: string; icon: string }[] = [
  {
    title: 'Name',
    key: 'name',
    type: 'text',
    icon: 'pi-info',
  },
  {
    title: 'Dirección',
    key: 'address',
    type: 'text',
    icon: 'pi-map-marker',
  },
  {
    title: 'Teléfono',
    key: 'phone',
    type: 'tel',
    icon: 'pi-mobile',
  },
  {
    title: 'Email',
    key: 'email',
    type: 'email',
    icon: 'pi-envelope',
  },
]

const provinces = [
  { name: 'Ica', value: 'Ica' },
  { name: 'Chincha', value: 'Chincha' },
  { name: 'Pisco', value: 'Pisco' },
  { name: 'Nazca', value: 'Nazca' },
]

const districts = [
  { name: 'Ica', value: 'Ica' },
  { name: 'Parcona', value: 'Parcona' },
  { name: 'Chincha', value: 'Chincha' },
  { name: 'Pisco', value: 'Pisco' },
  { name: 'Nazca', value: 'Nazca' },
]

//options
const statusOptions: OptionSelect[] = [
  {
    value: true,
    name: 'Activo',
  },
  {
    value: false,
    name: 'Desactivado',
  },
]

//for dialog
const dialog = useDialog()

//for add
const addHeadquarter = () => {
  dialog.open(AddEditHeadquarterCard, {
    props: {
      modal: true,
      header: 'Agregar sede',
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as HeadquarterAddEditSchema
      if (data) {
        try {
          const headquarter = await createHeadquarter(data)
          console.log(headquarter)
          loadHeadquarters()
          showToast('Sede agregada exitosamente: ' + headquarter.name, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.createHeadquarter) {
            showToast('Error al crear la sede: ' + data.name + typedError.createHeadquarter, 'warn', 'Error')
          } else {
            showToast('Error al crear la sede' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for view
const viewHeadquarter = async (headquarterData: HeadquarterList) => {
  const headquarter = await getHeadquarterById(headquarterData.id)
  dialog.open(ViewHeadquaterCard, {
    props: {
      modal: true,
      header: `${headquarterData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      headquarterData: headquarter,
    },
  })
}

//for edit

const editHeadquarter = async (headquarterData: HeadquarterList) => {
  const headquarter = await getHeadquarterById(headquarterData.id)
  dialog.open(AddEditHeadquarterCard, {
    props: {
      modal: true,
      header: `${headquarterData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      headquarterData: {
        name: headquarter.phone,
        phone: headquarter.phone,
        address: headquarter.address,
        email: headquarter.email,
        district: headquarter.district,
        province: headquarter.province,
        departament: headquarter.departament,
        startTime: DateAdapter.fromHHmmSSToDate(headquarter.startTime),
        endTime: DateAdapter.fromHHmmSSToDate(headquarter.endTime),
      },
    },
    onClose: async (options) => {
      const data = options?.data as HeadquarterAddEditSchema
      if (data) {
        try {
          const employeeData = headquarterData as HeadquarterList
          const employee = await updateHeadquarter(employeeData.id, data)
          console.log('Datos recibidos:', employee)
          loadHeadquarters()
          showToast('Sede editada exitosamente: ' + employee.name, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.updateHeadquarter) {
            showToast('Error al editar la sede: ' + data.name + typedError.updateHeadquarter, 'warn', 'Error')
          } else {
            showToast('Error al editar la sede' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup

const deleteHeadquarterAction = (
  event: MouseEvent | KeyboardEvent,
  headquarter: HeadquarterList,
) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere bloquear esta sede?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Bloquear',
      severity: 'danger',
    },
    accept: async () => {
      console.log('Eliminando Sede ', headquarter.id)
      await deleteHeadquarter(headquarter.id)
      loadHeadquarters()
      showToast('Sede eliminada exitosamente: ' + headquarter.name, 'success', 'Éxito')
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

const activeHeadquarterAction = (
  event: MouseEvent | KeyboardEvent,
  headquarter: HeadquarterList,
) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que activar activar esta sede?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Activar',
      severity: 'success',
    },
    accept: async () => {
      console.log('Activando Sede ', headquarter.id)
      await activateHeadquarter(headquarter.id)
      loadHeadquarters()
      showToast('Sede Activada exitosamente: ' + headquarter.name, 'success', 'Éxito')
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

//for export
</script>

<template>
  <div class="layout-principal-flex">
        <CardLoader
      v-if="loading.activateHeadquarter || loading.updateHeadquarter || loading.createHeadquarter || loading.deleteHeadquarter"
    ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de sedes</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form class="form-search-grid-col-5">
            <!-- province -->
            <div>
              <label class="block mb-2">Provincia</label>
              <Select
                class="w-full"
                v-bind="provinceAttrs"
                v-model="province"
                :invalid="Boolean(errors.province)"
                :options="provinces"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Provincia"
                showClear
                @update:model-value="searchHeadquartersDebounce()"
              />
            </div>

            <!-- district -->
            <div>
              <label class="block mb-2">Distrito</label>
              <Select
                class="w-full"
                v-bind="districtAttrs"
                v-model="district"
                :invalid="Boolean(errors.district)"
                :options="districts"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Distrito"
                showClear
                @update:model-value="searchHeadquartersDebounce()"
              />
            </div>
            <div v-for="element in textFields" :key="element.key">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText
                  v-model="fieldMap[element.key][0].value"
                  v-bind="fieldMap[element.key][1]"
                  :invalid="Boolean(errors[element.key])"
                  class="w-full"
                  :placeholder="element.title"
                  :type="element.type"
                  @update:model-value="searchHeadquartersDebounce()"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>

            <!-- status -->

            <div>
              <label class="block mb-2">Estado</label>
              <Select
                class="w-full"
                v-bind="statusAttrs"
                v-model="status"
                :options="statusOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Estado"
                @update:model-value="searchHeadquartersDebounce()"
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
          <Message v-if="loading.getAllHeadquarters" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllHeadquarters" severity="error" size="small" variant="simple">
            Error al cargar los sedes
          </Message>

          <!-- table -->
          <DataTable
            :value="headquarters"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="loading.searchHeadquarters"
            @page="loadHeadquarters"
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
                  label="Agregar Sede"
                  @click="addHeadquarter"
                />

              </div>
            </template>
            <Column
              field="name"
              sortable
              header="Nombre"
              style="width: 15%"
            ></Column>
            <Column field="address" header="Dirección" sortable style="width: 25%"></Column>
            <Column
              field="district"
              header="Distrito"
              sortable
              style="width: 15%"
            ></Column>
            <Column
            header="Télefono"
              field="phone"
              sortable
              style="width: 15%"
            ></Column>
            <Column
              field="email"
              sortable
              style="width: 25%"
              header="Correo"
            ></Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div
                  class="flex justify-between items-center flex-row lg:flex-col xl:flex-row gap-1"
                >
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    size="small"
                    variant="text"
                    aria-label="Ver"
                    rounded
                    @click="viewHeadquarter(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    size="small"
                    variant="text"
                    aria-label="Editar"
                    rounded
                    @click="editHeadquarter(data)"
                  ></Button>
                  <Button
                    v-if="data.status === 'Activo'"
                    icon="pi pi-ban"
                    severity="danger"
                    size="small"
                    variant="text"
                    aria-label="Bloquear"
                    rounded
                    @click="deleteHeadquarterAction($event, data)"
                  ></Button>
                  <Button
                    v-else
                    icon="pi pi-check-circle"
                    severity="success"
                    size="small"
                    variant="text"
                    aria-label="Activar"
                    rounded
                    @click="activeHeadquarterAction($event, data)"
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
