<script lang="ts" setup>
import { inject, onMounted, ref, type Ref } from 'vue'
import Textarea from 'primevue/textarea'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { schema } from '@/validation-schemas-forms/schema-block-employee-client'
import type { FormValues } from '@/validation-schemas-forms/schema-block-employee-client'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

//form

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    blockNote: undefined,
  },
})

const [blockNote, blockNoteAttrs] = defineField('blockNote')

const title = ref<string>('')

const dialogRef = inject('dialogRef') as Ref<{
  close: (data?: FormValues) => void
  data: {
    title?: string
  }
}>

const onSubmit = handleSubmit((values) => {
  console.log(values)
  dialogRef.value.close(values as FormValues)
})

onMounted(() => {
  if (dialogRef.value.data) {
    const titleGet = dialogRef.value.data.title
    if (titleGet) {
      title.value = titleGet
    }
  }
})
</script>

<template>
  <div class="card-dialog-form-layout">
    <form @submit.prevent="onSubmit" class="form-dialog-layout-flex-col">
      <!-- name -->
      <div class="w-full">
        <label class="block mb-2">Nota de bloqueo</label>
        <Textarea
          v-model="blockNote"
          v-bind="blockNoteAttrs"
          class="w-full"
          placeholder="Ingrese la nota de bloqueo"
        >
        </Textarea>
        <Message v-if="errors.blockNote" severity="error" size="small" variant="simple">
          {{ errors.blockNote }}
        </Message>
      </div>
      <div class="w-full">
        <Button
          class="w-full"
          :label="`Bloquear ${title}`"
          type="submit"
          severity="danger"
          icon="pi pi-ban"
          iconPos="right"
        />
      </div>
    </form>
  </div>
</template>
