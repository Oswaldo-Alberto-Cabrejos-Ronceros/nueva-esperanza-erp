<script lang="ts" setup>
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
 defineProps<{
  appointmentId: number
  appointmentStatus: string
  date: string
  petName?: string
  duration: number
  serviceName: string
  serviceDescription: string
}>()
</script>

<template>
  <Card class="w-full overflow-hidden h-min border border-neutral-300 dark:border-neutral-50 shadow">
    <template #header>
      <div
        class="w-full p-5 border-b justify-between border-neutral-300 dark:border-neutral-50 flex items-center text-lg font-medium"
      >
        <div class="flex gap-2 items-center">
          <h3>{{ serviceName }}</h3>
          <p class="text-base font-normal" v-if="petName">{{ petName }}</p>
        </div>
        <div class="flex gap-2 items-center">
          <h3>{{ date }}</h3>
          <h3>{{ duration }}</h3>
          <h3>minutos</h3>
        </div>
      </div>
    </template>
    <template #content>
      <div class="w-full flex gap-1.5">
        <div class="flex-1">
          {{ serviceDescription }}
        </div>
        <div class="flex flex-col gap-4 justify-between">
          <Tag :value="appointmentStatus"></Tag>
          <Button label="Cancelar" severity="danger" size="small" class="p-1"></Button>
        </div>
      </div>
    </template>
  </Card>
</template>
