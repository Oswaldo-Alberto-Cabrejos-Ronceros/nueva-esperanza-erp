<script lang="ts" setup>
import Card from 'primevue/card'

defineProps<{
  title: string
  icon: string
  content: string
  plus?: string
}>()
</script>

<template>
  <Card class="card-primary min-w-40 min-h-40 p-1">
    <template #content>
      <div class="w-full flex items-center gap-1 justify-between">
        <p class=" font-semibold">{{ title }}</p>
        <i :class="`pi ${icon} text-neutral-500`"> </i>
      </div>
      <div class="flex flex-col items-start">
        <h2 class="h2 font-bold text-primary">
          {{ content }}
        </h2>
        <p class="textSm text-neutral-500">{{ plus }}</p>
      </div>
    </template>
  </Card>
</template>
