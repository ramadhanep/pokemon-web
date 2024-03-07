<template>
  <div class="bg-white p-4 border text-center">
    <router-link :to="`/pokemon/${pokemon.name}`">
      <h2 class="text-xl font-semibold">{{ pokemon.name }}</h2>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const { pokemon } = defineProps(["pokemon"]);
</script>
