<template>
  <div class="container mx-auto my-8 px-12">
    <router-link to="/" class="text-blue-700 hover:underline mb-4 block">
      &lt; Back to Pokemon List
    </router-link>
    <div v-if="pokemon" class="grid grid-cols-3 gap-6">
      <PokemonDetail :pokemon="pokemon" />
      <div>
        <button
          @click="catchPokemon"
          :class="{
            'bg-blue-300': pokemonCaught,
            'bg-blue-700': !pokemonCaught,
          }"
          class="text-white px-4 py-2 rounded hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          :disabled="pokemonCaught"
        >
          Catch the {{ pokemon.name }}
        </button>
        <template v-if="pokemonCaught">
          <p class="mt-4 text-green-600 font-bold">
            Congratulations! {{ pokemon.name }} has been added to your Pokemon
            List!
          </p>
          <router-link to="/my-pokemon-list" class="mt-4 text-blue-700 hover:underline mb-4 block">
            View My Pokemon List &gt;
          </router-link>
        </template>
      </div>
    </div>
    <Modal
      :visible="showModalConfirm"
      @update:visible="showModalConfirm = $event"
    >
      <p class="text-center text-3xl">✅</p>
      <p class="mt-2 mb-6">Success! You've caught the {{ pokemon.name }}</p>
      <hr />
      <h2 class="mt-6 text-lg font-bold mb-4">
        Enter a name for your {{ pokemon.name }}:
      </h2>
      <form @submit.prevent="confirmNaming">
        <input
          v-model="enteredName"
          type="text"
          class="border p-2 mb-4 w-full"
          placeholder="Enter Name"
          required
        />
        <div class="flex justify-between">
          <button
            @click="closeModalConfirm"
            type="button"
            class="text-gray-600 hover:underline px-4 py-2"
          >
            Close
          </button>
          <button
            type="submit"
            class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Confirm Name
          </button>
        </div>
      </form>
    </Modal>
    <Modal :visible="showModalError" @update:visible="showModalError = $event">
      <p class="text-center text-3xl">❌</p>
      <p class="mt-2">Failed to catch, please try again!</p>
      <div class="flex justify-end mt-6">
        <button
          @click="closeModalError"
          type="button"
          class="text-gray-600 hover:underline"
        >
          Close
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const pokemon = ref<any | null>(null);
const router = useRouter();
const store = usePokemonStore();
const showModalConfirm = ref(false);
const showModalError = ref(false);
const pokemonName = router.currentRoute.value.params.id as string;
const pokemonCaught = ref(false);
const enteredName = ref<string>("");

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

const catchPokemon = async () => {
  showModalError.value = false;
  showModalConfirm.value = false;
  try {
    const response = await $fetch(
      `http://localhost:3001/api/catchProbability`,
      {
        method: "GET",
        type: "application/json",
      }
    );

    if (response.probability == "success") {
      showModalError.value = false;
      showModalConfirm.value = true;
    } else {
      showModalError.value = true;
      showModalConfirm.value = false;
    }
  } catch (error) {
    showModalError.value = false;
    showModalConfirm.value = true;
    console.error("Error fetching Pokemon list:", error);
  }
};
const closeModalConfirm = () => {
  showModalConfirm.value = false;
  enteredName.value = "";
};

const closeModalError = () => {
  showModalError.value = false;
  enteredName.value = "";
};

const confirmNaming = () => {
  store.addPokemonToMyList({
    name: pokemon.value.name,
    sprites: pokemon.value.sprites,
    types: pokemon.value.types,
    species: pokemon.value.species,
    abilities: pokemon.value.abilities,
    custom_name: enteredName.value,
    custom_name_pool: enteredName.value,
    custom_idx: 0,
    custom_fibo: 0,
  });
  closeModalConfirm();
  pokemonCaught.value = true;
};
</script>
