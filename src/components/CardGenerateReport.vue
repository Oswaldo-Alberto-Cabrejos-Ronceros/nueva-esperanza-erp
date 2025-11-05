<script lang="ts" setup>
import Card from 'primevue/card'
import Tag from 'primevue/tag'
defineProps<{
  title: string
  icon: string
  description: string
  incluyedFields: string[]
  lastGeneraded?: number
}>()
</script>

<template>
  <Card class="card-primary transition-opacity duration-300 hover:opacity-80 group">
    <template #title>
      <div class="w-full flex justify-between items-center">
        <h3>{{ title }}</h3>
        <i :class="`${icon} text-3xl text-primary transition-transform duration-300 group-hover:scale-105`"></i>
      </div>
    </template>
    <template #content>
      <div class="w-full flex flex-col gap-2">
        <p>
          {{ description }}
        </p>
        <p >Campos incluidos</p>
        <div class="flex gap-3 flex-wrap">
          <Tag
            v-for="(field, index) of incluyedFields"
            :key="index"
            :value="field"
            severity="secondary"
          />
        </div>
        <p v-if="lastGeneraded" class="textSm text-neutral-600 dark:text-neutral-400">
          Ultimo generado: Hace {{ lastGeneraded }} dias
        </p>
      </div>
    </template>
  </Card>
</template>
