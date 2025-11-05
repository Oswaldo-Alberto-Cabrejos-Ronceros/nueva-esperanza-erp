<script lang="ts" setup>
import Avatar from 'primevue/avatar'
defineProps<{
  clientFullName: string
  clientInitials: string
  clientDni: string
}>()
</script>
<template>
  <div class="flex w-full p-2 items-center gap-3">
    <Avatar class="size-10"  shape="circle" :label="clientInitials"> </Avatar>
    <div class="flex-1 flex flex-col justify-center items-start">
      <p class="font-semibold">{{ clientFullName }}</p>
      <p class="text-neutral-500">{{ clientDni }}</p>
    </div>
  </div>
</template>
