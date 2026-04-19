<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
</script>

<style>
#app { width: 100%; height: 100vh; }
</style>
