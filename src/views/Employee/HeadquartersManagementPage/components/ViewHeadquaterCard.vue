<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { ref } from 'vue'
import type { Headquarter } from '@/models/Headquarter'

const headquarterData = ref<Headquarter | null>(null)

const dialogRef = inject('dialogRef') as Ref<{
  close: () => void
  data: {
    headquarterData: Headquarter
  }
}>

onMounted(() => {
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.headquarterData
    if (params) {
      headquarterData.value = params
    }
  }
})

const elements: { title: string; key: keyof Headquarter; icon: string }[] = [
  {
    title: 'Dirección',
    key: 'address',
    icon: 'pi-map-marker',
  },
  {
    title: 'Teléfono',
    key: 'phone',
    icon: 'pi-mobile',
  },
  {
    title: 'Email',
    key: 'email',
    icon: 'pi-envelope',
  },
  {
    title: 'Distrito',
    key: 'district',
    icon: 'pi-map',
  },
  {
    title: 'Provincia',
    key: 'province',
    icon: 'pi-map',
  },
  {
    title: 'Departamento',
    key: 'departament',
    icon: 'pi-map',
  },
  {
    title: 'Hora de apertura',
    key: 'startTime',
    icon: 'pi-clock',
  },
  {
    title: 'Hora de cierre',
    key: 'endTime',
    icon: 'pi-clock',
  },
]
</script>

<template>
  <div class="card-dialog-form-layout" v-if="headquarterData">
    <div class="flex-1 space-y-6">
      <div class="form-dialog-layout">
        <div v-for="(element, id) in elements" :key="id">
          <label class="block mb-2">{{ element.title }}</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i :class="`pi ${element.icon}`"></i>
            </InputGroupAddon>
            <InputText :value="headquarterData[element.key]" disabled class="w-full" />
          </InputGroup>
        </div>
      </div>
    </div>
  </div>
</template>
