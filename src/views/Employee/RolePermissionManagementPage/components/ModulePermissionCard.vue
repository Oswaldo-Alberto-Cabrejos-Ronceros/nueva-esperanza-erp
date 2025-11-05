<script setup lang="ts">
import type { Permission } from '@/models/Permission'
import Card from 'primevue/card'
import Listbox from 'primevue/listbox'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
const props = defineProps<{
  name: string
  permisions: Permission[]
  authorizedPermissions: number[]
}>()

const selectedsPermission = ref() //for permission selected
const selectPermissions = ref() //for permission show in the listBox
const isDisabled = ref<boolean>(true)

const selectPermissionsAuxiliary = ref()

const buttonInfoEdit = {
  icon: 'pi-pencil',
  severity: 'warn',
  label: 'Editar',
}

const buttonInfoCancel = {
  icon: 'pi-times',
  severity: 'danger',
  label: 'Cancelar',
}

const buttonInfo = ref<{
  icon: string
  severity: string
  label: string
}>(buttonInfoEdit)

const edit = () => {
  if (!isDisabled.value) {
    selectedsPermission.value = selectPermissionsAuxiliary.value
    selectPermissionsAuxiliary.value = null
    buttonInfo.value = buttonInfoEdit
    isDisabled.value = true
  } else {
    buttonInfo.value = buttonInfoCancel
    isDisabled.value = false
    selectPermissionsAuxiliary.value = selectedsPermission.value
  }
}

onMounted(() => {
  const permissionOptions: { name: string; code: number }[] = []
  props.permisions.forEach((permission) => {
    permissionOptions.push({
      name: permission.name.split(' ')[0],
      code: permission.id,
    })
  })
  selectPermissions.value = permissionOptions

  const preselectedIds = props.authorizedPermissions
  selectedsPermission.value = permissionOptions.filter((option) =>
    preselectedIds.includes(option.code),
  )
})

//emit
const emit = defineEmits(['edit-permissions'])

const onSubmit = () => {
  emit('edit-permissions',selectedsPermission.value)
  selectPermissionsAuxiliary.value = null
      buttonInfo.value = buttonInfoEdit
    isDisabled.value = true
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card
      class="text-neutral-950 dark:text-surface-0 dark:bg-surface-800 px-4 py-4 border-1 border-neutral-400 dark:border-neutral-300"
    >
      <template #header>
        <div class="w-full flex gap-2 justify-between">
          <h3 class="textLg">{{ name }}</h3>
          <div class="flex gap-2">
            <Button
              :icon="`pi ${buttonInfo.icon}`"
              :severity="buttonInfo.severity"
              rounded
              :aria-label="buttonInfo.label"
              size="small"
              @click="edit"
            />
            <Button
              v-if="!isDisabled"
              :icon="`pi pi-save`"
              severity="success"
              rounded
              aria-label="Guardar"
              size="small"
              type="submit"
            />
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col">
          <Listbox
            v-model="selectedsPermission"
            :options="selectPermissions"
            multiple
            optionLabel="name"
            class="w-full border-none shadow-none bg-inherit"
            :disabled="isDisabled"
            checkmark
            :highlightOnSelect="false"
          />
        </div>
      </template>
    </Card>
  </form>
</template>
