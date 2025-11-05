<script lang="ts" setup>
import Tag from 'primevue/tag'

defineProps<{
  petName: string
  serviceName: string
  ownerName: string
  time: string
  status: string
}>()
</script>

<template>
  <div class="card-primary flex items-center w-full p-4">
    <i class="pi pi-clock mr-4 text-lg"> </i>
    <div class="flex-1 flex items-center justify-between">
      <div class="flex flex-col gap-2 items-start justify-center">
        <p>{{ `${petName} - ${serviceName}` }}</p>
        <p class="text-neutral-500">Dueño : {{ ownerName }}</p>
      </div>
      <div class="flex flex-col gap-2 items-center justify-end">
        {{ time }}
        <Tag :value="status" severity="secondary"> </Tag>
      </div>
    </div>
  </div>
</template>
