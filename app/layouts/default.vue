<script setup lang="ts">
import NavBar from '~/components/layout/NavBar.vue';
</script>

<template>
  <div class="bg-void font-body text-main min-h-screen">
    <NavBar />
    <main class="mt-5 p-5">
      <slot />
    </main>
  </div>
</template>
