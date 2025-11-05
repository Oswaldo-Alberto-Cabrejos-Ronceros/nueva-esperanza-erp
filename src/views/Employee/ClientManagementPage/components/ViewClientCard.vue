<script setup lang="ts">
import { ref, onMounted,inject } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import type { Ref } from 'vue'
import type { Client } from '@/models/Client'



//props for working with dynamicdialog
const dialogRef = inject('dialogRef') as Ref<{
  data: {
    clientData:Client
  }
}>


const clientData=ref<Client|null>(null)
const firstName=ref<string>('')
  const firstLastName=ref<string>('')




onMounted(() => {
 clientData.value= dialogRef.value.data.clientData
 firstName.value = clientData.value.names.split(' ')[0]
 firstLastName.value = clientData.value.lastnames.split(' ')[0]
})

//for elements to see

const elements: { title: string; key: keyof Client; icon: string }[] = [
  {
    title: 'Dni',
    key: 'dni',
    icon: 'pi-id-card',
  },
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
    icon: 'pi-mobile',
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
</script>

<template>
  <div class="card-dialog-form-layout" v-if="clientData">

      <div class="flex-1 space-y-6">
        <div class="form-dialog-layout">
          <div v-for="(element, id) in elements" :key="id">
            <label class="block mb-2">{{ element.title }}</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi ${element.icon}`"></i>
              </InputGroupAddon>
              <InputText :value="clientData[element.key]" disabled class="w-full" />
            </InputGroup>
          </div>

          <!-- email -->
                    <div >
            <label class="block mb-2">Email</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi pi-envelope`"></i>
              </InputGroupAddon>
              <InputText :value="clientData.user?.email" disabled class="w-full" />
            </InputGroup>
          </div>
          <!-- headquarter -->
                    <div >
            <label class="block mb-2">Sede</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi pi-home`"></i>
              </InputGroupAddon>
              <InputText :value="clientData.headquarter.name" disabled class="w-full" />
            </InputGroup>
          </div>
        </div>
      </div>
  </div>
</template>
