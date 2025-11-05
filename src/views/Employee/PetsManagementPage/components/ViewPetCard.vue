<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import type { Pet } from '@/models/Pet'
import Textarea from 'primevue/textarea'

//for props

const dialogRef = inject('dialogRef') as Ref<{
  data: {
    petData: Pet
  }
}>

const petData = ref<Pet | null>(null)

onMounted(() => {
  petData.value = dialogRef.value.data.petData
})

//for elements

const elements: { title: string; key: keyof Pet; icon: string }[] = [
  {
    title: 'Nombre',
    key: 'name',
    icon: 'pi-info',
  },
  {
    title: 'Sexo',
    key: 'gender',
    icon: 'pi-mars',
  },
  {
    title: 'Peso',
    key: 'weight',
    icon: 'pi-sort-alt',
  },
  {
    title: 'Nacimiento',
    key: 'birthdate',
    icon: 'pi-calendar',
  },
  {
    title: 'Imagen',
    key: 'urlImage',
    icon: 'pi-image',
  },
  {
    title: 'Especie',
    key: 'specie',
    icon: 'pi-info',
  },
  {
    title: 'Raza',
    key: 'breed',
    icon: 'pi-info',
  }
]
</script>

<template>
  <div class="card-dialog-form-layout" v-if="petData">
      <div class="flex-1 space-y-6">
        <div class="form-dialog-layout">
          <div v-for="(element, id) in elements" :key="id">
            <label class="block mb-2">{{ element.title }}</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi ${element.icon}`"></i>
              </InputGroupAddon>
              <InputText :value="petData[element.key]" disabled class="w-full" />
            </InputGroup>
          </div>
          <div>
            <label class="block mb-2">Comentario</label>
            <Textarea
              id="description"
              disabled
              :value="petData.comment"
              rows="5"
              class="resize-none w-full"
            />
          </div>


          <div >
            <label class="block mb-2">Dueño</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi pi-id-card`"></i>
              </InputGroupAddon>
              <InputText :value="petData.clientId" disabled class="w-full" />
            </InputGroup>
          </div>
        </div>
      </div>
  </div>
</template>
