<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Password from 'primevue/password'
import Image from 'primevue/image'
import LogoRose from '@/assets/images/logos/logo-rose.png'
import LogoWhite from '@/assets/images/logos/logo-white.png'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { schema } from '@/validation-schemas-forms/schema-login'
import type { FormValues } from '@/validation-schemas-forms/schema-login'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { useThemeStore } from '@/stores/themeStore'
import { computed, ref } from 'vue'
import { SelectButton } from 'primevue'
import ProgressSpinner from 'primevue/progressspinner'

//props

defineProps<{
  loading?: boolean
}>()

// Setup del formulario con tipado
const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    email: '',
    password: '',
    type: 'Cliente',
  },
})

// Campos individuales con binding
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [type, typeAttrs] = defineField('type')

//for theme
const storeTheme = useThemeStore()
const imageLogo = computed(() => (storeTheme.isDark ? LogoWhite : LogoRose))

//options for selectButton
const options = ref(['Cliente', 'Empleado'])

//define emit
const emit = defineEmits(['login'])
// Al enviar
const onSubmit = handleSubmit((values) => {
  emit('login', {
    loginRequest: {
      email: values.email,
      password: values.password,
    },
    isEmployee: type.value === 'Cliente' ? false : true,
  })
})
</script>

<template>
  <Card
    class="w-[90%] sm:w-xl flex flex-col items-center justify-center text-neutral-950 dark:text-surface-0 dark:bg-surface-800"
  >
    <template #header>
      <Image :src="imageLogo" alt="Logo" width="220" />
    </template>

    <template #title>
      <h3 class="h3 text-center">Iniciar Sesión</h3>
    </template>

    <template #content>
      <div v-if="loading" class="min-h-96 w-full flex items-center justify-center">
        <ProgressSpinner />
      </div>
      <form
        v-if="!loading"
        @submit.prevent="onSubmit"
        class="flex flex-col gap-4 w-full max-w-lg xs:min-w-96 sm:min-w-md"
      >
        <div class="w-full flex flex-col gap-1 items-center justify-center">
          <SelectButton
            :allowEmpty="false"
            v-bind="typeAttrs"
            v-model="type"
            :invalid="Boolean(errors.type)"
            :options="options"
          />
          <Message v-if="errors.type" severity="error" size="small" variant="simple">
            {{ errors.type }}
          </Message>
        </div>
        <!-- email -->
        <label>Email</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            v-bind="emailAttrs"
            v-model="email"
            :invalid="Boolean(errors.email)"
            type="email"
            placeholder="Email"
          />
        </InputGroup>
        <Message v-if="errors.email" severity="error" size="small" variant="simple">
          {{ errors.email }}
        </Message>

        <!-- password -->
        <label>Contraseña</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password
            v-bind="passwordAttrs"
            v-model="password"
            :invalid="Boolean(errors.password)"
            toggleMask
            :feedback="false"
            placeholder="Contraseña"
          />
        </InputGroup>
        <Message v-if="errors.password" severity="error" size="small" variant="simple">
          {{ errors.password }}
        </Message>

        <!-- button -->
        <Button label="Ingresar" type="submit" icon="pi pi-sign-in" iconPos="right" class="mt-4" />
        <div class="flex w-full items-center justify-center gap-2">
          <p>¿No tienes cuenta?</p>
          <router-link
            class="transition-colors duration-150 hover:text-red-500 dark:hover:text-red-400"
            to="/auth/registration"
            >Registrate</router-link
          >
        </div>
      </form>
    </template>
  </Card>
</template>

<style scoped>
::v-deep(.p-togglebutton.p-togglebutton-checked) {
  background-color: var(--p-primary-color) !important;
  color: white;
}
</style>
