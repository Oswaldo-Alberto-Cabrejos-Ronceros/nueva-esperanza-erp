<script setup lang="ts">
import Card from 'primevue/card'
import { schema } from '@/validation-schemas-forms/schema-search-client'
import type { FormValues as SchemaSearchClient } from '@/validation-schemas-forms/schema-search-client'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue'
import ViewClientCard from './components/ViewClientCard.vue'
import { useDialog, useToast } from 'primevue'
import AddClientCard from './components/AddClientCard.vue'
import EditClientCard from './components/EditClientCard.vue'
//form
import InputMask from 'primevue/inputmask'
import type { FormValues as SchemaEditClient } from '@/validation-schemas-forms/schema-edit-client'
import type { FormValues as SchemaClientAdd } from '@/validation-schemas-forms/schema-add-client'
import { useClient } from '@/composables/useClient'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Headquarter } from '@/models/Headquarter'
import Select from 'primevue/select'
import { useHeadquarter } from '@/composables/useHeadquarter'
import { debounce } from 'lodash'
import type { ClientList } from '@/models/ClientList'
import BlockCardPrimary from '@/components/BlockCardPrimary.vue'
import type { FormValues as BlockSchema } from '@/validation-schemas-forms/schema-block-employee-client'
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

//methods
const { loading, error, createClient, updateClient, blockClient, searchClient, getClientById } =
  useClient()

const { getAllHeadquarters } = useHeadquarter()

const typedError = error as Record<string, string | null>

//clients
//refs
const clients = ref<ClientList[]>([])
const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

onMounted(async () => {
  loadClients()
})

//for search clients

const searchClientsDebounce = debounce(() => {
  loadClients()
})

//for load clients
const loadClients = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await searchClient(
    fieldMap.dni[0].value,
    fieldMap.names[0].value,
    fieldMap.lastnames[0].value,
    status.value,
    headquarterId.value,
    page,
    size,
  )
  clients.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements

  headquartersOptions.value = headquartersToOptionsSelect(await getAllHeadquarters())
}

const { resetForm,errors, defineField } = useForm<SchemaSearchClient>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    names: '',
    lastnames: '',
    status: true,
    headquarterId: undefined,
  },
})

const handleResetForm = () => {
  resetForm()
  loadClients()
}

const fieldMap = {
  dni: defineField('dni'),
  names: defineField('names'),
  lastnames: defineField('lastnames'),
}

//aditionals fields
const [status, statusAttrs] = defineField('status')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [dni, dniAttrs] = defineField('dni')
//for dialog
const dialog = useDialog()

const viewClient = async (clientData: ClientList) => {
  dialog.open(ViewClientCard, {
    data: {
      clientData: await getClientById(clientData.id),
    },
    props: {
      modal: true,
      header: `${clientData.lastnames}, ${clientData.names}`,
      blockScroll: true,
      dismissableMask: true,
    },
  })
}

const addClient = async () => {
  dialog.open(AddClientCard, {
    props: {
      modal: true,
      header: 'Agregar cliente',
      blockScroll: true,
      dismissableMask: true,
    },
    data: {
      headquartersOptions: headquartersToOptionsSelect(await getAllHeadquarters()),
    },
    onClose: async (options) => {
      const data = options?.data as SchemaClientAdd
      if (data) {
        try {
          const client = await createClient(data)
          console.log('Datos recibidos:', client)
          showToast('Cliente agregado exitosamente: ' + client.names, 'success', 'Éxito')
          loadClients()
        } catch (error) {
          console.error(error)
          if (typedError.createClient) {
            showToast(
              'Error al crear el cliente: ' + data.names + typedError.createClient,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al crear el cliente' + data.names, 'warn', 'Error')
          }
        }
      }
    },
  })
}

const editClient = async (clientData: ClientList) => {
  const client = await getClientById(clientData.id)
  dialog.open(EditClientCard, {
    data: {
      clientData: {
        dni: client.dni,
        names: client.names,
        lastnames: client.lastnames,
        phone: client.phone,
        address: client.phone,
        birthdate: new Date(client.birthdate),
        headquarterId: client.headquarter.headquarterId,
      } as SchemaEditClient,
      headquartersOptions: headquartersToOptionsSelect(await getAllHeadquarters()),
    },
    props: {
      modal: true,
      header: `${clientData.lastnames}, ${clientData.names}`,
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as SchemaEditClient
      if (data) {
        try {
          const client = await updateClient(clientData.id, data)
          console.log('Datos recibidos:', client)
          loadClients()
          showToast('Cliente editado exitosamente: ' + client.names, 'success', 'Éxito')
        } catch (error) {
          console.error(error)
          if (typedError.updateClient) {
            showToast(
              'Error al editar el cliente: ' + data.names + typedError.updateClient,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al editar el cliente: ' + data.names, 'warn', 'Error')
          }
        }
      }
    },
  })
}

//for confirm
const confirm = useConfirm()

const openModalBlock = async (client: ClientList) => {
  dialog.open(BlockCardPrimary, {
    data: {
      title: 'Cliente',
    },
    props: {
      modal: true,
      header: `Bloquear ${client.names} ${client.lastnames}`,
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as BlockSchema
      if (data) {
        await blockClient(client.id, data.blockNote)
        loadClients()
        showToast('Cliente bloqueado exitosamente: ' + client.names, 'success', 'Éxito')
      }
    },
  })
}

//for delete with confirm popup
const deleteClientAction = (event: MouseEvent | KeyboardEvent, client: ClientList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere bloquear a este cliente?',
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
      console.log('Eliminando Empleado ', client.id)
      openModalBlock(client)
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

//for delete with confirm popup
const restoreClientAction = (event: MouseEvent | KeyboardEvent, client: ClientList) => {
  confirm.require({
    group: 'confirmPopupGeneral',
    target: event.currentTarget as HTMLElement,
    message: '¿Seguro que quiere restaurar a este cliente?',
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
      console.log('Restaurando cliente ', client.id)

      loadClients()
      showToast('Cliente restaurado exitosamente: ' + client.names, 'success', 'Éxito')
    },
    reject: () => {
      console.log('Cancelando')
    },
  })
}

const searchElementsClient: { title: string; key: keyof typeof fieldMap; icon: string }[] = [
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

//for export

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

const headquartersOptions = ref<OptionSelect[]>([])

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}
</script>

<template>
  <div class="layout-principal-flex">
    <CardLoader v-if="loading.blockClient||loading.updateClient||loading.createClient"

    ></CardLoader>
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de Clientes</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <!-- form -->
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
                  @update:model-value="searchClientsDebounce()"
                />
              </InputGroup>
              <Message v-if="errors.dni" severity="error" size="small" variant="simple">
                {{ errors.dni }}
              </Message>
            </div>

            <div v-for="element in searchElementsClient" :key="element.key">
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
                  @update:model-value="searchClientsDebounce()"
                />
              </InputGroup>
              <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
                {{ errors[element.key] }}
              </Message>
            </div>

            <!-- headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-bind="headquarterIdAttrs"
                v-model="headquarterId"
                :invalid="Boolean(errors.headquarterId)"
                :options="headquartersOptions"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Sede"
                showClear
                @update:model-value="searchClientsDebounce()"
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
                @update:model-value="searchClientsDebounce()"
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
          <Message v-if="loading.getAllClients" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getAllClients" severity="error" size="small" variant="simple">
            Error al cargar los clientes
          </Message>
          <DataTable
            :value="clients"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="loading.searchClient"
            @page="loadClients"
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
                  label="Agregar Cliente"
                  @click="addClient"
                />
              </div>
            </template>
            <Column field="dni" sortable style="width: 18%" header="DNI"></Column>
            <Column header="Nombres" field="names" sortable style="width: 18%"></Column>
            <Column field="lastnames" sortable style="width: 15%" header="Apellidos"></Column>
            <Column field="headquarterName" sortable style="width: 15%" header="Sede"> </Column>
            <Column header="Acciones">
              <template #body="{ data }">
                <div class="flex items-center flex-row lg:flex-col xl:flex-row gap-1">
                  <Button
                    icon="pi pi-eye"
                    severity="info"
                    variant="text"
                    aria-label="Ver"
                    rounded
                    size="small"
                    @click="viewClient(data)"
                  ></Button>
                  <Button
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    aria-label="Editar"
                    rounded
                    size="small"
                    @click="editClient(data)"
                  ></Button>
                  <Button
                    icon="pi pi-ban"
                    severity="danger"
                    variant="text"
                    aria-label="Bloquear"
                    size="small"
                    rounded
                    v-if="data.status === 'Activo'"
                    @click="deleteClientAction($event, data)"
                  ></Button>
                  <Button
                    v-else
                    icon="pi pi-refresh"
                    severity="warn"
                    variant="text"
                    aria-label="Desbloquear"
                    rounded
                    size="small"
                    @click="restoreClientAction($event, data)"
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
