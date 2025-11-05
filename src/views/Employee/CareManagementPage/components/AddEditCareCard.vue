<script lang="ts" setup>
import { inject, onMounted, ref, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { schema } from '@/validation-schemas-forms/schema-add-care'
import type { FormValues } from '@/validation-schemas-forms/schema-add-care'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { OptionSelect } from '@/models/OptionSelect'
import type { PetByClient } from '@/models/PetByClient'
import type { BasicServiceForAppointment } from '@/models/BasicServiceForAppointment'
import { useClient } from '@/composables/useClient'
import { useAuthentication } from '@/composables/useAuthentication'
import { usePet } from '@/composables/usePet'
import { useEmployee } from '@/composables/useEmployee'
import { useAppointment } from '@/composables/useAppointment'
import { useHeadquarterVetService } from '@/composables/useHeadquarterVetService'
import type { EmployeeBasicInfo } from '@/models/EmployeeBasicInfo'
import InputMask from 'primevue/inputmask'
//for methods
const { getEntityId } = useAuthentication()

const { getClientByDni } = useClient()

const { getPetByClientId } = usePet()

const { getEmployeeById } = useEmployee()

const { getServicesByHeadquarterAndSpecies } = useAppointment()

const { listVeterinariansByHeadVetService } = useHeadquarterVetService()

const { handleSubmit, errors, defineField, resetForm } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    headquarterVetServiceId: undefined,
    ownerDni: undefined,
    ownerId: undefined,
    ownerName: '',
    petId: undefined,
    employeeId: undefined,
    paymentMethodId: undefined,
  },
})

//field
const [headquarterVetServiceId, headquarterVetServiceIdAttrs] =
  defineField('headquarterVetServiceId')
const [ownerDni, ownerDniAttrs] = defineField('ownerDni')

const [ownerId, ownerIdAttrs] = defineField('ownerId')
const [ownerName, ownerNameAttrs] = defineField('ownerName')
const [petId, petIdAttrs] = defineField('petId')
const [employeeId, employeeIdAttrs] = defineField('employeeId')
const [paymentMethodId, paymentMethodIdAttrs] = defineField('paymentMethodId')

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    paymentMethodsOptions?: OptionSelect[]
  }
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//refs
const paymentMethodsOptions = ref<OptionSelect[]>([])
const petsOptions = ref<OptionSelect[]>([])
const petsClient = ref<PetByClient[]>([])
const serviceHeadquarterOptions = ref<OptionSelect[]>([])
const headquarterId = ref<number | null>(null)
const employeesOptions = ref<OptionSelect[]>([])

//for search client

const searchClient = async () => {
  if (ownerDni.value && ownerDni.value.length === 8) {
    try {
      const getOwner = await getClientByDni(ownerDni.value)
      resetForm({
        values: {
          headquarterVetServiceId: undefined,
          ownerDni: ownerDni.value,
          ownerId: getOwner.id,
          ownerName: getOwner.fullName,
          petId: undefined,
          employeeId: undefined,
        },
      })
      const petsGet = await getPetByClientId(ownerId.value)
      petsOptions.value = petToOptionsSelect(petsGet)
      petsClient.value = petsGet
    } catch (e) {
      console.error('Error al obtener el nombre del dueño', e)
      cleanFormClientIdChange()
      petsOptions.value = []
      petsClient.value = []
    }
    serviceHeadquarterOptions.value = []
    employeesOptions.value = []
  }
}

//for clean when change clientid

const cleanFormClientIdChange = () => {
  resetForm({
    values: {
      headquarterVetServiceId: undefined,
      ownerDni: ownerDni.value,
      ownerId: undefined,
      ownerName: '',
      petId: undefined,
      employeeId: undefined,
    },
  })
}

//for load avaibles employees

const loadAvaiblesEmployees = async () => {
  employeesOptions.value = employeeToOptionsSelect(
    await listVeterinariansByHeadVetService(headquarterVetServiceId.value),
  )
}

//for obtain headquarters Service

const loadHeadquartersService = async () => {
  if (headquarterId.value) {
    //get pet client
    const petClient = petsClient.value.find((pet) => pet.id === petId.value)
    if (petClient) {
      serviceHeadquarterOptions.value = serviceHeadquartersToOptionsSelect(
        await getServicesByHeadquarterAndSpecies(headquarterId.value, petClient.specieId),
      )
    }
  }
}
//for obtain options from pet
const petToOptionsSelect = (items: PetByClient[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}
//for obtain options from serviceHeadquarter
const serviceHeadquartersToOptionsSelect = (
  items: BasicServiceForAppointment[],
): OptionSelect[] => {
  return items.map((item) => ({
    value: item.headquarterServiceId,
    name: item.name,
  }))
}
//for obtain options from pet
const employeeToOptionsSelect = (items: EmployeeBasicInfo[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.fullName,
  }))
}

//for change pet

const changePet = () => {
  loadHeadquartersService()
  headquarterVetServiceId.value = 0
  loadAvaiblesEmployees()
  employeeId.value = 0
  employeesOptions.value = []
}

const changeSevice = () => {
  loadAvaiblesEmployees()
  employeeId.value = 0
}

onMounted(async () => {
  const employeeId = getEntityId()
  if (employeeId) {
    headquarterId.value = (await getEmployeeById(employeeId)).headquarter.headquarterId
  }
  if (dialogRef.value.data) {
    const paymentMethodsOptionsGet = dialogRef.value.data.paymentMethodsOptions
    if (paymentMethodsOptionsGet) paymentMethodsOptions.value = paymentMethodsOptionsGet
  }
})
</script>

<template>
  <div class="card-dialog-form-layout">
    <form @submit.prevent="onSubmit" class="form-dialog-layout">
      <!-- owner dni -->
      <div>
        <label class="block mb-2">DNI del dueño</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputMask
            id="basic"
            :invalid="Boolean(errors.ownerDni)"
            fluid
            v-bind="ownerDniAttrs"
            v-model="ownerDni"
            mask="99999999"
            placeholder="74852321"
          />
          <InputGroupAddon>
            <Button
              icon="pi pi-search"
              severity="secondary"
              variant="text"
              @click="searchClient()"
            />
          </InputGroupAddon>
        </InputGroup>

        <Message v-if="errors.ownerDni" severity="error" size="small" variant="simple">
          {{ errors.ownerDni }}
        </Message>
      </div>
      <!-- owner name -->
      <div>
        <label class="block mb-2">Nombre del dueño</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            v-model="ownerName"
            v-bind="ownerNameAttrs"
            :invalid="Boolean(errors.ownerName)"
            class="w-full"
            placeholder="Nombre del dueño"
            disabled
          />
        </InputGroup>

        <Message v-if="errors.ownerName" severity="error" size="small" variant="simple">
          {{ errors.ownerName }}
        </Message>
      </div>
      <!-- owner id -->
      <InputNumber
        @update:modelValue="cleanFormClientIdChange()"
        v-model="ownerId"
        v-bind="ownerIdAttrs"
        hidden
      />

      <div>
        <label class="block mb-2">Mascota</label>
        <Select
          class="w-full"
          v-bind="petIdAttrs"
          v-model="petId"
          :options="petsOptions"
          :invalid="Boolean(errors.petId)"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Mascota"
          @change="changePet()"
        />

        <Message v-if="errors.petId" severity="error" size="small" variant="simple">
          {{ errors.petId }}
        </Message>
      </div>

      <div>
        <label class="block mb-2">Servicio</label>
        <Select
          class="w-full"
          v-bind="headquarterVetServiceIdAttrs"
          v-model="headquarterVetServiceId"
          :options="serviceHeadquarterOptions"
          :invalid="Boolean(errors.headquarterVetServiceId)"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Servicio"
          @change="changeSevice()"
        />

        <Message
          v-if="errors.headquarterVetServiceId"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errors.headquarterVetServiceId }}
        </Message>
      </div>
      <div>
        <label class="block mb-2">Empleado</label>
        <Select
          class="w-full"
          v-bind="employeeIdAttrs"
          v-model="employeeId"
          :options="employeesOptions"
          :invalid="Boolean(errors.employeeId)"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Empleado"
        />

        <Message v-if="errors.employeeId" severity="error" size="small" variant="simple">
          {{ errors.employeeId }}
        </Message>
      </div>

      <div>
        <label class="block mb-2">Método de pago</label>
        <Select
          class="w-full"
          v-bind="paymentMethodIdAttrs"
          v-model="paymentMethodId"
          :invalid="Boolean(errors.paymentMethodId)"
          :options="paymentMethodsOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Método"
        />

        <Message v-if="errors.paymentMethodId" severity="error" size="small" variant="simple">
          {{ errors.paymentMethodId }}
        </Message>
      </div>

      <div class="button-form-container-grid-end">
        <Button
          class="w-full max-w-md"
          label="Registrar"
          type="submit"
          severity="success"
          icon="pi pi-save"
          iconPos="right"
        />
      </div>
    </form>
  </div>
</template>
