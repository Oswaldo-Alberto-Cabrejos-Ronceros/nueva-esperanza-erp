<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { onMounted, ref } from 'vue'
import type { Pet } from '@/models/Pet'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { useDialog } from 'primevue'
import type { FormValues as AddEditPetSchema } from '@/validation-schemas-forms/schema-add-edit-pet'
import AddEditPetCard from '@/views/Employee/PetsManagementPage/components/AddEditPetCard.vue'

const props = defineProps<{
  id: string
}>()

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
  },
  {
    title: 'Dueño',
    key: 'clientId',
    icon: 'pi-id-card',
  },
]

const petData = ref<Pet | null>(null)

onMounted(() => {
  petData.value = {
    id: 1,
    name: 'Nico',
    gender: 'M',
    weight: 8.2,
    birthdate: '2015-05-21',
    comment: 'Juguetón y energético.',
    urlImage: 'https://placekitten.com/308/228',
    specie: {
      id: 1,
      name: 'Gato',
    },
    breed: {
      id: 1,
      name: 'Persa',
    },
    clientId: 2,
  }
  console.log(props.id)
})

//for dialog
const dialog = useDialog()

const editPet = (petData: Pet) => {
  dialog.open(AddEditPetCard, {
    props: {
      modal: true,
    },
    data: {
      petData: {
        name:petData.name,
        gender:petData.gender,
        weight:petData.weight,
        birthdate:new Date(petData.birthdate),
        comment:petData.comment,
        specieId:petData.specie.id,
        breedId:petData.breed.id,
        urlImage:petData.urlImage,
        ownerDni:String(petData.clientId)
      } as AddEditPetSchema,
    },
  })
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">{{ petData?.name }}</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <div class="form-search-grid-col-5" v-if="petData">
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
            <div class="form-button-search-container-grid-col-5">
              <!-- button -->

              <Button
                label="Editar"
                type="submit"
                severity="info"
                icon="pi pi-pencil"
                iconPos="right"
                class="w-full"
                @click="editPet(petData)"
              />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
