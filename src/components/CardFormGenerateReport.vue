<script lang="ts" setup>
import { inject, type Ref } from 'vue'
import Message from 'primevue/message'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { schema } from '@/validation-schemas-forms/schema-generate-report'
import type { FormValues } from '@/validation-schemas-forms/schema-generate-report'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import type { OptionSelect } from '@/models/OptionSelect'

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    period: undefined,
  },
})

const [period, periodAttrs] = defineField('period')

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

const periods: OptionSelect[] = [
  {
    value: 'DAILY',
    name: 'Dia',
  },
  {
    value: 'WEEKLY',
    name: 'Semana',
  },
  {
    value: 'MONTHLY',
    name: 'Mes',
  },
  {
    value: 'YEARLY',
    name: 'Año',
  },
]
</script>

<template>
  <div class="card-dialog-form-layout min-w-xs">
    <form @submit.prevent="onSubmit" class="form-dialog-layout-flex-col">
      <div class="w-full">
        <label class="block mb-2">Periodo</label>
        <Select
          class="w-full"
          v-bind="periodAttrs"
          v-model="period"
          :options="periods"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Periodo"
        />

        <Message v-if="errors.period" severity="error" size="small" variant="simple">
          {{ errors.period }}
        </Message>
      </div>
      <div class="w-full grid grid-cols-1 gap-2">
        <Button
          class="w-full"
          label="Generar Pdf"
          type="submit"
          severity="danger"
          icon="pi pi-file-pdf"
          iconPos="right"
        />
      </div>
    </form>
  </div>
</template>
