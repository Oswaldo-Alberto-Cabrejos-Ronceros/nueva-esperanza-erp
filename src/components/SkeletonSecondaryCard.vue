<script lang="ts" setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="flex mb-4">
    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
    <div>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height=".5rem"></Skeleton>
    </div>
  </div>
</template>
