<script lang="ts" setup>

defineProps<{
  icon: string
  title: string
  content: string
}>()
</script>

<template>
  <div class="card-primary p-3.5">
    <div class="flex items-center w-full">
      <i :class="`${icon} mr-4 text-lg`"> </i>
      <div class="flex-1 flex flex-col justify-between">
        <p class="font-semibold">{{ title }}</p>
        <p class="text-neutral-500 text-sm">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>
