<template>
  <div id="app">
    <b-container align="center">
      <h1>Pokémon Guesser</h1>
      <p v-if="!imgSrc">WHERE IS IMAGE</p>
      <b-img :src="imgSrc"></b-img>
      <p>{{ name }}</p>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: '',
      filename: ''
    }
  },
  computed: {
    imgSrc() {
      return 'http://localhost:3000/' + this.filename;
    }
  },
  methods: {
    async fetchPokemon(id, obf) {
      const response = await fetch(`http://localhost:3000/pokemon/${id}/${obf}`);
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }
      this.name = responseData['name_en'];
      this.filename = responseData['filename'];

    }
  },
  created() {
    this.fetchPokemon(1, 1);
  }
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
