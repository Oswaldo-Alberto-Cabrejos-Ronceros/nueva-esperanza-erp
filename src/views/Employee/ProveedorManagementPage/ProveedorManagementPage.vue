<script setup lang="ts">
import Card from 'primevue/card'
import Message from 'primevue/message'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useProveedor } from '@/composables/useProveedor'
import type { Proveedor } from '@/services/Proveedor/domain/models/Proveedor'
import { onMounted, ref } from 'vue'

const {loading, error, getAllProveedores} = useProveedor();

const proveedores = ref<Proveedor[]>([])

onMounted(async ()=>{
  await loadProveedores();
})

const loadProveedores = async () =>{
  proveedores.value = await getAllProveedores();
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h3">
          Proveedores
        </h2>
      </template>

            <template #content>
        <div class="flex flex-col gap-6">
          <!-- for messague error -->
          <Message v-if="error.getAllProveedores" severity="error" size="small" variant="simple">
            Error al cargar los proveedores
          </Message>

          <DataTable
            v-if="proveedores"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :value="proveedores"
            :loading="loading.getAllProveedores"
          >
            <Column field="nombre" header="Nombre" style="width: 20%"></Column>
            <Column field="ruc" header="Ruc" style="width: 20%"></Column>
            <Column field="telefono" header="Telefono" style="width: 12%"></Column>
            <Column field="direccion" header="Dirección" style="width: 20%"></Column>
            <Column field="email" header="Email" style="width: 20%"></Column>
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
