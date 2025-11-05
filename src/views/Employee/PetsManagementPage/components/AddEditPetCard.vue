<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { schema } from '@/validation-schemas-forms/schema-add-edit-pet'
import type { FormValues } from '@/validation-schemas-forms/schema-add-edit-pet'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { OptionSelect } from '@/models/OptionSelect'
import { useClient } from '@/composables/useClient'
import type { Breed } from '@/models/Breed'
import { useBreed } from '@/composables/useBreed'
import InputMask from 'primevue/inputmask'

const { loading, getClientByDni } = useClient()
const { getBreedsBySpecie } = useBreed()

//form
const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    gender: '',
    weight: undefined,
    birthdate: undefined,
    comment: '',
    specieId: undefined,
    breedId: undefined,
    urlImage: '',
    ownerDni: '',
    ownerFullName: '',
    ownerId: undefined,
  },
})

//field

const [name, nameAttrs] = defineField('name')
const [gender, genderAttrs] = defineField('gender')
const [weight, weightAttrs] = defineField('weight')
const [birthdate, birthdateAttrs] = defineField('birthdate')
const [comment, commentAttrs] = defineField('comment')
const [specieId, specieIdAttrs] = defineField('specieId')
const [breedId, breedIdAttrs] = defineField('breedId')
const [urlImage, urlImageAttrs] = defineField('urlImage')
const [ownerDni, ownerDniAttrs] = defineField('ownerDni')
const [ownerFullName, ownerFullNameAttrs] = defineField('ownerFullName')
const [ownerId, ownerIdAttrs] = defineField('ownerId')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

//species options
const speciesOptions = ref<OptionSelect[]>([])

//breeds options
const breedsOptions = ref<OptionSelect[]>([])

//for dynamicDialog
const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    petData?: FormValues
    speciesOptions?: OptionSelect[]
  }
}>

//genders
const genders = [
  { name: 'Macho', value: 'M' },
  { name: 'Hembra', value: 'H' },
]

const title = ref<string>('Agregar')

//for search client

const searchClient = async () => {
  if (ownerDni.value.length === 8) {
    try {
      const getOwner = await getClientByDni(ownerDni.value)

      ownerFullName.value = getOwner.fullName
      ownerId.value = getOwner.id
    } catch (e) {
      console.error('Error al obtener el nombre del dueño', e)
      ownerFullName.value = ''
      ownerId.value = 0
    }
  }
}
const loadsBreed = async () => {
  if (specieId.value) {
    breedsOptions.value = breedsToOptionsSelect(await getBreedsBySpecie(specieId.value))
  }
}

const breedsToOptionsSelect = (breeds: Breed[]): OptionSelect[] => {
  return breeds.map((breed) => ({
    value: breed.id,
    name: breed.name,
  }))
}

onMounted(() => {
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.petData
    const speciesOptionsGet = dialogRef.value.data.speciesOptions
    loadsBreed()
    //set data if edit
    if (params) {
      title.value = 'Editar'
      name.value = params.name
      gender.value = params.gender
      weight.value = params.weight
      birthdate.value = params.birthdate
      comment.value = params.comment
      specieId.value = params.specieId
      breedId.value = params.breedId
      urlImage.value = params.urlImage
      ownerDni.value = params.ownerDni
      ownerId.value = params.ownerId
      ownerFullName.value = params.ownerFullName
    }
    if (speciesOptionsGet) speciesOptions.value = speciesOptionsGet
    loadsBreed()
  }
})
</script>

<template>
  <div class="card-dialog-form-layout">
    <form @submit.prevent="onSubmit" class="form-dialog-layout">
      <!-- owner dni -->
      <div>
        <label class="block mb-2">Dni del dueño</label>
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
              :loading="loading.getClientByDni"
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
            v-model="ownerFullName"
            v-bind="ownerFullNameAttrs"
            :invalid="Boolean(errors.ownerFullName)"
            class="w-full"
            placeholder="Nombre del dueño"
            disabled
          />
        </InputGroup>

        <Message v-if="errors.ownerFullName" severity="error" size="small" variant="simple">
          {{ errors.ownerFullName }}
        </Message>
      </div>

      <InputNumber v-model="ownerId" v-bind="ownerIdAttrs" hidden />
      <!-- name -->
      <div>
        <label class="block mb-2">Nombre</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-info"></i>
          </InputGroupAddon>
          <InputText
            v-model="name"
            v-bind="nameAttrs"
            :invalid="Boolean(errors.name)"
            class="w-full"
            placeholder="Nombre de la mascota"
          />
        </InputGroup>
        <Message v-if="errors.name" severity="error" size="small" variant="simple">
          {{ errors.name }}
        </Message>
      </div>
      <!-- gender -->
      <div>
        <label class="block mb-2">Sexo</label>
        <Select
          class="w-full"
          v-bind="genderAttrs"
          v-model="gender"
          :invalid="Boolean(errors.gender)"
          :options="genders"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Sexo"
        />

        <Message v-if="errors.gender" severity="error" size="small" variant="simple">
          {{ errors.gender }}
        </Message>
      </div>
      <!-- weight -->
      <div>
        <label class="block mb-2">Peso</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-info"></i>
          </InputGroupAddon>
          <InputNumber
            v-model="weight"
            v-bind="weightAttrs"
            :invalid="Boolean(errors.weight)"
            fluid
            class="w-full"
            placeholder="Peso"
            :minFractionDigits="0" :maxFractionDigits="2"
            suffix=" Kg"
          />
        </InputGroup>
        <Message v-if="errors.weight" severity="error" size="small" variant="simple">
          {{ errors.weight }}
        </Message>
      </div>

      <!-- birthdate -->
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

      <!-- comment -->

      <div>
        <label class="block mb-2">Especie</label>
        <Select
          class="w-full"
          v-bind="specieIdAttrs"
          v-model="specieId"
          :invalid="Boolean(errors.specieId)"
          :options="speciesOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Especie"
          @update:modelValue="loadsBreed()"
        />

        <Message v-if="errors.specieId" severity="error" size="small" variant="simple">
          {{ errors.specieId }}
        </Message>
      </div>

      <div>
        <label class="block mb-2">Raza</label>
        <Select
          class="w-full"
          v-bind="breedIdAttrs"
          v-model="breedId"
          :invalid="Boolean(errors.breedId)"
          :options="breedsOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona Raza"
        />

        <Message v-if="errors.breedId" severity="error" size="small" variant="simple">
          {{ errors.breedId }}
        </Message>
      </div>

      <div>
        <label class="block mb-2">Imagen</label>
        <InputGroup>
          <InputGroupAddon class="text-neutral-400">
            <i class="pi pi-image"></i>
          </InputGroupAddon>
          <InputText
            v-model="urlImage"
            v-bind="urlImageAttrs"
            :invalid="Boolean(errors.urlImage)"
            class="w-full"
            placeholder="Imagen"
          />
        </InputGroup>
        <Message v-if="errors.urlImage" severity="error" size="small" variant="simple">
          {{ errors.urlImage }}
        </Message>
      </div>

      <div>
        <label class="block mb-2">Comentario</label>

        <IftaLabel>
          <Textarea
            id="description"
            v-model="comment"
            v-bind="commentAttrs"
            :invalid="Boolean(errors.comment)"
            rows="5"
            class="resize-none w-full"
          />
          <label for="description">Comentario</label>
        </IftaLabel>

        <Message v-if="errors.comment" severity="error" size="small" variant="simple">
          {{ errors.comment }}
        </Message>
      </div>
      <div class="button-form-container-grid-end">
        <Button
          class="w-full max-w-md"
          :label="title"
          type="submit"
          severity="success"
          icon="pi pi-save"
          iconPos="right"
        />
      </div>
    </form>
  </div>
</template>
