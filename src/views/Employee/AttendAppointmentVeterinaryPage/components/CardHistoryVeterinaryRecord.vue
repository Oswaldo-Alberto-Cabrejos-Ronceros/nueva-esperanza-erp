<script lang="ts" setup>
import Card from 'primevue/card'
import CardVeterinaryRecordSecondary from '@/components/CardVeterinaryRecordSecondary.vue'
import DataView from 'primevue/dataview'
import { useVeterinaryRecord } from '@/composables/useVeterinaryRecord'
import { onMounted, ref } from 'vue'
import type { VeterinaryRecordInfoTable } from '@/models/VeterinaryRecordInfoTable'
import type { DataViewPageEvent } from 'primevue/dataview'
const props = defineProps<{
  petId: number
}>()
const { loading, getAllInfoVeterinaryRecordsByPet } = useVeterinaryRecord()

const veterinaryRecords = ref<VeterinaryRecordInfoTable[]>([])

const totalRecords = ref<number>(0)

const rows = ref<number>(1)

const first = ref<number>(0)

onMounted(()=>{
  loadVeterinaryRecords()
})

const loadVeterinaryRecords = async (event?: DataViewPageEvent) => {
  const page = event ? event.first / event.rows : 0
  const size = event ? event.rows : rows.value
  rows.value = size
  const pageResponse = await getAllInfoVeterinaryRecordsByPet(props.petId, page, size)
  veterinaryRecords.value = pageResponse.content
  totalRecords.value = pageResponse.totalElements
}
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-file"></i>
        <p>Historial Médico</p>
      </div>
    </template>
    <template #subtitle>
      <p>Consultas y diagnosticos anteriores</p>
    </template>
    <template #content>
      <DataView             paginator
            :rows="rows"
            :totalRecords="totalRecords"
            :lazy="true"
            :first="first"
            :loading="loading.getAllInfoVeterinaryRecordsByPet"
            @page="loadVeterinaryRecords"
            :rows-per-page-options="[4, 8, 12]"
             data-key="id" :value="veterinaryRecords">
        <template #list="slotProps">
          <div class="flex flex-col">
            <CardVeterinaryRecordSecondary
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="mt-2"
              :record-id="item.id"
              :description="item.diagnosis"
              :service-name="''"
              :status="item.status"
              :date="item.date"
              :time="''"
              :employee-name="item.nameEmployee"
            />
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>
