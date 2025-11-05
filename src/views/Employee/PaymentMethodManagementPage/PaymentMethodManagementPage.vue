<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-payment-method'
import type { FormValues as SearchPaymentMethotSchema } from '@/validation-schemas-forms/schema-search-payment-method'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import type { PaymentMethod as PaymentMethodView } from '@/models/PaymentMethod'
import { useConfirm } from 'primevue'
import AddEditPaymentMethodCard from './components/AddEditPaymentMethodCard.vue'
import { useDialog, useToast } from 'primevue'
import type { FormValues as AddEditPaymentMethodSchema } from '@/validation-schemas-forms/schema-add-edit-payment-method'
import ViewPaymentMethodCard from './components/ViewPaymentMethodCard.vue'
import { usePaymentMethod } from '@/composables/usePaymentMethod'
import { debounce } from 'lodash'
import type { DataTablePageEvent } from 'primevue/datatable'
import type { PaymentMethodList } from '@/models/PaymentMethodList'
import { useAuthentication } from '@/composables/useAuthentication'
import type { OptionSelect } from '@/models/OptionSelect'
import Select from 'primevue/select'
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

const roleMain = ref<string>('')

const { getMainRole } = useAuthentication()

//get from compose

const {
  loading,
  error,
  createPaymentMethod,
  updatePaymentMethod,
  activatePaymentMethod,
  deletePaymentMethod,
  searchPaymentMethods,
  getPaymentMethodById,
} = usePaymentMethod()

const typedError = error as Record<string, string | null>

//payment methods

const paymentMethods = ref<PaymentMethodList[]>([])

const totalRecords = ref<number>(0)
const rows = ref<number>(10)
const first = ref<number>(0)
const searchPaymentMethodsDebounced = debounce(() => loadPaymentMethods(), 400)

onMounted(async () => {
  await loadPaymentMethods()
})

//for load payment methods

const loadPaymentMethods = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size

  const response = await searchPaymentMethods(page, size, name.value, status.value)

  paymentMethods.value = response.content
  totalRecords.value = response.totalElements
  const role = getMainRole()
  if (role) {
    roleMain.value = role
  }
}

//form
const { resetForm, handleSubmit, errors, defineField } = useForm<SearchPaymentMethotSchema>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    status: true,
  },
})

const handleResetForm = () => {
  resetForm()
  loadPaymentMethods()
}

const [name, nameAttrs] = defineField('name')
const [status, statusAttrs] = defineField('status')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

//for dialog
const dialog = useDialog()

const addPaymentMethod = () => {
  dialog.open(AddEditPaymentMethodCard, {
    props: {
      modal: true,
      header: 'Agregar método de pago',
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditPaymentMethodSchema
      if (data) {
        try {
          const paymentMethod = await createPaymentMethod(data)
          console.log('Datos recibidos del dialogo', paymentMethod)
          loadPaymentMethods()
          showToast('Método de pago agregado correctamente.', 'success', 'Éxito')
        } catch (error) {
          console.error('Error al crear el método de pago', error)
          if (typedError.createPaymentMethod) {
            showToast(
              'Error al crear el método de pago: ' + data.name + typedError.createPaymentMethod,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al crear el método de pago' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

const viewPaymentMethod = async (paymentMethodData: PaymentMethodList) => {
  const paymentMethod = await getPaymentMethodById(paymentMethodData.id)
  dialog.open(ViewPaymentMethodCard, {
    props: {
      modal: true,
      header: `${paymentMethodData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      paymentMethodData: paymentMethod,
    },
  })
}

const editPaymentMethod = async (paymentMethodData: PaymentMethodList) => {
  const paymentMethod = await getPaymentMethodById(paymentMethodData.id)
  dialog.open(AddEditPaymentMethodCard, {
    props: {
      modal: true,
      header: `${paymentMethodData.name}`,
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      paymentMethodData: paymentMethod as AddEditPaymentMethodSchema,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditPaymentMethodSchema
      if (data) {
        try {
          const paymentMethod = await updatePaymentMethod(paymentMethodData.id, data)
          console.log('Datos recibidos del dialogo', paymentMethod)
          loadPaymentMethods()
          showToast('Método de pago editado correctamente.', 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.updatePaymentMethod) {
            showToast(
              'Error al actualizar el método de pago: ' +
                data.name +
                typedError.updatePaymentMethod,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al actualizar el método de pago' + data.name, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

const handleDeleteReactivePaymentMethod = (
  event: MouseEvent | KeyboardEvent,
  paymentMethodData: PaymentMethodView,
) => {
  const isActive = true

  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: isActive
      ? '¿Seguro que quiere eliminar este método de pago?'
      : '¿Seguro que quiere reactivar este método de pago?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: isActive ? 'Desactivar' : 'Activar',
      severity: isActive ? 'danger' : 'success',
    },
    accept: async () => {
      if (isActive) {
        await deletePaymentMethod(paymentMethodData.id)
        showToast(
          'Método de pago eliminado exitosamente: ' + paymentMethodData.name,
          'success',
          'Éxito',
        )
      } else {
        await activatePaymentMethod(paymentMethodData.id)
        showToast(
          'Método de pago reactivado exitosamente: ' + paymentMethodData.name,
          'success',
          'Éxito',
        )
      }

      loadPaymentMethods()
    },
    reject: () => {
      console.log('Acción cancelada')
    },
  })
}

//for export

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
</script>

<template>
  <div class="layout-principal-flex">
    <CardLoader
      v-if="
        loading.deletePaymentMethod ||
        loading.updatePaymentMethod ||
        loading.activatePaymentMethod ||
        loading.createPaymentMethod
      "
    ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de metodos de pago</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <form @submit.prevent="onSubmit" class="form-search-grid-col-5">
            <div>
              <label class="block mb-2">Nombre</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i class="pi pi-info"></i>
                </InputGroupAddon>
                <InputText
                  v-model="name"
                  v-bind="nameAttrs"
                  :invalid="Boolean(errors.name)"
                  @update:model-value="searchPaymentMethodsDebounced"
                  class="w-full"
                  placeholder="Nombre"
                />
              </InputGroup>
              <Message v-if="errors.name" severity="error" size="small" variant="simple">
                {{ errors.name }}
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
                @update:model-value="searchPaymentMethodsDebounced"
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
          <Message
            v-if="loading.getAllPaymentMethods"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllPaymentMethods" severity="error" size="small" variant="simple">
            Error al cargar los métodos de pago
          </Message>

          <!-- table -->
          <DataTable
            :value="paymentMethods"
            paginator
            lazy
            :rows="rows"
            :first="first"
            :totalRecords="totalRecords"
            :loading="loading.searchPaymentMethods"
            :rows-per-page-options="[5, 10]"
            @page="loadPaymentMethods"
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
                  label="Agregar Método"
                  @click="addPaymentMethod"
                  v-if="roleMain === 'Administrador'"
                />
              </div>
            </template>

            <Column field="name" header="Nombre" sortable style="width: 20%"></Column>
            <Column field="description" sortable style="width: 60%" header="Descripción"></Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-col sm:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    size="small"
                    aria-label="Ver"
                    rounded
                    @click="viewPaymentMethod(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Editar"
                    rounded
                    v-if="roleMain === 'Administrador'"
                    @click="editPaymentMethod(data)"
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    size="small"
                    aria-label="Bloquear"
                    rounded
                    v-if="data.status === 'Activo' && roleMain === 'Administrador'"
                    @click="handleDeleteReactivePaymentMethod($event, data)"
                  />

                  <Button
                    v-if="data.status === 'Inactivo' && roleMain === 'Administrador'"
                    icon="pi pi-refresh"
                    severity="warn"
                    variant="text"
                    aria-label="Desbloquear"
                    rounded
                    size="small"
                    @click="handleDeleteReactivePaymentMethod($event, data)"
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
