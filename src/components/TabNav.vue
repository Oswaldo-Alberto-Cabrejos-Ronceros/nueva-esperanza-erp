<script lang="ts" setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import type { MenuItem } from 'primevue/menuitem'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const props = defineProps<{
  items: MenuItem[]
}>()
const activeTab = computed(() => {
  const currentPath = route.path
  const matchedItem = props.items.find((item) =>
    currentPath.startsWith(item.to as string)
  )
  return matchedItem?.to ?? props.items[0].to
})

function handleTabChange(value: string ) {
  if (value) router.push(value)
}
</script>

<template>
  <div class="card">
    <Tabs :value="activeTab">
      <TabList >
        <Tab  v-for="(tab, index) in items" :key="index" :value="tab.to" @click="handleTabChange(tab.to)">
          <span class="flex items-center gap-2">
            <i :class="tab.icon" />
            <span>{{ tab.label }}</span>
          </span>
        </Tab>
      </TabList>
    </Tabs>
  </div>
</template>
