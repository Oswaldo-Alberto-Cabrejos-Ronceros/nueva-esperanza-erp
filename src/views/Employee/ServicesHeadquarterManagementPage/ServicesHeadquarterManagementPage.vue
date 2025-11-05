<script setup lang="ts">
import Card from 'primevue/card'
import Select from 'primevue/select'
import { ref } from 'vue'
import ServiceHeadquarterSets from '@/assets/data/services-headquarters-sets.json'
import type { ServiceHeadquarterSet } from '@/models/ServiceHeadquarterSet'
import { watch } from 'vue'
import PickList from 'primevue/picklist'
import Button from 'primevue/button'

//headquarters
const headquarters = [
  { name: 'Ica', value: 1 },
  { name: 'Parcona', value: 2 },
  { name: 'Subtanjalla', value: 3 },
  { name: 'La Tinguiña', value: 4 },
  { name: 'Pueblo Nuevo', value: 5 },
  { name: 'Chincha Alta', value: 6 },
  { name: 'Nazca', value: 7 },
  { name: 'Vista Alegre', value: 8 },
  { name: 'Tate', value: 9 },
  { name: 'Los Aquijes', value: 10 },
]

//serviceHeadquartersSets
const serviceHeadquartersSets: ServiceHeadquarterSet[] = ServiceHeadquarterSets

const headquarterSelected = ref<number>(1)

const serviceHeadquarterSetSelected = ref<ServiceHeadquarterSet>(
  serviceHeadquartersSets[headquarterSelected.value - 1],
)
//for assignedServices
const assignedServices = ref(serviceHeadquarterSetSelected.value.assignedServices)
//for unassignedServices
const unassignedServices = ref(serviceHeadquarterSetSelected.value.unassignedServices)

//for PickList
const selectedsServices = ref([unassignedServices.value, assignedServices.value])

const isDisabled = ref<boolean>(true)

const selectedsServicesAuxiliary = ref()

const buttonInfoEdit = {
  icon: 'pi-pencil',
  severity: 'warn',
  ariaLabel: 'Editar',
  rounded: false,
  iconPos: 'right',
  size: '',
  label: 'Editar',
}

const buttonInfoCancel = {
  icon: 'pi-times',
  severity: 'danger',
  ariaLabel: 'Cancelar',
  rounded: true,
  iconPos: '',
  size: 'small',
  label: '',
}

const buttonInfo = ref<{
  icon: string
  severity: string
  ariaLabel: string
  rounded: boolean
  iconPos: string
  size: string
  label: string
}>(buttonInfoEdit)

const edit = () => {
  if (!isDisabled.value) {
    selectedsServices.value = selectedsServicesAuxiliary.value
    selectedsServicesAuxiliary.value = null
    buttonInfo.value = buttonInfoEdit
    isDisabled.value = true
  } else {
    buttonInfo.value = buttonInfoCancel
    isDisabled.value = false
    selectedsServicesAuxiliary.value = selectedsServices.value
  }
}

//for submit

const onSubmit = () => {
  isDisabled.value = true
  console.log(serviceHeadquarterSetSelected.value)
  selectedsServicesAuxiliary.value = null
  buttonInfo.value = buttonInfoEdit
  isDisabled.value = true
}

watch(headquarterSelected, (newValue) => {
  serviceHeadquarterSetSelected.value = serviceHeadquartersSets[newValue - 1]
  console.log(serviceHeadquarterSetSelected.value)
  assignedServices.value = serviceHeadquarterSetSelected.value.assignedServices
  unassignedServices.value = serviceHeadquarterSetSelected.value.unassignedServices
  selectedsServices.value = [unassignedServices.value, assignedServices.value]
})
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión servicios por sede</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <div class="form-search-grid-col-5">
            <!-- for headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <Select
                class="w-full"
                v-model="headquarterSelected"
                :options="headquarters"
                optionLabel="name"
                optionValue="value"
                placeholder="Selecciona Rol"
              />
            </div>
          </div>
          <form @submit.prevent="onSubmit" class="w-full flex flex-col items-center justify-center">
            <PickList
              v-model="selectedsServices"
              dataKey="id"
              breakpoint="1400px"
              :disabled="isDisabled"
            >
              <template #option="{ option }">
                {{ option.serviceName }}
              </template>
            </PickList>
            <div class="w-full flex gap-6 justify-end">
              <Button
                v-if="!isDisabled"
                class="w-full max-w-xs"
                label="Guardar"
                type="submit"
                severity="success"
                icon="pi pi-save"
                iconPos="right"
              />

              <Button
                :icon="`pi ${buttonInfo.icon}`"
                :severity="buttonInfo.severity"
                :rounded="buttonInfo.rounded"
                :icon-pos="buttonInfo.iconPos"
                :aria-label="buttonInfo.ariaLabel"
                :size="buttonInfo.size"
                :label="buttonInfo.label"
                class="self-center"
                @click="edit"
              />
            </div>
          </form>
        </div>
      </template>
    </Card>
  </div>
</template>
