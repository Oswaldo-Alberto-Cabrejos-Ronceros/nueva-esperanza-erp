<script setup lang="ts">
import PerfilCard from './components/PerfilCard.vue'
import EditClientCard from '@/views/Common/PerfilPage/components/EditClientCard.vue'
import { useDialog } from 'primevue/usedialog'
import type { MyInfoClient } from '@/models/MyInfoClient'
import type { MyInfoEmployee } from '@/models/MyInfoEmployee'
import { useClient } from '@/composables/useClient'
import { useEmployee } from '@/composables/useEmployee'
import { onMounted, ref } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication'
import type { FormValues as SchemaEditSelfClient } from '@/validation-schemas-forms/schema-edit-self-client'
import type { Headquarter } from '@/models/Headquarter'
import type { OptionSelect } from '@/models/OptionSelect'
import { useHeadquarter } from '@/composables/useHeadquarter'

//methods for get
const { getEntityId, getMainRole } = useAuthentication()
const { myInfoAsClient, updateClientAsClient } = useClient()
const { getEmployeeMyInfo } = useEmployee()
const { getAllHeadquarters } = useHeadquarter()
//ref for myInfoClient
const myInfoClient = ref<MyInfoClient | null>(null)
//ref for myInfoEmployee
const myInfoEmployee = ref<MyInfoEmployee | null>(null)
//const myInfo
const myInfo = ref<MyInfoClient | MyInfoEmployee | null>(null)
//
const entityId = ref<number | null>(null)
onMounted(() => loadMyInfo())

//for load
const loadMyInfo = async () => {
  const role = getMainRole()
  const entityIdGet = getEntityId()
  entityId.value = entityIdGet
  if (role && entityIdGet) {
    if (role.toUpperCase() === 'CLIENTE') {
      myInfoClient.value = await myInfoAsClient(entityIdGet)
      myInfo.value = myInfoClient.value
    } else {
      myInfoEmployee.value = await getEmployeeMyInfo(entityIdGet)
      myInfo.value = myInfoEmployee.value
    }
  }
}

//for get options from headquarters

const headquartersToOptionsSelect = (headquarters: Headquarter[]): OptionSelect[] => {
  return headquarters.map((headquarter) => ({
    value: headquarter.id,
    name: headquarter.name,
  }))
}

//for open dynamic dialog
const dialog = useDialog()

//for client
const showEditClient = async () => {
  dialog.open(EditClientCard, {
    data: {
      clientSelfData: {
        address: myInfoClient.value?.address,
        headquarterId: myInfoClient.value?.headquarter.id,
        phone: myInfoClient.value?.phone,
      } as SchemaEditSelfClient,
      headquartersOptions: headquartersToOptionsSelect(await getAllHeadquarters()),
    },
    props: {
      modal: true,
      header:'Editar mis datos'
    },
    onClose: async (options) => {
      const data = options?.data as SchemaEditSelfClient
      if (data) {
        if (entityId.value) {
          const myInfoGet = await updateClientAsClient(entityId.value, data)
          console.log('Datos recibidos', myInfoGet)
          myInfoClient.value = await myInfoAsClient(entityId.value)
          myInfo.value = myInfoClient.value
        }
      }
    },
  })
}
</script>

<template>
  <div class="layout-principal-flex">
    <PerfilCard v-if="myInfo" :user-data="myInfo" @edit:client="showEditClient" />
  </div>
</template>
