<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Textarea from 'primevue/textarea'
import { ref } from 'vue'
import type { PaymentMethod } from '@/models/PaymentMethod'

const paymentMethodData = ref<PaymentMethod | null>(null)

const dialogRef = inject('dialogRef') as Ref<{
  close: () => void
  data: {
    paymentMethodData: PaymentMethod
  }
}>

onMounted(() => {
  if (dialogRef.value.data) {
    console.log(dialogRef.value.data)
    const params = dialogRef.value.data.paymentMethodData
    if (params) {
      paymentMethodData.value = params
    }
  }
})
</script>

<template>
  <div class="card-dialog-form-layout">
      <div class="form-dialog-layout-col-2">
        <!-- name -->
        <div>
          <label class="block mb-2">Nombre</label>
          <InputGroup>
            <InputGroupAddon class="text-neutral-400">
              <i class="pi pi-info"></i>
            </InputGroupAddon>
            <InputText :value="paymentMethodData?.name" class="w-full" placeholder="Nombre" disabled />
          </InputGroup>
        </div>
        <!-- descripcion -->

        <div>
          <label class="block mb-2">Descripción</label>

          <Textarea
            id="description"
            :value="paymentMethodData?.description"
            rows="5"
            class="resize-none w-full"
            disabled
          />
        </div>
      </div>

  </div>
</template>
