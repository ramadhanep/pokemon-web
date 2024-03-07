<template>
  <div class="container mx-auto my-8">
    <router-link to="/" class="text-blue-700 hover:underline mb-4 block">
      &lt; Back to Pokemon List
    </router-link>
    <div v-if="pokemon" class="grid grid-cols-3 gap-6">
      <PokemonDetail :pokemon="pokemon" />
      <div>
        <button
          @click="catchPokemon"
          class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Catch Pokemon
        </button>
        <p v-if="pokemonCaught" class="mt-4 text-green-600 font-bold">
          You caught {{ pokemon.name }}!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const pokemon = ref<any | null>(null);
const router = useRouter();
const store = usePokemonStore();
const pokemonName = router.currentRoute.value.params.id as string;
const pokemonCaught = ref(false);

onMounted(async () => {
  try {
    const response = await $fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      {
        method: "GET",
      }
    );
    pokemon.value = response;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
});

const catchPokemon = () => {
  store.addPokemonToMyList({
    name: pokemon.value.name,
    sprites: pokemon.value.sprites,
    types: pokemon.value.types,
    species: pokemon.value.species,
    abilities: pokemon.value.abilities,
  });
  pokemonCaught.value = true;
};
</script>
