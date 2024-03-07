<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean | null }>();
</script>
