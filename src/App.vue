<template>
  <div id="app">
    <b-container align="center">
      <h1>Who's that Pokémon?</h1>
      <p>Score: {{ score }}</p>
      <b-img v-if="imgSrc" :src="imgSrc"></b-img>
      <p v-else>WHERE IS IMAGE</p>
      <b-form-input
        v-model="guess"
        placeholder="Guess the Pokémon"
      ></b-form-input>
      <b-button @click="fetchPokemon">New Pokémon</b-button>
      <p v-if="rightGuess">You did it!</p>
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
      startTime: null,
      score: 0,
    };
  },
  computed: {
    // more computed toLowerCase
    imgSrc() {
      return "http://localhost:3000/" + this.filename;
    },
    rightGuess() {
      return this.name.toLowerCase() === this.guess.toLowerCase();
    },
  },
  watch: {
    rightGuess: function() {
      if (this.rightGuess) {
        const finishTime = Date.now();
        this.score += Math.max(14000 - (finishTime - this.startTime), 0);
      }
    },
  },
  methods: {
    *fetchPokemon() {
      this.startTime = Date.now();
      this.obf = 1;
      const id = Math.floor(Math.random() * 151) + 1;

      for (let i = this.obf; i < 8; i++) {
        this.obf = i;
        const response = yield fetch(
          `http://localhost:3000/pokemon/${id}/${this.obf}`
        );
        const responseData = yield response.json();

        if (!response.ok) {
          const error = new Error(responseData.message || "Failed to fetch!");
          throw error;
        }

        this.name = responseData["name_de"].toLowerCase();
        this.filename = responseData["filename"];

        yield new Promise((resolve) => setTimeout(resolve, 2000));
      }
    },
    makeSingle(generator) {
      let globalNonce;
      return async function(...args) {
        const localNonce = (globalNonce = new Object());

        const iter = generator(...args);
        let resumeValue;
        for (;;) {
          const n = iter.next(resumeValue);
          if (n.done) {
            return n.value; // final return value of passed generator
          }

          // whatever the generator yielded, _now_ run await on it
          resumeValue = await n.value;
          if (localNonce !== globalNonce) {
            return; // a new call was made
          }
          // next loop, we give resumeValue back to the generator
        }
      };
    },
  },

  created() {
    this.fetchPokemon = this.makeSingle(this.fetchPokemon);
    this.fetchPokemon();
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
