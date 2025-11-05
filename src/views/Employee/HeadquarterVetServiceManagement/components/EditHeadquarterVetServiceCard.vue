<script lang="ts" setup>
import { inject, onMounted, type Ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import ToggleSwitch from 'primevue/toggleswitch';
import Button from 'primevue/button'
import { schema } from '@/validation-schemas-forms/schema-edit-headquarter-vet-service'
import type { FormValues } from '@/validation-schemas-forms/schema-edit-headquarter-vet-service'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

import Message from 'primevue/message'
const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    simultaneousCapacity: undefined,
    status: undefined,
  },
})

const [simultaneousCapacity, simultaneousCapacityAttrs] = defineField('simultaneousCapacity')
const [status, statusAttrs] = defineField('status')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    simultaneousCapacity: number
    status: boolean
  }
}>

onMounted(() => {
  if (dialogRef.value.data) {
    const data = dialogRef.value.data
    if (data) {
      console.log(data)
      simultaneousCapacity.value = data.simultaneousCapacity
      status.value = data.status
    }
  }
})
</script>

<template>
  <div class="card-dialog-form-layout">
    <form @submit.prevent="onSubmit" class="form-dialog-layout-flex-col">
      <!-- simultaneousCapacity -->


      <!-- status -->

            <div class="w-full">
        <label class="block mb-2">Capacidad simultanea</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-info"></i>
          </InputGroupAddon>
          <InputNumber
            v-model="simultaneousCapacity"
            v-bind="simultaneousCapacityAttrs"
            :invalid="Boolean(errors.simultaneousCapacity)"
            class="w-full"
            showButtons
          />
        </InputGroup>
        <Message v-if="errors.simultaneousCapacity" severity="error" size="small" variant="simple">
          {{ errors.simultaneousCapacity }}
        </Message>
      </div>
      <div class="w-full">

        <div class="flex gap-2 items-center">
          <label>Status</label>
          <ToggleSwitch
            v-model="status"
            v-bind="statusAttrs"
            :invalid="Boolean(errors.status)"

            placeholder="Capacidad simultanea"
            showButtons
          />
        </div>

        <Message v-if="errors.status" severity="error" size="small" variant="simple">
          {{ errors.status }}
        </Message>
      </div>
      <div class="w-full">
        <Button
          class="w-full"
          label="Guardar"
          type="submit"
          severity="success"
          icon="pi pi-save"
          iconPos="right"
        />
      </div>
    </form>
  </div>
</template>
