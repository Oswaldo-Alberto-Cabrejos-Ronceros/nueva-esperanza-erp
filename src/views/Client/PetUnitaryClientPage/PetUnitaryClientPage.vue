<script lang="ts" setup>
import type { Pet } from '@/models/Pet'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import Image from 'primevue/image'
import Message from 'primevue/message'
import { usePet } from '@/composables/usePet'
import { useVeterinaryRecord } from '@/composables/useVeterinaryRecord'
import type { VeterinaryRecordInfoTable } from '@/models/VeterinaryRecordInfoTable'
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useAuthentication } from '@/composables/useAuthentication'
import { useClient } from '@/composables/useClient'
import CardOwnerPrimary from '@/components/CardOwnerPrimary.vue'
import Tag from 'primevue/tag'
import type { Client } from '@/models/Client'
import CardEditVetRecord from '../../../components/CardEditVetRecord.vue'
import { useDialog } from 'primevue/usedialog'
import type { FormValues as AddEditVeterinaryRecord } from '@/validation-schemas-forms/schema-add-edit-veterinary-record'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue'

const props = defineProps<{
  petId: string
}>()

const ownerInfo = ref<Client | null>(null)

const { loading: petLoading, error: petError, getPetById } = usePet()

const roleMain = ref<string>('')

const { getMainRole } = useAuthentication()

const {
  loading: veterinaryRecordLoading,
  error: veterinaryRecordError,
  setVeterinaryRecordCompletado,
  updateVeterinaryRecord,
  findVeterinaryRecordById,
  getAllInfoVeterinaryRecordsByPet,
} = useVeterinaryRecord()

const typedError = veterinaryRecordError as Record<string, string | null>

const petData = ref<Pet | null>(null)
//for record
const veterinaryRecords = ref<VeterinaryRecordInfoTable[]>([])

const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

const { getClientById } = useClient()

//for loadVeterinaryRecords
const loadVeterinaryRecords = async (event?: DataTablePageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await getAllInfoVeterinaryRecordsByPet(Number(props.petId), page, size)
  veterinaryRecords.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements
}

onMounted(async () => {
  petData.value = await getPetById(Number(props.petId))
  const role = getMainRole()
  if (role) {
    roleMain.value = role
    if (role !== 'Cliente') {
      const clientId = petData.value.clientId
      if (clientId) {
        ownerInfo.value = await getClientById(clientId)
      }
    }
  }
  loadVeterinaryRecords()
})

//for dialog
const dialog = useDialog()

const toast = useToast()

const showToast = (message: string, severity: string, sumary: string) => {
  toast.add({
    severity: severity,
    summary: sumary,
    detail: message,
    life: 3000,
  })
}

const editRecord = async (recordInfoTable: VeterinaryRecordInfoTable) => {
  const record = await findVeterinaryRecordById(recordInfoTable.id)
  dialog.open(CardEditVetRecord, {
    props: {
      modal: true,
      header: 'Editar Informe',
    },
    data: {
      recordData: {
        careId: record.careId,
        employeeId: record.employeeId,
        dateCreate: new Date(record.date),
        diagnosis: record.diagnosis,
        treatment: record.treatment,
        observation: record.observation,
        resultUrl: record.resultUrl??undefined,
        status: record.status,
      } as AddEditVeterinaryRecord,
    },
    onClose: async (options) => {
      const data = options?.data as AddEditVeterinaryRecord
      if (data) {
        try {
          await updateVeterinaryRecord(recordInfoTable.id, data)
          loadVeterinaryRecords()
          showToast('Reporte medico editado correctamente', 'success', 'Exito')
        } catch (error) {
          console.error(error)
          if (typedError.updateVeterinaryRecord) {
            showToast(
              `Error al editar reporte medico: ${typedError.updateEmployee}`,
              'warn',
              'Error',
            )
          } else {
            showToast('Error al editar el reporte medico: ', 'warn', 'Error')
          }
        }
      }
    },
  })
}

//toast

const confirm = useConfirm()

const confirmCompleteRecord = (
  event: MouseEvent | KeyboardEvent,
  record: VeterinaryRecordInfoTable,
) => {
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
      label: 'Completar',
      severity: 'success',
    },
    accept: async () => {
      try {
        await setVeterinaryRecordCompletado(record.id)
        loadVeterinaryRecords()
        showToast('Informe completado correctamente', 'success', 'Éxito')
      } catch (error) {
        console.error(error)
        if (typedError.updateVeterinaryRecord) {
          showToast(
            `Error al completar reporte medico: ${typedError.updateEmployee}`,
            'warn',
            'Error',
          )
        } else {
          showToast('Error al completar el reporte medico: ', 'warn', 'Error')
        }
      }
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
    <Card class="card-principal-color-neutral">
      <template #title>
        <Message v-if="petLoading.getPetById" severity="warn" size="small" variant="simple">
          Cargando ...
        </Message>
        <!-- for messague error -->
        <Message v-if="petError.getPetById" severity="error" size="small" variant="simple">
          Error al cargar la información de la mascota
        </Message>
        <div class="textLg flex gap-2"></div>
      </template>
      <template #content>
        <div class="w-full flex flex-col gap-2">
          <CardOwnerPrimary
            v-if="ownerInfo"
            :names="ownerInfo.names"
            :lastnames="ownerInfo.lastnames"
            :phone="ownerInfo.phone"
            :address="ownerInfo.address"
          ></CardOwnerPrimary>
          <!-- section appointements -->
          <!-- section 1 pet information -->
          <div class="card-primary p-4 dark:bg-surface-900 flex flex-col-reverse sm:flex-row gap-3">
            <!-- image -->
            <Image
              :src="petData?.urlImage"
              :alt="petData?.name"
              image-class=" sm:size-40 object-cover rounded"
              preview
            />
            <!-- content -->
            <div class="flex-1 flex flex-col gap-1 textLg">
              <div class="flex items-center justify-between">
                <h3 class="h3 font-semibold">{{ petData?.name }}</h3>
                <i
                  :class="
                    petData?.gender === 'H'
                      ? 'pi pi-venus text-pink-500 text-xl'
                      : 'pi pi-mars text-blue-600 text-xl'
                  "
                ></i>
              </div>
              <div class="flex flex-col md:flex-row md:items-center textBase gap-2">
                <div class="flex items-center gap-1">
                  <i class="pi pi-heart"></i>
                  <p>{{ petData?.specie.name }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fa-solid fa-paw"></i>
                  <p>{{ petData?.breed.name }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fa-solid fa-weight-hanging"></i>
                  <p>{{ petData?.weight }} Kg</p>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fa-solid fa-cake-candles"></i>
                  <p>{{ petData?.birthdate }}</p>
                </div>
              </div>
              <p v-if="petData?.comment">Comentario:</p>
              <p v-if="petData?.comment" class="textBase">{{ petData?.comment }}</p>
            </div>
          </div>

          <!-- title and select -->
          <div class="w-full flex justify-between items-center mt-2">
            <h3 class="h3">Mi historial clínico</h3>
            <div></div>
          </div>
          <Message
            v-if="veterinaryRecordLoading.getPetById"
            severity="warn"
            size="small"
            variant="simple"
          >
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message
            v-if="veterinaryRecordError.getPetById"
            severity="error"
            size="small"
            variant="simple"
          >
            Error al cargar el historial de la mascota
          </Message>
          <!-- table -->
          <DataTable
            v-if="veterinaryRecords"
            :value="veterinaryRecords"
            paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            scrollable
            removableSort
            :loading="veterinaryRecordLoading.getAllInfoVeterinaryRecordsByPet"
            @page="loadVeterinaryRecords"
            :rows-per-page-options="[4, 8, 12]"
            ref="dt"
          >
            <Column field="date" sortable header="Fecha" style="width: 10%"></Column>
            <Column field="nameHeadquarter" sortable header="Sede" style="width: 12%"></Column>
            <Column field="nameEmployee" header="Empleado" sortable style="width: 15%"></Column>
            <Column field="diagnosis" header="Diagnostico" sortable style="width: 10%"></Column>
            <Column field="treatment" header="Tratamiento" sortable style="width: 10%"></Column>
            <Column header="Observación" sortable style="width: 10%">
              <template #body="{ data }">
                {{ data.observation }}
                <Tag
                  v-if="!data.observation"
                  severity="secondary"
                  value="No contiene"
                ></Tag> </template
            ></Column>
            <Column field="status" header="Estado" sortable style="width: 12%"></Column>
            <Column header="Acciones" v-if="roleMain !== 'Cliente'">
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
                    icon="pi pi-pencil"
                    severity="warn"
                    variant="text"
                    size="small"
                    aria-label="Editar"
                    rounded
                    @click="editRecord(data)"
                    v-if="data.status !== 'Completado'"
                  ></Button>

                  <Button
                    icon="pi pi-check"
                    severity="success"
                    variant="text"
                    size="small"
                    aria-label="Completar"
                    rounded
                    v-if="data.status === 'En observacion' || data.status === 'En curso'"
                    @click="confirmCompleteRecord($event, data)"
                  ></Button>

                  <Button
                    icon="pi pi-file"
                    severity="success"
                    variant="text"
                    size="small"
                    aria-label="Descargar archivo"
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
