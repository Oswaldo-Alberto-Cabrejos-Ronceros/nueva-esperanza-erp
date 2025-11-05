<script lang="ts" setup>
import { inject, onMounted, ref, type Ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { schema } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import type { FormValues } from '@/validation-schemas-forms/schema-add-care-from-appointment'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { OptionSelect } from '@/models/OptionSelect'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import type { EmployeeBasicInfo } from '@/models/EmployeeBasicInfo'
//methods

const { listVeterinariansByHeadVetService } = useHeadquarterVetService()

//refs
const employeesOptions = ref<OptionSelect[]>([])

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    appointmentId: undefined,
    employeeId: undefined,
  },
})

//field
const [appointmentId, appointmentIdAttrs] = defineField('appointmentId')
const [employeeId, employeeIdAttrs] = defineField('employeeId')

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    appointmentId: number
    headquarterVetServiceId: number
  }
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//for obtain options from pet
const employeeToOptionsSelect = (items: EmployeeBasicInfo[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.fullName,
  }))
}

onMounted(async () => {
  //obtenemos el id de la cita
  if (dialogRef.value.data) {
    const appointmentIdGet = dialogRef.value.data.appointmentId
    const headquarterVetSerId = dialogRef.value.data.headquarterVetServiceId
    appointmentId.value = appointmentIdGet
    employeesOptions.value= employeeToOptionsSelect(await listVeterinariansByHeadVetService(headquarterVetSerId))
  }
})
</script>
<template>
  <div class="card-dialog-form-layout min-w-2xs">
    <form @submit.prevent="onSubmit" class="form-dialog-layout-flex-col w-full">
      <div class="w-full">
        <label class="block mb-2">Empleado</label>
        <Select
          class="w-full"
          v-bind="employeeIdAttrs"
          v-model="employeeId"
          :options="employeesOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Empleado"
        />

        <Message v-if="errors.employeeId" severity="error" size="small" variant="simple">
          {{ errors.employeeId }}
        </Message>
      </div>

      <InputNumber v-model="appointmentId" v-bind="appointmentIdAttrs" hidden />
      <Button
        class="w-full max-w-md"
        label="Registrar"
        type="submit"
        severity="success"
        icon="pi pi-save"
        iconPos="right"
      />
    </form>
  </div>
</template>
