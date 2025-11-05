<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Textarea from 'primevue/textarea'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { inject, onMounted, type Ref, ref } from 'vue'
import { schema } from '@/validation-schemas-forms/schema-add-edit-roles'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-roles'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import Select from 'primevue/select'

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    position: undefined,
    description: '',
  },
})

const [name, nameAttrs] = defineField('name')
const [position, positionAttrs] = defineField('position')
const [description, descriptionAttrs] = defineField('description')

//for position
const positions = [
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
]

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    roleData?: FormValues
  }
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//title reactive
const title = ref<string>('Agregar')

onMounted(() => {
  if (dialogRef.value.data) {
    const params = dialogRef.value.data.roleData
    if (params) {
      title.value = 'Editar'
      name.value = params.name
      position.value = params.position
      description.value = params.description
    }
  }
})
</script>

<template>
  <div class="card-dialog-form-layout">

      <form @submit.prevent="onSubmit" class="form-dialog-layout-col-2">
        <!-- name -->
        <div>
          <label class="block mb-2">Nombre</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputText v-model="name" v-bind="nameAttrs" :invalid="Boolean(errors.name)" class="w-full" placeholder="Nombre" />
          </InputGroup>
          <Message v-if="errors.name" severity="error" size="small" variant="simple">
            {{ errors.name }}
          </Message>
        </div>

        <!-- position -->

        <div>
          <label class="block mb-2">Posición</label>
          <Select
            class="w-full"
            v-bind="positionAttrs"
            v-model="position"
            :invalid="Boolean(errors.position)"
            :options="positions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona posición"
          />

          <Message v-if="errors.position" severity="error" size="small" variant="simple">
            {{ errors.position }}
          </Message>
        </div>

        <div>
          <label class="block mb-2">Descripción</label>

          <IftaLabel>
            <Textarea
              id="description"
              v-model="description"
              v-bind="descriptionAttrs"
              :invalid="Boolean(errors.description)"
              rows="5"
              class="resize-none w-full"
            />
            <label for="description">Descripción</label>
          </IftaLabel>

          <Message v-if="errors.description" severity="error" size="small" variant="simple">
            {{ errors.description }}
          </Message>
        </div>
        <div class="button-form-container-grid-end">
          <Button
            class="w-full max-w-md"
            :label="title"
            type="submit"
            severity="success"
            icon="pi pi-save"
            iconPos="right"
          />
        </div>
      </form>
  </div>
</template>
