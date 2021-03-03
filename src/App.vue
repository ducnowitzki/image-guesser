<template>
  <div id="app">
    <b-container align="center">
      <h1>Pokémon Guesser</h1>
      <p v-if="!imgSrc">WHERE IS IMAGE</p>
      <b-img :src="imgSrc"></b-img>
      <b-form-input v-model="guess" placeholder="Guess the pokémon"></b-form-input>
      <b-button @click="fetchRandomPokemon">New Pokémon</b-button>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "",
      guess: "",
      filename: "",
      obf: 1,
    };
  },
  computed: {
    imgSrc() {
      return "http://localhost:3000/" + this.filename;
    },

  },
  methods: {
    async fetchPokemon(id, obf) {
      const response = await fetch(
        `http://localhost:3000/pokemon/${id}/${obf}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }
      console.log("neu");
      this.name = responseData["name_en"];
      this.filename = responseData["filename"];
    },
    fetchRandomPokemon() {
      this.obf = 6;
      const id = Math.floor(Math.random() * 151) + 1;
      this.fetchPokemon(id, this.obf);
    },
    sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    },
  },

  created() {
    this.fetchRandomPokemon();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
