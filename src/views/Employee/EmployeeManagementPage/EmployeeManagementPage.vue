<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-employee'
import type { FormValues } from '@/validation-schemas-forms/schema-search-employee'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Employee } from '@/models/Employee'
import type { FormValues as EditEmployeeSchema } from '@/validation-schemas-forms/schema-edit.employee'
import type { FormValues as AddEmployeeSchema } from '@/validation-schemas-forms/schema-add-employee'
import { onMounted, ref } from 'vue'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue'
import ViewEmployeeCard from './components/ViewEmployeeCard.vue'
import { useConfirm } from 'primevue'
import EditEmployeeCard from './components/EditEmployeeCard.vue'
import AddEmployeeCard from './components/AddEmployeeCard.vue'
import { useEmployee } from '@/composables/useEmployee'
import { useRole } from '@/composables/useRole'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Role } from '@/models/Role'
import { useHeadquarter } from '@/composables/useHeadquarter'
import type { Headquarter } from '@/models/Headquarter'
import type { DataTablePageEvent } from 'primevue/datatable'
import type { EmployeeList } from '@/models/EmployeeList'
import { debounce } from 'lodash'
import Tag from 'primevue/tag'
import BlockCardPrimary from '@/components/BlockCardPrimary.vue'
import type { FormValues as BlockSchema } from '@/validation-schemas-forms/schema-block-employee-client'
import { useAuthentication } from '@/composables/useAuthentication'
import CardLoader from '@/components/CardLoader.vue'
import InputMask from 'primevue/inputmask'
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

//methotds

const {
  loading,
  error,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  blockEmployee,
  searchEmployees,
  restoreEmployee,
  getEmployeeMyInfo,
} = useEmployee()

const typedError = error as Record<string, string | null>

const { getAllRoles } = useRole()

const { getAllHeadquarters } = useHeadquarter()
const { getMainRole, getEntityId } = useAuthentication()

const roleMain = ref<string>('')

//employees

const employees = ref<EmployeeList[]>([])

const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

const rolesOptions = ref<OptionSelect[]>([])

const headquartersOptions = ref<OptionSelect[]>([])

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

onMounted(async () => {
  loadEmployees()
})

const searchEmployeeDebounce = debounce(() => {
  loadEmployees()
})

const loadEmployees = async (event?: DataTablePageEvent) => {
  const role = getMainRole()
  if (role) {
    roleMain.value = role
    if (role === 'Administrador') {
      headquartersOptions.value = headquartersNameToOptionsSelect(await getAllHeadquarters())
    } else {
      const id = getEntityId()
      if (id) {
        const info = await getEmployeeMyInfo(id)
        headquarter.value = info.headquarter.name
      }
    }
  }

  rolesOptions.value = rolesToOptionsNameSelect(await getAllRoles())
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await searchEmployees(
    status.value,
    fieldMap.dni[0].value,
    fieldMap.cmvp[0].value,
    fieldMap.names[0].value,
    fieldMap.lastnames[0].value,
    headquarter.value,
    rol.value,
    page,
    size,
  )
  employees.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements
}

//for get options from roles

const rolesToOptionsNameSelect = (roles: Role[]): OptionSelect[] => {
  return roles.map((role) => ({
    value: role.name,
    name: role.name,
  }))
}

const rolesToOptionsSelect = (roles: Role[]): OptionSelect[] => {
  return roles.map((role) => ({
    value: role.id,
    name: role.name,
  }))
}

//for get options from headquarters

const headquartersNameToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.name,
    name: headquarter.name,
  }))
}

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}

//form

const { resetForm, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    cmvp: '',
    names: '',
    lastnames: '',
    rol: undefined,
    headquarter: undefined,
    status: true,
  },
})

const handleResetForm = () => {
  resetForm()
  loadEmployees()
}

const fieldMap = {
  dni: defineField('dni'),
  cmvp: defineField('cmvp'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
}

const [rol, rolAttrs] = defineField('rol')
const [headquarter, headquarterAttrs] = defineField('headquarter')
const [status, statusAttrs] = defineField('status')
const [dni, dniAttrs] = defineField('dni')
const [cmvp, cmvpAttrs] = defineField('cmvp')
const searchElementsEmployee: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
  {
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
  },
]

//for dialog
const dialog = useDialog()

//for add
const addEmployee = async () => {
  dialog.open(AddEmployeeCard, {
    props: {
      modal: true,
      header: 'Agregar empleado',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      headquartersOptions: headquartersToOptionsSelect(await getAllHeadquarters()),
      rolesOptions: rolesToOptionsSelect(await getAllRoles()),
    },
    onClose: async (options) => {
      const data = options?.data as AddEmployeeSchema
      if (data) {
        try {
          const employee = await createEmployee(data)
          console.log('Datos recibidos:', employee)
          showToast('Empleado agregado exitosamente: ' + employee.names, 'success', 'Éxito')
          loadEmployees()
        } catch (error) {
          console.error(error)
          if (typedError.createEmployee) {
            showToast(
              `Error al crear al empleado: ${data.names} ${typedError.createEmployee}`,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al crear al empleado: ' + data.names, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for view
const viewEmployee = async (employee: EmployeeList) => {
  dialog.open(ViewEmployeeCard, {
    data: {
      employeeData: await getEmployeeById(employee.id),
    },
    props: {
      modal: true,
      header: `${employee.lastnames} ,${employee.names}`,
      blockScroll: true,
      dismissableMask: true,
    },
  })
}

//for edit
const editEmployee = async (employeeData: EmployeeList) => {
  const employee: Employee = await getEmployeeById(employeeData.id)
  console.log(employee)
  dialog.open(EditEmployeeCard, {
    data: {
      employeeData: {
        dni: employee.dni,
        cmvp: employee.cmvp,
        names: employee.names,
        lastnames: employee.lastnames,
        address: employee.address,
        phone: employee.phone,
        headquarterId: employee.headquarter.headquarterId,
        birthdate: new Date(employee.birthdate),
        dirImage: employee.dirImage,
        roleId: employee.roles[0].roleId,
      } as EditEmployeeSchema,
      headquartersOptions: headquartersToOptionsSelect(await getAllHeadquarters()),
      rolesOptions: rolesToOptionsSelect(await getAllRoles()),
    },
    props: {
      modal: true,
      header: `${employeeData.lastnames} , ${employeeData.names}`,
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as EditEmployeeSchema
      if (data) {
        try {
          const employee = await updateEmployee(employeeData.id, data)
          console.log('Datos recibidos:', employee)
          loadEmployees()
          showToast('Empleado editado exitosamente: ' + employee.names, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.updateEmployee) {
            showToast(
              `Error al editar al empleado: ${employee.names} ${typedError.updateEmployee}`,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al editar al empleado: ' + employee.names, 'warn', 'Error')
          }
        }
      }
    },
  })
}

const openModalBlock = async (employee: EmployeeList) => {
  dialog.open(BlockCardPrimary, {
    data: {
      title: 'Empleado',
    },
    props: {
      modal: true,
      header: `Bloquear ${employee.names} ${employee.lastnames}`,
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as BlockSchema
      if (data) {
        await blockEmployee(employee.id, data.blockNote)
        loadEmployees()
        showToast('Empleado eliminado exitosamente: ' + employee.names, 'success', 'Éxito')
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

//for delete with confirm popup
const deleteEmployee = (event: MouseEvent | KeyboardEvent, employee: EmployeeList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere eliminar a este empleado?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger',
    },
    accept: async () => {
      console.log('Eliminando Empleado ', employee.id)
      openModalBlock(employee)
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

//for restore with confirm popup

const restoreEmployeeConfirm = (event: MouseEvent | KeyboardEvent, employee: EmployeeList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere restaurar a este empleado?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Reactivar',
      severity: 'success',
    },
    accept: async () => {
      await restoreEmployee(employee.id)
      showToast('Empleado restaurado exitosamente: ' + employee.names, 'success', 'Éxito')
      loadEmployees()
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

//for open modal of bloc

//for export
</script>

<template>
  <div class="layout-principal-flex">
    <CardLoader
      v-if="
        loading.createEmployee ||
        loading.updateEmployee ||
        loading.restoreEmployee ||
        loading.blockEmployee
      "
    />
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de empleados</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">DNI</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi pi-id-card`"></i>
                </InputGroupAddon>
                <InputMask
                  v-model="dni"
                  v-bind="dniAttrs"
                  :invalid="Boolean(errors.dni)"
                  class="w-full"
                  fluid
                  mask="99999999"
                  placeholder="74852321"
                  @update:model-value="searchEmployeeDebounce()"
                />
              </InputGroup>
              <Message v-if="errors.dni" severity="error" size="small" variant="simple">
                {{ errors.dni }}
              </Message>
            </div>

            <div>
              <label class="block mb-2">CMVP</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi pi-id-card`"></i>
                </InputGroupAddon>
                <InputMask
                  v-model="cmvp"
                  v-bind="cmvpAttrs"
                  :invalid="Boolean(errors.cmvp)"
                  class="w-full"
                  fluid
                  mask="99999"
                  placeholder="45123"
                  @update:model-value="searchEmployeeDebounce()"
                />
              </InputGroup>
              <Message v-if="errors.cmvp" severity="error" size="small" variant="simple">
                {{ errors.cmvp }}
              </Message>
            </div>

            <div v-for="element in searchElementsEmployee" :key="element.key">
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
                  @update:model-value="searchEmployeeDebounce()"
                  :placeholder="element.title"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>
            <!-- rol -->
            <div>
              <label class="block mb-2">Rol</label>
              <Select
                class="w-full"
                v-bind="rolAttrs"
                v-model="rol"
                :invalid="Boolean(errors.rol)"
                :options="rolesOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
                showClear
                @update:model-value="searchEmployeeDebounce()"
              />
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
                @update:model-value="searchEmployeeDebounce()"
              />
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
                @update:model-value="searchEmployeeDebounce()"
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

          <!-- imporve design responsive -->
          <!-- for messague loading  -->
          <Message v-if="loading.getAllEmployees" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllEmployees" severity="error" size="small" variant="simple">
            Error al cargar los empleados
          </Message>
          <!-- table -->
          <DataTable
            v-if="employees"
            paginator
            :rows="rows"
            :value="employees"
            :totalRecords="totalRecords"
            :lazy="true"
            :loading="loading.searchEmployees"
            :first="first"
            @page="loadEmployees"
            scrollable
            removableSort
            :rows-per-page-options="[1, 2, 3, 4]"
            ref="dt"
          >
            <template #header>
              <div class="w-full flex flex-col xs:flex-row justify-between gap-2 pb-4">
                <Button
                  icon="pi pi-user-plus"
                  iconPos="right"
                  severity="success"
                  label="Agregar Empleado"
                  @click="addEmployee"
                />
              </div>
            </template>
            <Column field="names" header="Nombres" sortable style="width: 18%"></Column>
            <Column field="lastnames" sortable header="Apellidos" style="width: 18%"></Column>
            <Column field="dni" sortable style="width: 15%" header="DNI"></Column>

            <Column class="hidden lg:table-cell" header="CMVP" sortable style="width: 15%">
              <template #body="{ data }">
                {{ data.cmvp ? data.cmvp : '' }}
                <Tag v-if="!data.cmvp" value="No requerido" severity="secondary" /> </template
            ></Column>

            <Column field="rolName" sortable header="Rol" style="width: 15%"> </Column>
            <Column field="nameHeadquarter" sortable style="width: 15%" header="Sede"> </Column>

            <Column header="Acciones">
              <template #body="{ data }">
                <div
                  class="flex justify-center items-center flex-row lg:flex-col xl:flex-row gap-1"
                >
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    aria-label="Ver"
                    size="small"
                    rounded
                    @click="viewEmployee(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    aria-label="Editar"
                    rounded
                    size="small"
                    v-if="roleMain === 'Administrador'"
                    @click="editEmployee(data)"
                  ></Button>
                  <Button
                    v-if="data.status === 'Activo' && roleMain === 'Administrador'"
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    aria-label="Bloquear"
                    rounded
                    size="small"
                    @click="deleteEmployee($event, data)"
                  ></Button>
                  <Button
                    v-if="data.status === 'Inactivo' && roleMain === 'Administrador'"
                    icon="pi pi-refresh"
                    severity="warn"
                    variant="text"
                    aria-label="Desbloquear"
                    rounded
                    size="small"
                    @click="restoreEmployeeConfirm($event, data)"
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
