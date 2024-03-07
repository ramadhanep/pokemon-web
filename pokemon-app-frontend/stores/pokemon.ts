// store/pokemonStore.ts

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => ({
    myPokemonList: [],
  }),
  actions: {
    async addPokemonToMyList(pokemon) {
      this.$state.myPokemonList.push(pokemon);
    },
    async removePokemonFromMyList(pokemon) {
      this.$state.myPokemonList = this.$state.myPokemonList.filter((p) => p !== pokemon);
    },
  },
});
