<template>
  <div id="app">
    <b-container align="center" fluid="sm" style="max-width: 570px">
      <h1>Who's that Pokémon? 🤔</h1>
      <b-form-checkbox-group
        v-model="chosenGens"
        :state="state"
        button-variant="primary"
        class="py-2"
      >
        <b-row>
          <b-col cols="3" v-for="gen in options" :key="gen.id" class="px-0">
            <b-form-checkbox :value="gen.value" :disabled="isDisabled(gen)">
              {{ gen.text }}
            </b-form-checkbox></b-col
          >
        </b-row>
        <b-form-invalid-feedback :state="state"
          >Please select at least 1</b-form-invalid-feedback
        >
      </b-form-checkbox-group>
      <div class="py-2">
        <p v-if="streak === 0">Streak : ❌</p>
        <p v-else-if="streak === 1">Streak : 🔥</p>
        <p v-else>Streak : {{ streak }} 🔥</p>
      </div>
      <b-img class="my-3" v-if="imgSrc !== ''" :src="imgSrc"></b-img>
      <p v-else>WHERE IS IMAGE</p>
      <b-form-input
        id="input"
        class="my-2"
        v-model="guess"
        placeholder="Type the name"
        ref="pokeguess"
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
      chosenGens: [
        "gen1",
        "gen2",
        "gen3",
        "gen4",
        "gen5",
        "gen6",
        "gen7",
        "gen8",
      ],
      options: [
        { id: 0, text: "Gen 1", value: "gen1" },
        { id: 1, text: "Gen 2", value: "gen2" },
        { id: 2, text: "Gen 3", value: "gen3" },
        { id: 3, text: "Gen 4", value: "gen4" },
        { id: 4, text: "Gen 5", value: "gen5" },
        { id: 5, text: "Gen 6", value: "gen6" },
        { id: 6, text: "Gen 7", value: "gen7" },
        { id: 7, text: "Gen 8", value: "gen8" },
      ],
      guess: "",
      pokeid: null,
      obf: null,
      pokenames: null,
      filenames: null,
      startTime: null,
      streak: 0,
      userGuessedRight: false,
    };
  },
  computed: {
    state() {
      return this.chosenGens.length > 0;
    },
    fetchLink() {
      let genString = "http://localhost:3000/pokemon/";
      for (const gen of this.chosenGens) {
        genString += gen + "&";
      }
      return genString;
    },
    // more computed toLowerCase
    imgSrc() {
      const filename = this.obf < 9 ? "filename" + this.obf : "filename";
      return this.filenames
        ? "http://localhost:3000/" + this.filenames[filename]
        : "";
    },
    guessedRight() {
      return this.pokenames
        ? this.pokenames.has(this.guess.toLowerCase())
        : false;
    },
    failed() {
      return this.obf >= 9 && !this.guessedRight ? true : false;
    },
  },
  watch: {
    chosenGens: function() {
      this.fetchPokemon();
    },
    guessedRight: function() {
      if (this.guessedRight) {
        //const finishTime = Date.now();
        //this.score += Math.max(14000 - (finishTime - this.startTime), 0);
        if (!this.failed) this.streak++;
        this.obf = 9;
      }
    },
    failed: function() {
      this.streak = 0;
    },
  },
  methods: {
    isDisabled(gen) {
      return this.chosenGens.length === 1 && this.chosenGens[0] === gen.value;
    },
    *fetchPokemon() {
      this.$refs.pokeguess.$el.focus()
      this.startTime = Date.now();

      this.obf = 1;
      this.guess = "";

      const response = yield fetch(this.fetchLink);

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const responseData = yield response.json();

      this.pokenames = new Set();
      for (let key in responseData["pokenames"])
        this.pokenames.add(responseData["pokenames"][key].toLowerCase());
      console.log(this.pokenames);

      this.filenames = {};
      for (let key in responseData["filenames"]) {
        this.filenames[key] = responseData["filenames"][key];
      }

      while (this.obf < 10) {
        this.obf++;
        console.log(this.imgSrc);

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
  mounted() {
    this.fetchPokemon = this.makeSingle(this.fetchPokemon);
    this.fetchPokemon();
  },
  // mounted() {
  //  this.$refs.pokeguess.$el.focus()
  // }
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
