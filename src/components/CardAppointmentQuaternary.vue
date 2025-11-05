<script lang="ts" setup>
import Tag from 'primevue/tag';
defineProps<{
  petName: string
  petBreed:string
  employeeName:string
  serviceName: string
  ownerName: string
  time: string
  status: string
}>()
</script>

<template>
<div class="card-primary flex items-center w-full p-4">
  <i class="pi pi-clock mr-4 text-lg"> </i>
<div class="flex-1 flex flex-col justify-between">
  <p class=" font-semibold"> {{ `${time} - ${petName} (${petBreed}) . ${ownerName} ` }}</p>
   <p class="text-neutral-500 text-sm">{{ `${serviceName} - Dr. ${employeeName}` }}</p>
</div>
  <Tag :value="status" severity="secondary"> </Tag>
</div>
</template>


