<template>
  <div class="container mx-auto my-8">
    <router-link to="/" class="text-blue-700 hover:underline mb-4 block">
      &lt; Back to Pokemon List
    </router-link>
    <h1 class="text-3xl font-bold mb-4 text-center">My Pokemon List</h1>
    <div v-if="myPokemonList.length > 0" class="mt-12 grid grid-cols-4 gap-4">
      <div
        v-for="pokemon in myPokemonList"
        :key="pokemon.name"
        class="flex flex-col"
      >
        <PokemonDetail :pokemon="pokemon" />
        <div class="flex gap-1 border p-2">
          <button
            @click="renamPokemon"
            class="w-full bg-blue-700 text-white px-4 py-2 hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 text-sm"
          >
            Rename Pokemon
          </button>
          <button
            @click="releasePokemon"
            class="w-full bg-green-700 text-white px-4 py-2 hover:bg-green-900 focus:outline-none focus:shadow-outline-green active:bg-green-800 text-sm"
          >
            Release Pokemon
          </button>
        </div>
      </div>
    </div>
    <div v-else class="mt-12">
      <p class="text-center text-gray-600">Empty Data!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = usePokemonStore();
const myPokemonList = store.myPokemonList;

const renamPokemon = () => {};
const releasePokemon = () => {};
</script>
