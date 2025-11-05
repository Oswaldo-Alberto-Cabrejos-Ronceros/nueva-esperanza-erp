 <script lang="ts" setup>
 /*
import { ref, onMounted, inject } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import type { Ref } from 'vue'
import type { Payment } from '@/models/Payment'

//props for working with dynamicdialog
const dialogRef = inject('dialogRef') as Ref<{
  data: {
    paymentData: Payment
  }
}>

const paymentData = ref<Payment | null>(null)

onMounted(() => {
  paymentData.value = dialogRef.value.data.paymentData
})

//for elements to see

const elements: { title: string; key: keyof Payment; icon: string }[] = [
  {
    title: 'Cliente',
    key: 'clientDni',
    icon: 'pi-id-card',
  },
  {
    title: 'Sede',
    key: 'headquarter',
    icon: 'pi-info',
  },
  {
    title: 'Servicio',
    key: 'service',
    icon: 'pi-info',
  },
  {
    title: 'Monto',
    key: 'amount',
    icon: 'pi-wallet',
  },
  {
    title: 'M.Pago',
    key: 'paymentMethod',
    icon: 'pi-credit-card',
  },
  {
    title: 'Fecha',
    key: 'date',
    icon: 'pi-calendar',
  },
  {
    title: 'Hora',
    key: 'time',
    icon: 'pi-clock',
  },
  {
    title: 'Estado',
    key: 'state',
    icon: 'pi-info',
  },
  {
    title: 'Empleado',
    key: 'employeeAssigned',
    icon: 'pi-user',
  },
]*/
</script>

<template>
  <div></div>
  <!--
  <Card class="card-dialog-form-layout">
    <template #title>
      <h3 class="h3 text-center">Pago: {{ paymentData?.id }}</h3>
    </template>
    <template v-if="paymentData" #content>
      <div class="flex-1 space-y-6">
        <div class="form-dialog-layout">
          <div v-for="(element, id) in elements" :key="id">
            <label class="block mb-2">{{ element.title }}</label>
            <InputGroup>
              <InputGroupAddon class="text-neutral-400">
                <i :class="`pi ${element.icon}`"></i>
              </InputGroupAddon>
              <InputText :value="paymentData[element.key]" disabled class="w-full" />
            </InputGroup>
          </div>
        </div>
      </div>
    </template>
  </Card>
  -->
</template>
