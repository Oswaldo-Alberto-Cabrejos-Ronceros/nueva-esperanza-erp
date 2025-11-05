<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-edit-self-employee'
import type { FormValues } from '@/validation-schemas-forms/schema-edit-self-employee'
import { useForm } from 'vee-validate'
import Button from 'primevue/button'
import { inject, onMounted } from 'vue'
import type { EditSelfEmployee } from '@/models/EditSelfEmployee'
import { toTypedSchema } from '@vee-validate/yup'
import type { Ref } from 'vue'

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    phone: '',
    address: '',
    headquarterId: undefined,
    dirImage: '',
  },
})

//headquarterIds
const headquarkers = [
  { name: 'Ica', value: 1 },
  { name: 'Parcona', value: 2 },
  { name: 'Tinguiña', value: 3 },
]

const [address, addressAttrs] = defineField('address')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [phone, phoneAttrs] = defineField('phone')
const [dirImage, dirImageAttrs] = defineField('dirImage')

const onSubmit = handleSubmit((values) => {
  dialogRef.value.close(values as EditSelfEmployee)
})

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: EditSelfEmployee) => void
  data: EditSelfEmployee
}>

onMounted(() => {
  const params = dialogRef.value.data
  //change default values
  address.value = params.address
  headquarterId.value = params.headquarterId
  phone.value = params.phone
  dirImage.value = params.dirImage
})
</script>

<template>
  <div class="card-dialog-form-layout">
    <form @submit.prevent="onSubmit" class="form-dialog-layout">
      <!-- cell phone -->
      <div>
        <label class="block mb-2">Celular</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-mobile"></i>
          </InputGroupAddon>
          <InputText v-bind="phoneAttrs" v-model="phone" :invalid="Boolean(errors.phone)" type="tel" placeholder="Celular" />
        </InputGroup>

        <Message v-if="errors.phone" severity="error" size="small" variant="simple">
          {{ errors.phone }}
        </Message>
      </div>

      <div>
        <!-- address -->
        <label class="block mb-2">Dirección</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-home"></i>
          </InputGroupAddon>
          <InputText v-bind="addressAttrs" v-model="address" :invalid="Boolean(errors.address)" type="text" placeholder="Dirección" />
        </InputGroup>

        <Message v-if="errors.address" severity="error" size="small" variant="simple">
          {{ errors.address }}
        </Message>
      </div>

      <div>
        <!--for headquarte-->
        <label class="block mb-2">Sede</label>
        <Select
          class="w-full"
          v-bind="headquarterIdAttrs"
          v-model="headquarterId"
          :invalid="Boolean(errors.headquarterId)"
          :options="headquarkers"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Sede"
        />

        <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
          {{ errors.headquarterId }}
        </Message>
      </div>

      <!-- dir image -->

      <div>
        <label class="block mb-2">Imagen</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText v-bind="dirImageAttrs" v-model="dirImage" :invalid="Boolean(errors.dirImage)" type="text" placeholder="Imagen" />
        </InputGroup>

        <Message v-if="errors.dirImage" severity="error" size="small" variant="simple">
          {{ errors.dirImage }}
        </Message>
      </div>

      <!-- button -->
      <div class="button-form-container-grid-end">
        <Button
          label="Editar"
          type="submit"
          severity="success"
          icon="pi pi-save"
          iconPos="right"
          class="w-full max-w-md"
        />
      </div>
    </form>
  </div>
</template>
