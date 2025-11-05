<script lang="ts" setup>
import Card from 'primevue/card'
import Message from 'primevue/message'
import CardPetSecondary from '@/components/CardPetSecondary.vue'
import Button from 'primevue/button'
import { useDialog } from 'primevue'
import AddMyPetCard from './components/AddMyPetCard.vue'
import { useSpecie } from '@/composables/useSpecie'
import { useBreed } from '@/composables/useBreed'
import type { Specie } from '@/models/Specie'
import type { OptionSelect } from '@/models/OptionSelect'
import type { Breed } from '@/models/Breed'
import type { FormValues as AddMyPetSchema } from '@/validation-schemas-forms/schema-add-pet-client'
import { usePet } from '@/composables/usePet'
import { onMounted, ref } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication'
import type { PetByClient } from '@/models/PetByClient'

//methods
const { getAllSpecies } = useSpecie()

const { getAllBreeds } = useBreed()

const { getEntityId } = useAuthentication()

const { error, loading, getPetByClientId, createPetClient } = usePet()

//for species to options Select

const speciesToOptionsSelect = (species: Specie[]): OptionSelect[] => {
  return species.map((specie) => ({
    value: specie.id,
    name: specie.name,
  }))
}

// for breeds to optionSelect

const breedsToOptionsSelect = (breeds: Breed[]): OptionSelect[] => {
  return breeds.map((breed) => ({
    value: breed.id,
    name: breed.name,
  }))
}

//example for pets
const pets = ref<PetByClient[]>([])

onMounted(() => {
  loadPets()
})

const loadPets = async () => {
  const clientId = getEntityId()
  if (clientId) {
    pets.value = await getPetByClientId(clientId)
  }
}

//for dialog
const dialog = useDialog()

//for add
const addPet = async () => {
  dialog.open(AddMyPetCard, {
    props: {
      modal: true,
      header:'Agregue a su mascota'
    },
    data: {
      speciesOptions: speciesToOptionsSelect(await getAllSpecies()),
      breedsOptions: breedsToOptionsSelect(await getAllBreeds()),
    },
    onClose: async (options) => {
      const data = options?.data as AddMyPetSchema
      const clientId = getEntityId()
      if (data && clientId) {
        const pet = await createPetClient(data, clientId)
        console.log('Mascota creada exitosamente', pet)
      }
    },
  })
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <div class="w-full flex items-center justify-between">
          <h3 class="h3">Mis mascotas</h3>
          <Button
            severity="success"
            label="Agregar mascota"
            icon="pi pi-plus-circle"
            iconPos="right"
            @click="addPet()"
          />
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-6 mt-2">
          <!-- for messague loading  -->
          <Message v-if="loading.getPetByClientId" severity="warn" size="small" variant="simple">
            Cargando ...
          </Message>
          <!-- for messague error -->
          <Message v-if="error.getPetByClientId" severity="error" size="small" variant="simple">
            Error al cargar tus mascotas
          </Message>
          <RouterLink v-for="pet in pets" :key="pet.id" :to="`/client/my-pets/${pet.id}`">
            <CardPetSecondary v-ripple
              :id="pet.id"
              :image-url="pet.urlImage"
              :name="pet.name"
              description=" "
              :specie="pet.breedName"
              :breed="pet.breedName"
              :gender="pet.gender"
              :weight="pet.weight"
              :birthdate="pet.birthdate.toString()"
            ></CardPetSecondary>
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>
