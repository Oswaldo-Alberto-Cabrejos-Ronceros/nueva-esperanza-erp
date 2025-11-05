<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { schema } from '@/validation-schemas-forms/schema-add-edit-breed'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-breed'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { ref } from 'vue'
import type { OptionSelect } from '@/models/OptionSelect'
//form


const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    specieId: undefined
  },
})

//fields
const [name, nameAttrs] = defineField('name')
const [specieId, specieIdAttrs] = defineField('specieId')

//species options

const speciesOptions=ref<OptionSelect[]>([])

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    breedData?: FormValues,
    speciesOptions?:OptionSelect[]
  }
}>

//title
const title = ref<string>('Agregar')


const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

onMounted(() => {
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.breedData
    const speciesOptionsGet = dialogRef.value.data.speciesOptions
    //set data if edit
    if (params) {
      title.value = 'Editar'
      name.value = params.name
      specieId.value = params.specieId
    }
    //si existen opciones para species
    if(speciesOptionsGet){
      speciesOptions.value=speciesOptionsGet
    }
  }
})
</script>

<template>
  <div class="card-dialog-form-layout">

      <form @submit.prevent="onSubmit" class="form-dialog-layout-flex-col">
        <!-- name -->
        <div  class="w-full">
          <label class="block mb-2">Nombre</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputText
              v-model="name"
              v-bind="nameAttrs"
              :invalid="Boolean(errors.name)"
              class="w-full"
              placeholder="Nombre"
            />
          </InputGroup>
          <Message v-if="errors.name" severity="error" size="small" variant="simple">
            {{ errors.name }}
          </Message>
        </div>
        <!-- specie -->
        <div class="w-full">
          <label class="block mb-2">Especie</label>
          <Select
            class="w-full"
            v-bind="specieIdAttrs"
            v-model="specieId"
            :options="speciesOptions"
            :invalid="Boolean(errors.specieId)"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Especie"
          />

          <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
            {{ errors.specieId }}
          </Message>
        </div>
        <div class="w-full">
          <Button
            class="w-full"
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
