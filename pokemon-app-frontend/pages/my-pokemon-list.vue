<template>
  <div class="container mx-auto my-8 px-12">
    <router-link to="/" class="text-blue-700 hover:underline mb-4 block">
      &lt; Back to Pokemon List
    </router-link>
    <h1 class="text-3xl font-bold mb-4 text-center">My Pokemon List</h1>
    <div v-if="myPokemonList.length > 0" class="mt-12 grid grid-cols-4 gap-4">
      <div
        v-for="(pokemon, idx) in myPokemonList"
        :key="pokemon.name"
        class="flex flex-col"
      >
        <PokemonDetail :pokemon="pokemon" />
        <div class="flex gap-1 border p-2">
          <button
            @click="
              renamePokemon(idx, pokemon.custom_name_pool, pokemon.custom_idx)
            "
            class="w-full bg-blue-700 text-white px-4 py-2 hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 text-sm"
          >
            Rename Pokemon
          </button>
          <button
            @click="releasePokemon(idx, pokemon.custom_fibo)"
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
    <Modal
      :visible="showModalSuccess"
      @update:visible="showModalSuccess = $event"
    >
      <p class="text-center text-3xl">✅</p>
      <p class="mt-6">Success!, {{ releasePokemonName }}! has been released</p>
      <p class="mt-2 mb-6 text-sm">
        May your journey bring you new adventures and battles.
      </p>
      <div class="flex justify-end mt-6">
        <button
          @click="closeModalSuccess"
          type="button"
          class="text-gray-600 hover:underline"
        >
          Close
        </button>
      </div>
    </Modal>
    <Modal :visible="showModalError" @update:visible="showModalError = $event">
      <p class="text-center text-3xl">❌</p>
      <p class="mt-6">
        Error!, {{ releasePokemonName }}! cannot release, please try again
      </p>
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
useHead({
  titleTemplate: 'My Pokemon List',
})

const store = usePokemonStore();
const myPokemonList = store.myPokemonList;
const showModalSuccess = ref(false);
const showModalError = ref(false);
const releasePokemonName = ref<string>("");

const renamePokemon = async (idx, custom_name_pool, custom_idx) => {
  try {
    const response = await $fetch(`http://localhost:3001/api/renamePokemon`, {
      method: "POST",
      type: "application/json",
      body: {
        name: custom_name_pool,
        renameCount: custom_idx,
      },
    });
    myPokemonList[idx].custom_name = response.newName;
    myPokemonList[idx].custom_idx = Number(custom_idx) + 1;
    myPokemonList[idx].custom_fibo = response.fiboNumber;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
};

const closeModalSuccess = () => {
  showModalSuccess.value = false;
};

const closeModalError = () => {
  showModalError.value = false;
};

const releasePokemon = async (idx: number, custom_fibo: any) => {
  try {
    const response = await fetch(`http://localhost:3001/api/releasePokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    releasePokemonName.value = myPokemonList[idx].custom_name;
    const released = isPrimeNumber(data.number);
    if (released) {
      myPokemonList.splice(idx, 1);
      showModalSuccess.value = true;
    } else {
      showModalError.value = true;
    }
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
};

const isPrimeNumber = (num: number): boolean => {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
</script>
