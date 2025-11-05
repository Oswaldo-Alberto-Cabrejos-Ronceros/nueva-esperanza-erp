<script lang="ts" setup>
import Tag from 'primevue/tag'
import Button from 'primevue/button'
defineProps<{
  recordId: number
  description: string
  serviceName: string
  status: string
  date: string
  time: string
  employeeName: string
}>()
</script>

<template>
  <div class="card-primary flex items-center w-full p-4">
    <i class="pi pi-clock mr-4 text-2xl"> </i>
    <div class="flex-1 flex items-center justify-between">
      <div class="flex flex-col gap-2 items-start justify-center">
        <p>{{ serviceName }}</p>
        <p class="text-neutral-600 dark:text-neutral-400">{{ description }}</p>
        <p class="text-neutral-600 dark:text-neutral-400 text-sm">{{ date }} - {{ time }} Dr.{{ employeeName }}</p>
      </div>
      <div class="flex self-start gap-2 items-start justify-center">
        <Tag :value="status" severity="secondary" class=" self-center"> </Tag>
        <Button
          icon="pi pi-eye"
          severity="secondary"
          variant="text"
          rounded
          aria-label="Ver completa"
        />
      </div>
    </div>
  </div>
</template>
