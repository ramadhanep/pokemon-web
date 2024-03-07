<template>
  <div class="container mx-auto my-8 px-12">
    <h1 class="text-3xl font-bold my-8 text-center">Pokemon List</h1>
    <PokemonList :pokemonList="pokemonList" />
    <Pagination
      v-if="showPagination"
      :previousPage="pagination.previous"
      :nextPage="pagination.next"
      @pageChange="handlePageChange"
    />
    <br>
    <router-link to="/my-pokemon-list" class="mt-12 text-center text-blue-700 hover:underline mb-4 block">
      My Pokemon List
    </router-link>
  </div>
</template>

<script setup lang="ts">
import PokemonList from "@/components/PokemonList.vue";
import Pagination from "@/components/Pagination.vue";
import { ref, onMounted } from "vue";

const pokemonList = ref<any[]>([]);
const showPagination = ref(false);
const pagination = ref({ previous: null, next: null });

const fetchPokemonList = async (url: string) => {
  try {
    const response = await $fetch(url, { method: "GET" });
    pokemonList.value = response.results;
    showPagination.value = !!response.previous || !!response.next;
    pagination.value = { previous: response.previous, next: response.next };
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
};

const handlePageChange = (offset: number) => {
  const limit = 20;
  const newOffset = Math.max(0, offset);
  const newUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${newOffset}&limit=${limit}`;
  fetchPokemonList(newUrl);
};

onMounted(() => {
  fetchPokemonList("https://pokeapi.co/api/v2/pokemon/");
});
</script>
