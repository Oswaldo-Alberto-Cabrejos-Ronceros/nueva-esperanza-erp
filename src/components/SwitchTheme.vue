<script setup lang="ts">
import { ref } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
import { useThemeStore } from '@/stores/themeStore';

//for theme

const themeStore = useThemeStore();
const checked = ref(themeStore.isDark)

</script>

<template>
<ToggleSwitch v-model="checked" @click="themeStore.toggleTheme">
    <template #handle="{ checked }">
        <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
</ToggleSwitch>
</template>
