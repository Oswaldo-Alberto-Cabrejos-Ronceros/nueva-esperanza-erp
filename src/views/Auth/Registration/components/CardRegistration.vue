<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import { toTypedSchema } from '@vee-validate/yup'
import { schema } from '@/validation-schemas-forms/schema-register'
import type { FormValues } from '@/validation-schemas-forms/schema-register'
import { useForm } from 'vee-validate'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Image from 'primevue/image'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useThemeStore } from '@/stores/themeStore'
import { computed } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import type { OptionSelect } from '@/models/OptionSelect'

defineProps<{
  loading?: boolean
  headquartersOptions: OptionSelect[]
}>()

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    dni: '',
    names: '',
    lastnames: '',
    email: '',
    address: '',
    phone: '',
    birthdate: undefined,
    headquarter: undefined,
    password: '',
    confirmPassword: '',
    term: false,
  },
})

// binding

const [dni, dniAttrs] = defineField('dni')
const [names, namesAttrs] = defineField('names')
const [lastnames, lastnamesAttrs] = defineField('lastnames')
const [email, emailAttrs] = defineField('email')
const [address, addressAttrs] = defineField('address')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [headquarter, headquarterAttrs] = defineField('headquarter')
const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [term, termAttrs] = defineField('term')

//for emit register
const emit = defineEmits(['register'])

//for send
const onSubmit = handleSubmit((values) => {
  emit('register', values)
})

//for theme

const storeTheme = useThemeStore()
const imageLogo = computed(() => (storeTheme.isDark ? LogoWhite : LogoRose))
</script>

<template>
  <Card
    class="h-auto w-[90vw] max-w-3xl flex flex-col items-center justify-center dark:bg-surface-800"
  >
    <template #header>
      <Image :src="imageLogo" alt="Logo" width="110" />
    </template>
    <template #title><h3 class="h1 text-primary text-center font-bold">Registro</h3></template>
    <template #subtitle>
      <p class="text-neutral-500 text-center">Crea tu cuenta para acceder al portal del cliente</p>
    </template>
    <template #content>
      <div v-if="loading" class="min-h-96 w-full flex items-center justify-center">
        <ProgressSpinner />
      </div>

      <form
        v-if="!loading"
        @submit.prevent="onSubmit"
        class="flex flex-col gap-1.5 w-[83vw] md:w-[85vw] max-w-2xl text-neutral-950 dark:text-surface-0"
      >
        <!-- DNI -->
        <label>DNI</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText v-bind="dniAttrs" v-model="dni" :invalid="Boolean(errors.dni)" type="text" placeholder="Ej: 74512351" />
        </InputGroup>

        <Message v-if="errors.dni" severity="error" size="small" variant="simple">
          {{ errors.dni }}
        </Message>
        <div class="w-full grid grid-cols-2 gap-4">
          <!-- names -->
          <div>
            <label>Nombres</label>

            <InputGroup class="my-1">
              <InputGroupAddon class="text-neutral-400">
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText
                v-bind="namesAttrs"
                v-model="names"
                :invalid="Boolean(errors.names)"
                type="text"
                placeholder="Escribe tus nombres"
              />
            </InputGroup>

            <Message v-if="errors.names" severity="error" size="small" variant="simple">
              {{ errors.names }}
            </Message>
          </div>

          <div>
            <!-- last names -->
            <label>Apellidos</label>

            <InputGroup class="my-1">
              <InputGroupAddon class="text-neutral-400">
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText
                v-bind="lastnamesAttrs"
                v-model="lastnames"
                :invalid="Boolean(errors.lastnames)"
                type="text"
                placeholder="Escribe tus apellidos"
              />
            </InputGroup>

            <Message v-if="errors.lastnames" severity="error" size="small" variant="simple">
              {{ errors.lastnames }}
            </Message>
          </div>
        </div>

        <!-- email -->
        <label>Email</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText
            v-bind="emailAttrs"
            v-model="email"
            :invalid="Boolean(errors.email)"
            type="text"
            placeholder="Ej: example@gmail.com"
          />
        </InputGroup>

        <Message v-if="errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>

        <div class="w-full grid grid-cols-2 gap-4">
          <!-- cell phone -->
          <div>
            <label>Celular</label>

            <InputGroup class="my-1">
              <InputGroupAddon class="text-neutral-400">
                <i class="pi pi-mobile"></i>
              </InputGroupAddon>
              <InputText
                v-bind="phoneAttrs"
                v-model="phone"
                :invalid="Boolean(errors.phone)"
                type="tel"
                placeholder="Ej: 945215562"
              />
            </InputGroup>

            <Message v-if="errors.phone" severity="error" size="small" variant="simple">
              {{ errors.phone }}
            </Message>
          </div>

          <!-- birthDate -->
          <div>
            <label>Fecha Nacimiento</label>

            <DatePicker
              class="my-1"
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
        </div>
        <!-- address -->
        <label>Dirección</label>

        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-home"></i>
          </InputGroupAddon>
          <InputText
            v-bind="addressAttrs"
            v-model="address"
            :invalid="Boolean(errors.address)"
            type="text"
            placeholder="Ej: Av. Ejemplo N°"
          />
        </InputGroup>

        <Message v-if="errors.address" severity="error" size="small" variant="simple">
          {{ errors.address }}
        </Message>

        <!--headquarker-->
        <label>Sede</label>
        <Select
          v-bind="headquarterAttrs"
          v-model="headquarter"
          :options="headquartersOptions"
          :invalid="Boolean(errors.headquarter)"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona sede"
        />

        <Message v-if="errors.headquarter" severity="error" size="small" variant="simple">
          {{ errors.headquarter }}
        </Message>

        <div class="w-full grid grid-cols-2 gap-4">
          <!-- password -->
          <div>
            <label>Contraseña</label>
            <InputGroup class="my-1">
              <InputGroupAddon class="text-neutral-400">
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <Password
                v-bind="passwordAttrs"
                v-model="password"
                :invalid="Boolean(errors.password)"
                toggleMask
                placeholder="Mínimo 6 caracteres"
              />
            </InputGroup>
            <Message v-if="errors.password" severity="error" size="small" variant="simple">
              {{ errors.password }}
            </Message>
          </div>
          <!-- confirm password -->
          <div>
            <label>Confirmar Contraseña</label>

            <InputGroup class="my-1">
              <InputGroupAddon class="text-neutral-400">
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <Password
                v-bind="confirmPasswordAttrs"
                v-model="confirmPassword"
                :invalid="Boolean(errors.confirmPassword)"
                :feedback="false"
                toggleMask
                placeholder="Repite tu contraseña"
              />
            </InputGroup>

            <Message v-if="errors.confirmPassword" severity="error" size="small" variant="simple">
              {{ errors.confirmPassword }}
            </Message>
          </div>
        </div>

        <!-- terms -->
        <div class="col-span-2 flex items-center gap-2">
          <Checkbox v-bind="termAttrs" v-model="term" :invalid="Boolean(errors.term)" binary inputId="term" />
          <label for="term">Acepto los términos y condiciones</label>
        </div>
        <Message v-if="errors.term" severity="error" size="small" variant="simple">
          {{ errors.term }}
        </Message>
        <!-- button -->

        <Button class="mt-2" label="Crear cuenta" type="submit" icon="pi pi-user-plus" iconPos="left" />
        <div class="flex w-full items-center justify-center gap-2">
          <p>¿Ya tienes cuenta?</p>
          <router-link
            class="transition-colors duration-150 hover:text-red-500 dark:hover:text-red-400"
            to="/auth/login"
            >Inicia Sesión
          </router-link>
        </div>
      </form>
    </template>
  </Card>
</template>
