<script lang="ts" setup>
import Image from 'primevue/image'
import Knob from 'primevue/knob'
import { onMounted, ref } from 'vue'
const props = defineProps<{
  serviceName: string
  serviceImageUrl: string
  categoryName: string
  value: number //from 0 to 100
}>()

const percent = ref<number>(0)

onMounted(() => {
  percent.value = props.value
})
</script>

<template>
  <div class="flex w-full p-2 items-center gap-3">
    <Image class="size-max shadow" image-class=" rounded size-12 object-cover" :src="serviceImageUrl"/>
    <div class="flex-1 flex flex-col justify-center items-start">
      <p class="font-semibold">{{ serviceName }}</p>
      <p class="text-neutral-500">{{ categoryName }}</p>
    </div>
    <Knob v-model="percent" readonly
    :size="60"/>
  </div>
</template>
