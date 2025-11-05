<script lang="ts" setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { onMounted, ref } from 'vue'
import Select from 'primevue/select'
import { usePaymentMethod } from '@/composables/usePaymentMethod'
import type { PaymentMethod } from '@/models/PaymentMethod'
import type { OptionSelect } from '@/models/OptionSelect'
import { Tag } from 'primevue'


const props = defineProps<{
  serviceName: string
  price: number
  paymentMethodId: number
  status: string
  paymentId: number
  buttonActive: boolean
}>()

const emit = defineEmits(['complete-payment','download-ticket'])

//for


//ref
const paymentMethodIdref = ref<number>(0)

const paymentMethodsOptions = ref<OptionSelect[]>([])

const { getAllPaymentMethods } = usePaymentMethod()
const paymentIdsToOptionsSelect = (items: PaymentMethod[]): OptionSelect[] => {
  return items.map((item) => ({
    value: item.id,
    name: item.name,
  }))
}

const handleCompletePayment = () => {
  emit('complete-payment')
}

const handleDownloadTicket =()=>{
  emit('download-ticket')
}

onMounted(async () => {
  paymentMethodsOptions.value = paymentIdsToOptionsSelect(await getAllPaymentMethods())
  paymentMethodIdref.value = props.paymentMethodId
})

const subtotal = ref<number>(props.price * 0.82)
const igv = ref<number>(Number((props.price - subtotal.value).toFixed(1)))
</script>

<template>
  <Card class="card-primary w-full">
    <template #title>
      <div class="flex gap-2 items-center justify-between">
        <div class="flex gap-2 items-center">
          <i class="pi pi-money-bill"></i>
          <p>Facturación</p>
        </div>
        <Tag severity="secondary" :value="status" />
      </div>
    </template>
    <template #subtitle>
      <p>Procesamiento de pago</p>
    </template>
    <template #content>
      <div>
        <h3 class="textLg font-semibold">Servicio programado</h3>
        <div
          class="mt-4 rounded-sm bg-surface-100 dark:bg-surface-800 flex items-center justify-between p-3"
        >
          <p class="textLg font-semibold">{{ serviceName }}</p>
          <p class="textLg font-semibold text-green-600 dark:text-green-400">S/ {{ price }}</p>
        </div>
        <Divider />
        <div class="textLg flex items-center justify-between">
          <p>Subtotal:</p>
          <p>S/ {{ subtotal.toFixed(1) }}</p>
        </div>
        <div class="textLg flex items-center justify-between mt-2">
          <p>IGV (18%):</p>
          <p>S/ {{ igv }}</p>
        </div>
        <Divider />
        <div
          class="textLg mb-4 font-bold text-green-600 dark:text-green-400 flex items-center justify-between"
        >
          <p>Total:</p>
          <p>S/ {{ price }}</p>
        </div>
        <p>Método de pago</p>
        <Select
          v-model="paymentMethodIdref"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecciona método de pago"
          :options="paymentMethodsOptions"
          class="w-full mt-4"
          :disabled="status === 'Completada' || buttonActive"
          fluid
        />
        <div class="w-full flex gap-4 mt-4">
          <Button
            severity="success"
            icon-pos="left"
            icon="pi pi-credit-card"
            label="Procesar pago"
            class="flex-1"
            type="submit"
            :disabled="status === 'Completada' || buttonActive"
            @click="handleCompletePayment"
          />
          <Button
            label="Generar Boleta"
            icon="pi pi-receipt"
            icon-pos="left"
            variant="outlined"
            severity="secondary"
            :disabled="!(status === 'Completada')"
            @click="handleDownloadTicket"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
