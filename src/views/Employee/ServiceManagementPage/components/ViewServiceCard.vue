<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Textarea from 'primevue/textarea'
import type { Service } from '@/models/Service'

//for props

const dialogRef = inject('dialogRef') as Ref<{
  data:{
    serviceData:Service
  }
}>

const serviceData = ref<Service | null> (null)

onMounted(()=>{
  serviceData.value= dialogRef.value.data.serviceData
})

//for elements
const elements:{title:string, key: keyof Service, icon:string}[]=[
  {
    title: 'Nombre',
    key: 'name',
    icon: 'pi-info'
  },
    {
    title: 'Precio',
    key: 'price',
    icon: 'pi-sort-alt'
  },
      {
    title: 'Duración',
    key: 'duration',
    icon: 'pi-hourglass'
  },
    {
    title: 'Imagen',
    key: 'dirImage',
    icon: 'pi-image'
  },
      {
    title: 'Especie',
    key: 'specie',
    icon: 'pi-info'
  },
   {
    title: 'Categoria',
    key: 'category',
    icon: 'pi-info'
  }
]


</script>


<template>
    <div class="card-dialog-form-layout" v-if="serviceData">


      <div class="flex-1 space-y-6">
        <div class="form-dialog-layout">
          <div v-for="(element, id) in elements" :key="id">
            <label class="block mb-2">{{ element.title }}</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi ${element.icon}`"></i>
              </InputGroupAddon>
              <InputText :value="serviceData[element.key]" disabled class="w-full" />
            </InputGroup>
          </div>
          <div>
            <label class="block mb-2">Descripción</label>
            <Textarea
              id="description"
              disabled
              :value="serviceData.description"
              rows="5"
              class="resize-none w-full"
            />
          </div>
        </div>
      </div>
    </div>
</template>
