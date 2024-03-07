<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <PokemonCard v-for="pokemon in pokemonList" :key="pokemon.name" :pokemon="pokemon" />
  </div>
</template>

<script setup lang="ts">
import PokemonCard from "@/components/PokemonCard.vue";
import { defineProps } from "vue";

const { pokemonList } = defineProps(["pokemonList"]);
</script>
