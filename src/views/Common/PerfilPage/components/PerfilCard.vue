<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Image from 'primevue/image'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import type { MyInfoClient } from '@/models/MyInfoClient'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import { computed } from 'vue'

const props = defineProps<{
  userData: MyInfoClient | MyInfoEmployee
}>()

// Separar nombres y apellidos
const [firstName] = props.userData.names.split(' ')
const [firstLastName] = props.userData.lastnames.split(' ')

const elementsClient: { title: string; key: keyof MyInfoClient; icon: string }[] = [
  {
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
  },
  {
    title: 'Celular',
    key: 'phone',
    icon: 'pi-phone',
  },
]

const elementsEmployee: { title: string; key: keyof MyInfoEmployee; icon: string }[] = [
  {
    title: 'Nombres',
    key: 'names',
    icon: 'pi-user',
  },
  {
    title: 'Apellidos',
    key: 'lastnames',
    icon: 'pi-user',
  },
  {
    title: 'Dirección',
    key: 'address',
    icon: 'pi-home',
  },
  {
    title: 'Celular',
    key: 'phone',
    icon: 'pi-phone',
  },
  {
    title: 'Fecha Nacimiento',
    key: 'birthdate',
    icon: 'pi-calendar',
  },
]

//for check if userdata is client or employee
function isClient(user: MyInfoClient | MyInfoEmployee): user is MyInfoClient {
  return (user as MyInfoClient).clientId !== undefined
}
const clientData = computed(() => isClient(props.userData) ? props.userData : null)
const employeeData = computed(() => !isClient(props.userData) ? props.userData : null)

const profileImageDefault: string =
  'https://img.freepik.com/vector-gratis/circulo-azul-usuario-blanco_78370-4707.jpg?semt=ais_hybrid&w=740'
//emit
const emit = defineEmits(['edit:client', 'edit:employee'])

//for send emit edit user

const handleEditUserClient = () => {
    emit('edit:client')
}
</script>

<template>
  <Card
    class="h-min min-w-full flex text-neutral-950 dark:text-surface-0 dark:bg-surface-800 px-4 py-4"
  >
    <template #header>
      <div class="flex gap-4 items-center w-full">
        <h3 class="h3 font-medium">Mi Perfil</h3>
        <p v-if="employeeData" class="textLg text-gray-400">{{ employeeData.roles[0].name }}</p>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-6">
        <!-- images and ids -->
        <div class="flex flex-col xs:flex-row items-center gap-4 self-center">
          <div class="relative">
            <div class="relative w-48 h-48 flex rounded-full overflow-hidden">
              <Image
                :src="employeeData ? employeeData?.dirImage : profileImageDefault"
                alt="Profile photo"
                class="w-full h-full object-cover z-10"
                preview
              />
            </div>
            <Button
              v-if="employeeData"
              icon="pi pi-camera"
              rounded
              aria-label="Foto"
              class="absolute bottom-2 left-2 z-20"
            />
          </div>
          <div class="flex flex-col items-center mt-4">
            <h2 class="text-2xl font-bold">{{ firstName }} {{ firstLastName }}</h2>
            <div class="text-gray-600 mt-1">
              <p>DNI: {{ userData.dni }}</p>
              <p v-if="employeeData && employeeData.cmvp != null">CMVP: {{ employeeData.cmvp }}</p>
            </div>
          </div>
        </div>

        <!-- Formulario -->
        <div class="flex-1 space-y-6">
          <!-- for Client -->
          <div class="form-search-grid-col-5" v-if="clientData">
            <div v-for="(element, id) in elementsClient" :key="id">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText :value="clientData[element.key]" disabled class="w-full" />
              </InputGroup>
            </div>
            <!-- headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi pi-home`"></i>
                </InputGroupAddon>
                <InputText :value="clientData.headquarter.name" disabled class="w-full" />
              </InputGroup>
            </div>
          </div>
          <!-- for Employee -->
          <div class="form-search-grid-col-5" v-if="employeeData">
            <div v-for="(element, id) in elementsEmployee" :key="id">
              <label class="block mb-2">{{ element.title }}</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi ${element.icon}`"></i>
                </InputGroupAddon>
                <InputText :value="employeeData[element.key]" disabled class="w-full" />
              </InputGroup>
            </div>
            <!-- headquarter -->
            <div>
              <label class="block mb-2">Sede</label>
              <InputGroup>
                <InputGroupAddon class="text-neutral-400">
                  <i :class="`pi pi-home`"></i>
                </InputGroupAddon>
                <InputText :value="employeeData.headquarter.name" disabled class="w-full" />
              </InputGroup>
            </div>
          </div>
          <!-- Botón guardar/editar -->
          <div class="pt-4 flex justify-center">
            <Button
              class="w-full max-w-md"
              label="Editar"
              iconPos="right"
              icon="pi pi-pencil"
              v-if="clientData"
              @click="handleEditUserClient"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
