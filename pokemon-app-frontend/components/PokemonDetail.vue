<template>
  <div class="bg-white p-6 border">
    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="w-32 h-32 rounded-full border-4 border-blue-700 mx-auto"
    />
    <h2 class="text-lg font-bold text-blue-900 text-center">
      {{ pokemon.name }}
    </h2>
    <div class="flex flex-col space-y-2">
      <p class="text-lg text-center">
        <span class="text-sm">{{ displayArray(pokemon.types, "type") }}</span>
      </p>
      <p class="text-lg">Species</p>
      <div class="flex flex-wrap">
        <span
          class="bg-gray-50 px-2 py-1 text-xs text-gray-600 cursor-default hover:bg-blue-700 hover:text-white"
        >
          {{ pokemon.species.name }}
        </span>
      </div>
      <p class="text-lg">Abilities</p>
      <div class="flex flex-wrap">
        <template v-for="key in pokemon.abilities">
          <span
            class="bg-gray-50 px-2 py-1 text-xs text-gray-600 cursor-default hover:bg-blue-700 hover:text-white"
          >
            {{ key.ability.name }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const { pokemon } = defineProps(["pokemon"]);
const displayArray = (array, key) => {
  return array.map((item) => item[key].name).join(", ");
};
</script>
