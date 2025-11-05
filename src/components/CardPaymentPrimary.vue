<script lang="ts" setup>
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
defineProps<{
  clientName: string

  petName: string
  serviceName: string
  clientDni: string
  date: string
  time: string
  amount: number
  status: string
}>()
</script>

<template>
  <div class="card-primary flex w-full p-2 items-center gap-3">
    <Avatar class="size-10" shape="circle" :label="clientName.charAt(0)+clientName.charAt(1)">
    </Avatar>
    <div class="flex-1 flex flex-col justify-center items-start">
      <p>{{ clientName }} </p>
         <p class="text-neutral-500 text-sm">{{ clientDni }}</p>
      <p class="text-neutral-500 text-sm">{{ petName }} - {{ serviceName }}</p>
    </div>
    <div class="flex flex-col justify-center items-end">
      <p class="textLg text-green-600">S/{{ amount }}</p>
      <p class="text-neutral-500 text-sm">{{ date }}</p>
      <p class="text-neutral-500 text-sm">{{ time }}</p>
      <Tag :value="status" severity="secondary"></Tag>
    </div>
  </div>
</template>
