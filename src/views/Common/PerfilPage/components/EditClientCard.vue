<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-edit-self-client'
import type { FormValues } from '@/validation-schemas-forms//schema-edit-self-client'
import { useForm } from 'vee-validate'
import Button from 'primevue/button'
import { inject, onMounted, ref } from 'vue'
import type { EditSelfClient } from '@/models/EditSelfClient'
import { toTypedSchema } from '@vee-validate/yup'
import type { Ref } from 'vue'
import type { OptionSelect } from '@/models/OptionSelect'

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    phone: '',
    address: '',
    headquarterId: undefined,
  },
})

//headquarter options
const headquartersOptions = ref<OptionSelect[]>([])


const [address, addressAttrs] = defineField('address')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [phone, phoneAttrs] = defineField('phone')

const onSubmit = handleSubmit((values) => {
  dialogRef.value.close(values as EditSelfClient)
})

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: EditSelfClient) => void
  data: { clientSelfData?: EditSelfClient; headquartersOptions?: OptionSelect[] }
}>

onMounted(() => {
  const params = dialogRef.value.data.clientSelfData
  if (params) {
    address.value = params.address
    headquarterId.value = params.headquarterId
    phone.value = params.phone
  }
  const headquartersOptionsGet = dialogRef.value.data.headquartersOptions
      if (headquartersOptionsGet) {
      headquartersOptions.value = headquartersOptionsGet
    }
})

//emit for edit
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
        <!-- address -->
        <div>
          <label class="block mb-2">Dirección</label>

          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-home"></i>
            </InputGroupAddon>
            <InputText
              v-bind="addressAttrs"
              v-model="address"
              :invalid="Boolean(errors.address)"
              type="text"
              placeholder="Dirección"
            />
          </InputGroup>

          <Message v-if="errors.address" severity="error" size="small" variant="simple">
            {{ errors.address }}
          </Message>
        </div>
        <!--for headquarte-->
        <div>
          <label class="block mb-2">Sede</label>
          <Select
            v-bind="headquarterIdAttrs"
            v-model="headquarterId"
            :invalid="Boolean(errors.headquarterId)"
            :options="headquartersOptions"
            optionLabel="name"
            optionValue="value"
            placeholder="Selecciona Sede"
            class="w-full"
          />

          <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
            {{ errors.headquarterId }}
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
