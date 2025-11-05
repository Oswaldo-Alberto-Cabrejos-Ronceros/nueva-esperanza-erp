<script lang="ts" setup>
import type { HeadquarterServiceInfoPanel } from '@/models/HeadquarterServiceInfoPanel'
import Image from 'primevue/image'
import { inject, onMounted, ref, type Ref } from 'vue'

const headquarterServiceInfo = ref<HeadquarterServiceInfoPanel | null>(null)

const dialogRef = inject('dialogRef') as Ref<{
  close: () => void
  data: {
    headquarterServiceInfo: HeadquarterServiceInfoPanel
  }
}>

onMounted(() => {
  if (dialogRef.value.data) {
    headquarterServiceInfo.value = dialogRef.value.data.headquarterServiceInfo
  }
})
</script>

<template>
  <div v-if="headquarterServiceInfo" class="card-dialog-form-layout">
    <div class="flex flex-col gap-1">
      <Image
        :src="''"
        :alt="headquarterServiceInfo.serviceName"
        class="w-2xs min-h-44"
        image-class="size-full object-cover"
        preview
      />
      <p class="p-card-subtitle">
        {{ headquarterServiceInfo.categoryName }} - {{ headquarterServiceInfo.specieName }}
      </p>
      <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 textSm">
        <i class="pi pi-warehouse"></i>
        <p>{{ headquarterServiceInfo.headquarterName }}</p>
      </div>
      <p>{{ headquarterServiceInfo.serviceDescription }}</p>
      <div class="w-full flex gap-1 text-lg flex-1 items-center justify-between">
        <div class="flex gap-1 text-pink-500 items-center">
          <i class="pi pi-clock text-xl"></i>
          <p>{{ headquarterServiceInfo.serviceDuration }} minutos</p>
        </div>

        <div class="flex gap-1 text-green-500 items-center">
          <i class="pi pi-money-bill text-xl"></i>
          <p>S/{{ headquarterServiceInfo.servicePrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
