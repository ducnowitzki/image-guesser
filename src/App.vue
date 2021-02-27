<template>
  <div id="app">
    <h1>Image Guesser</h1>
    <p v-if="!imgSrc">Pls add an image</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgSrc: null
    }
  }
}
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
