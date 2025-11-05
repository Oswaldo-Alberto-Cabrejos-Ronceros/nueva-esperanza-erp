<script setup lang="ts">
import { schema } from '@/validation-schemas-forms/schema-edit-client'
import type { FormValues } from '@/validation-schemas-forms/schema-edit-client'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import type { Ref } from 'vue'
import { inject, onMounted,ref } from 'vue'
import { useReniec } from '@/composables/useReniec'
import type { OptionSelect } from '@/models/OptionSelect'
import InputMask from 'primevue/inputmask'

//methods

const { getInfoSimpleByReniec } = useReniec()

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    names: '',
    lastnames: '',
    phone: '',
    address: '',
    birthdate: undefined,
    headquarterId: undefined,
  },
})

//first fields

const fieldMap = {
  names: defineField('names'),
  lastnames: defineField('lastnames'),
  phone: defineField('phone'),
  address: defineField('address'),
}

//for additinal fields
const [dni, dniAttrs] = defineField('dni')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')

//textfields
const textFields: {
  title: string
  key: keyof typeof fieldMap
  icon: string
  placeholder: string
}[] = [
  {
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
    placeholder: 'Nombre del cliente',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
    placeholder: 'Apellidos del cliente',
  },
  {
    title: 'Celular',
    key: 'phone',
    icon: 'pi-mobile',
    placeholder: 'Ej: 984156123',
  },
  {
    title: 'Dirección',
    key: 'address',
    icon: 'pi-home',
    placeholder: 'Avenida, calle, número',
  },
]

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    clientData: FormValues,
    headquartersOptions?: OptionSelect[]
  }
}>

const headquartersOptions = ref<OptionSelect[]>([])

//for submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//for dialog

onMounted(() => {
  const params = dialogRef.value.data
  Object.entries(fieldMap).forEach(([key, [value]]) => {
    value.value = String(params.clientData[key as keyof typeof params.clientData])
  })
  headquarterId.value = params.clientData.headquarterId
  dni.value = params.clientData.dni
  if (params.clientData.birthdate instanceof Date) birthdate.value = params.clientData.birthdate
const headquartersOptionsGet = dialogRef.value.data.headquartersOptions
    if (headquartersOptionsGet) {
      headquartersOptions.value = headquartersOptionsGet
    }
})

//for search

const searchInfoReniec = async () => {
  if (dni.value?.length === 8) {
    try {
      const infoGet = await getInfoSimpleByReniec(dni.value)
      console.log(infoGet)
      fieldMap.names[0].value = infoGet.names
      fieldMap.lastnames[0].value = infoGet.lastnames
    } catch (e) {
      console.error('Error al obtener la informacion', e)

      fieldMap.names[0].value = ''
      fieldMap.lastnames[0].value = ''
    }
  }
}
</script>

<template>
  <div class="card-dialog-form-layout">
    <form @submit.prevent="onSubmit" class="form-dialog-layout">
      <div>
        <label class="block mb-2">DNI</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputMask
            id="basic"
            :invalid="Boolean(errors.dni)"
            fluid
            v-bind="dniAttrs"
            v-model="dni"
            mask="99999999"
            placeholder="74852321"
          />
          <InputGroupAddon>
            <Button
              icon="pi pi-search"
              severity="secondary"
              variant="text"
              @click="searchInfoReniec()"
            />
          </InputGroupAddon>
        </InputGroup>

        <Message v-if="errors.dni" severity="error" size="small" variant="simple">
          {{ errors.dni }}
        </Message>
      </div>
      <div v-for="element in textFields" :key="element.key">
        <label class="block mb-2">{{ element.title }}</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i :class="`pi ${element.icon}`"></i>
          </InputGroupAddon>
          <InputText
            v-model="fieldMap[element.key][0].value"
            v-bind="fieldMap[element.key][1]"
            :invalid="Boolean(errors[element.key])"
            class="w-full"
            :placeholder="element.placeholder"
          />
        </InputGroup>
        <Message v-if="errors[element.key]" severity="error" size="small" variant="simple">
          {{ errors[element.key] }}
        </Message>
      </div>
      <div>
        <label class="block mb-2">Fecha de nacimiento</label>
        <DatePicker
          v-bind="birthdateAttrs"
          v-model="birthdate"
          :invalid="Boolean(errors.birthdate)"
          showIcon
          fluid
          iconDisplay="input"
        />

        <Message v-if="errors.birthdate" severity="error" size="small" variant="simple">
          {{ errors.birthdate }}
        </Message>
      </div>
      <div>
        <label class="block mb-2">Sede</label>
        <Select
          class="w-full"
          v-bind="headquarterIdAttrs"
          v-model="headquarterId"
          :options="headquartersOptions"
          :invalid="Boolean(errors.headquarterId)"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Sede"
        />

        <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
          {{ errors.headquarterId }}
        </Message>
      </div>

      <div class="button-form-container-grid-end">
        <Button
          class="w-full max-w-md"
          label="Agregar"
          type="submit"
          severity="success"
          icon="pi pi-save"
          iconPos="right"
        />
      </div>
    </form>
  </div>
</template>
