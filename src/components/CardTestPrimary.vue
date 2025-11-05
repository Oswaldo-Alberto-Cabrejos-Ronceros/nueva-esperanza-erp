<script lang="ts" setup>
import Tag from 'primevue/tag'
import Card from 'primevue/card'
defineProps<{
  testName: string
  testId: number
  petName: string
  testStatus: string
}>()
</script>

<template>
  <Card class="min-w-2xs dark:bg-transparent">
    <template #title>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">{{ testName }}</h3>
        <Tag :value="testStatus"></Tag>
      </div>
    </template>
    <template #content>
      <p>{{ petName }}</p>
    </template>
  </Card>
</template>

