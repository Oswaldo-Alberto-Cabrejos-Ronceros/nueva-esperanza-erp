<script lang="ts" setup>
import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import Message from 'primevue/message'
import { schema } from '@/validation-schemas-forms/schema-add-weight-pet'
import type { FormValues } from '@/validation-schemas-forms/schema-add-weight-pet'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Button from 'primevue/button'


const emit = defineEmits(['set-weight'])


defineProps<{
  loading:boolean,
  desactive:boolean
}>()

//form
const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    weight: undefined,
  },
})



const [weight, weightAttrs] = defineField('weight')

const onSubmit = handleSubmit((values) => {
  emit('set-weight',values)
})
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center">
        <i class="pi pi-calendar-plus"></i>
        <p>Signos Vitales</p>
      </div>
    </template>
    <template #subtitle>
      <p>Párametros del paciente</p>
    </template>
    <template #content>
      <div class="form-search-grid-col-5">
        <div>
          <label class="block mb-2">Temperatura (C°)</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-sort-alt"></i>
            </InputGroupAddon>
            <InputNumber class="w-full" placeholder="38.5" />
          </InputGroup>
        </div>

        <form @submit.prevent="onSubmit">
          <label class="block mb-2">Peso (Kg)</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
              <InputNumber
                v-model="weight"
                v-bind="weightAttrs"
                :invalid="Boolean(errors.weight)"
                class="w-full"
                placeholder="40"
              />
                   <InputGroupAddon>
            <Button
              icon="pi pi-save"
              severity="secondary"
              variant="text" type="submit"
              :loading="loading"
              :disabled="desactive"
            />
          </InputGroupAddon>
          </InputGroup>
          <Message v-if="errors.weight" severity="error" size="small" variant="simple">
            {{ errors.weight }}
          </Message>
        </form>

        <div>
          <label class="block mb-2">Freq. Cardíaca (C°)</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-heart"></i>
            </InputGroupAddon>
            <InputNumber class="w-full" placeholder="120" />
          </InputGroup>
        </div>

        <div>
          <label class="block mb-2">Freq. Respiratoria (rpm)</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputNumber class="w-full" placeholder="24" />
          </InputGroup>
        </div>

        <div>
          <label class="block mb-2">Presión Arterial (mmHg)</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputNumber class="w-full" placeholder="120/80" />
          </InputGroup>
        </div>
      </div>
    </template>
  </Card>
</template>
