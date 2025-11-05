<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/themeStore'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog';

const themeStore = useThemeStore();
onMounted(()=>{
themeStore.initTheme();
});
</script>

<template>
  <RouterView />
  <DynamicDialog />
  <ConfirmPopup group="confirmPopupGeneral"/>
  <Toast/>
  <ConfirmDialog group="confirmDialogGeneral"/>
</template>

