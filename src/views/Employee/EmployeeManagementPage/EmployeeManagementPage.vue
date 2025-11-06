<script setup lang="ts">
import { useEmployee } from '@/composables/useEmployee'
import type { Employee } from '@/services/Employee/domain/models/Employee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import Message from 'primevue/message'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

const { loading, error, getAllEmployees } = useEmployee()

const employees = ref<Employee[]>([])

onMounted(async () => {
  await loadEmployees()
})

const loadEmployees = async () => {
  employees.value = await getAllEmployees()
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h3 class="h3">Gestión de empleados</h3>
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <!-- for messague error -->
          <Message v-if="error.getAllEmployees" severity="error" size="small" variant="simple">
            Error al cargar los empleados
          </Message>

          <DataTable
            v-if="employees"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :value="employees"
            :loading="loading.getAllEmployees"
          >
            <Column field="nombres" header="Nombres" style="width: 14%"></Column>
            <Column field="apellidos" header="Apellidos" style="width: 14%"></Column>
            <Column field="numeroDocumento" header="Documento" style="width: 14%"></Column>
            <Column field="cargo" header="Cargo" style="width: 10%"></Column>
            <Column field="salario" header="Salario" style="width: 10%"></Column>
            <Column field="fechaNacimiento" header="Nacimiento" style="width: 15%"></Column>
            <Column field="fechaContratacion" header="Contratacion" style="width: 15%"></Column>
            <Column header="Acciones" style="width: 8%">
              <template #body="{}">
                <Button
                  icon="pi pi-pencil"
                  severity="warn"
                  variant="text"
                  aria-label="Editar"
                  rounded
                  size="small"
                ></Button>
                <Button
                  icon="pi pi-ban"
                  severity="danger"
                  variant="text"
                  aria-label="Bloquear"
                  rounded
                  size="small"
                ></Button> </template
            ></Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
