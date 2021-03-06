<template>
  <div id="app">
    <b-container align="center">
      <h1>Who's that Pokémon?</h1>
      <p>Streak: {{ streak }}</p>
      <b-img class="my-3" v-if="imgSrc" :src="imgSrc"></b-img>
      <p v-else>WHERE IS IMAGE</p>
      <b-form-input
        id="input"
        class="my-2"
        v-model="guess"
        placeholder="Guess the Pokémon"
      ></b-form-input>
      <b-button class="my-2" @click="fetchPokemon">New Pokémon</b-button>
      <p v-if="guessedRight">You did it!</p>
      <p v-if="failed">Not in time...</p>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      guess: "",
      pokeid: null,
      obf: 1,
      pokenames: null,
      filename: "",
      startTime: null,
      streak: 0,
      userGuessedRight: false,
    };
  },
  computed: {
    // more computed toLowerCase
    imgSrc() {
      return "http://localhost:3000/" + this.filename;
    },
    guessedRight() {
      return this.pokenames
        ? this.pokenames.has(this.guess.toLowerCase())
        : false;
    },
    failed() {
      return this.obf >= 9 ? true : false;
    },
  },
  watch: {
    guessedRight: function() {
      if (this.guessedRight) {
        //const finishTime = Date.now();
        //this.score += Math.max(14000 - (finishTime - this.startTime), 0);
        if (!this.failed) this.streak++;
        this.obf = 9;
      }
    },
  },
  methods: {
    *fetchPokemon() {
      this.startTime = Date.now();
      this.pokeid = Math.floor(Math.random() * 151) + 1;
      this.obf = 1;
      this.guess = "";

      while (this.obf < 10) {
        const response = yield fetch(
          `http://localhost:3000/pokemon/${this.pokeid}/${this.obf}`
        );
        const responseData = yield response.json();

        if (!response.ok) {
          const error = new Error(responseData.message || "Failed to fetch!");
          throw error;
        }

        this.pokenames = new Set();
        for (let key in responseData["pokenames"])
          this.pokenames.add(responseData["pokenames"][key].toLowerCase());
        console.log(this.pokenames);
        this.filename = responseData["filename"];

        this.obf++;

        if (this.obf < 9) {
          yield new Promise((resolve) => setTimeout(resolve, 2000));
        }
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


#input {
  width: 256px;
}
</style>
