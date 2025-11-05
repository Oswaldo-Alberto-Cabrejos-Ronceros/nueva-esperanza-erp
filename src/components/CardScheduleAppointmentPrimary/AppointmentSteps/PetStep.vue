<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import CardPetPrimary from '@/components/CardPetPrimary.vue'
import type { PetByClient } from '@/models/PetByClient'
import { ref } from 'vue'
defineProps<{
  pets: PetByClient[]
}>()

//pet selected
const petSelected = ref<PetByClient | null>(null)
//function for select pet
const selectPet = (pet: PetByClient) => {
  console.log(petSelected)
  petSelected.value = pet
}
//for emit
const emit = defineEmits(['select-pet'])
const emitSelectPet = () => {
  if (petSelected.value) {
    emit('select-pet', petSelected.value)
  }
}
</script>

<template>
  <!-- for pet -->
  <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="1">
    <div class="min-h-48">
      <p>Escoga la mascota</p>
      <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
        <CardPetPrimary v-ripple
          v-for="pet in pets"
          @click="selectPet(pet)"
          :key="pet.id"
          :petId="pet.id"
          :petImageUrl="pet.urlImage"
          :petName="pet.name"
          :petSpecie="pet.specieName"
          :petBreed="pet.breedName"
          :petGender="pet.gender"
          :birthdate="pet.birthdate"
          :selected="petSelected?.id==pet.id"
        ></CardPetPrimary>
      </div>
    </div>
    <div class="flex justify-end">
      <Button
        :disabled="petSelected===null"
        label="Siguiente"
        icon="pi pi-arrow-right"
        icon-pos="right"
        @click="
          () => {
            emitSelectPet()
            activateCallback('2')
          }
        "
      />
    </div>
  </StepPanel>
</template>
