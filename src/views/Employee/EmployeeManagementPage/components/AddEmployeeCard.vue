<script setup lang="ts">
import { schema } from '@/validation-schemas-forms/schema-add-employee'
import type { FormValues } from '@/validation-schemas-forms/schema-add-employee'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Password from 'primevue/password'
import Message from 'primevue/message'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import type { OptionSelect } from '@/models/OptionSelect'
import { useReniec } from '@/composables/useReniec'
import InputMask from 'primevue/inputmask'

//methods

const { loading, getInfoSimpleByReniec } = useReniec()

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    cmvp: '',
    names: '',
    lastnames: '',
    address: '',
    phone: '',
    dirImage: '',
    headquarterId: undefined,
    birthdate: undefined,
    roleId: undefined,
  },
})

//first field

const fieldMap = {
  names: defineField('names'),
  lastnames: defineField('lastnames'),
  address: defineField('address'),
  phone: defineField('phone'),
  dirImage: defineField('dirImage'),
}

//fields additionals
const [dni, dniAttrs] = defineField('dni')
const [cmvp, cmvpAttrs] = defineField('cmvp')
const [headquarterId, headquarterIdAttrs] = defineField('headquarterId')
const [phone, phoneAttrs] = defineField('phone')
const [dirImage, dirImageAttrs] = defineField('dirImage')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [roleId, roleIdAttrs] = defineField('roleId')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
//first elements

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
    placeholder: 'Nombres del empleado',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
    placeholder: 'Apellidos del empleado',
  },
  {
    title: 'Dirección',
    key: 'address',
    icon: 'pi-home',
    placeholder: 'Avenida, calle , número',
  },
]

//for submit

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values)
})

//headquarter options
const headquartersOptions = ref<OptionSelect[]>([])

//roles options
const rolesOptions = ref<OptionSelect[]>([])

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    headquartersOptions?: OptionSelect[]
    rolesOptions?: OptionSelect[]
  }
}>

onMounted(() => {
  if (dialogRef.value.data) {
    const headquartersOptionsGet = dialogRef.value.data.headquartersOptions
    const rolesOptionsGet = dialogRef.value.data.rolesOptions
    if (headquartersOptionsGet) {
      headquartersOptions.value = headquartersOptionsGet
    }
    if (rolesOptionsGet) {
      rolesOptions.value = rolesOptionsGet
    }
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

//for cmvp

const cmvpActive = (id: number): boolean => {
  const roleVeterinary = rolesOptions.value.find(
    (item) => item.name.toUpperCase() === 'VETERINARIO',
  )
  if (roleVeterinary && roleVeterinary.value === id) {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <div class="card-dialog-form-layout">
    <form @submit.prevent="onSubmit" class="form-dialog-layout">
      <!-- dni -->

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
              :loading="loading.getInfoSimpleByReniec"
            />
          </InputGroupAddon>
        </InputGroup>

        <Message v-if="errors.dni" severity="error" size="small" variant="simple">
          {{ errors.dni }}
        </Message>
      </div>

      <!-- rol -->

      <div>
        <label class="block mb-2">Rol</label>
        <Select
          class="w-full"
          v-bind="roleIdAttrs"
          v-model="roleId"
          :invalid="Boolean(errors.roleId)"
          :options="rolesOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Rol"
        />

        <Message v-if="errors.roleId" severity="error" size="small" variant="simple">
          {{ errors.roleId }}
        </Message>
      </div>

      <div v-if="!cmvpActive(roleId)">
        <label class="block mb-2">CMVP</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputMask
            v-model="cmvp"
            v-bind="cmvpAttrs"
            :invalid="Boolean(errors.cmvp)"
            type="text"
            :disabled="cmvpActive(roleId)"
            fluid
            mask="99999"
            placeholder="45123"
          />
        </InputGroup>

        <Message v-if="errors.cmvp" severity="error" size="small" variant="simple">
          {{ errors.cmvp }}
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
        <label class="block mb-2">Celular</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-mobile"></i>
          </InputGroupAddon>
          <InputMask
            :invalid="Boolean(errors.phone)"
            fluid
            v-bind="phoneAttrs"
            v-model="phone"
            mask="999999999"
            placeholder="984521485"
          />
        </InputGroup>

        <Message v-if="errors.phone" severity="error" size="small" variant="simple">
          {{ errors.phone }}
        </Message>
      </div>

      <div>
        <label class="block mb-2">Imagen</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i :class="`pi pi-image`"></i>
          </InputGroupAddon>
          <InputText
            v-model="dirImage"
            v-bind="dirImageAttrs"
            :invalid="Boolean(errors.dirImage)"
            class="w-full"
            :placeholder="`Imagen del empleado`"
          />
        </InputGroup>
        <Message v-if="errors.dirImage" severity="error" size="small" variant="simple">
          {{ errors.dirImage }}
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
          :invalid="Boolean(errors.headquarterId)"
          :options="headquartersOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Sede"
        />

        <Message v-if="errors.headquarterId" severity="error" size="small" variant="simple">
          {{ errors.headquarterId }}
        </Message>
      </div>
      <!-- button -->
      <div>
        <label class="block mb-2">Email</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText
            v-bind="emailAttrs"
            v-model="email"
            :invalid="Boolean(errors.email)"
            type="email"
            placeholder="example@gmail.com"
          />
        </InputGroup>

        <Message v-if="errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>
      </div>
      <!-- for password -->
      <div>
        <label class="block mb-2">Contraseña</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password
            v-bind="passwordAttrs"
            v-model="password"
            :invalid="Boolean(errors.confirmPassword)"
            placeholder="Contraseña"
          />
        </InputGroup>
        <Message v-if="errors.password" severity="error" size="small" variant="simple">
          {{ errors.password }}
        </Message>
      </div>

      <!-- for confirm password -->
      <div>
        <label class="block mb-2">Confirmar Contraseña</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password
            v-bind="confirmPasswordAttrs"
            v-model="confirmPassword"
            :invalid="Boolean(errors.confirmPassword)"
            toggleMask
            placeholder="Confirmar contraseña"
          />
        </InputGroup>

        <Message v-if="errors.confirmPassword" severity="error" size="small" variant="simple">
          {{ errors.confirmPassword }}
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
