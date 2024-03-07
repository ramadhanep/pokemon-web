export const usePokemonStore = defineStore("pokemonStore", {
  state: () => ({
    myPokemonList: [],
  }),
  actions: {
    async addPokemonToMyList(pokemon) {
      this.$state.myPokemonList.push(pokemon);
    },
  },
});
