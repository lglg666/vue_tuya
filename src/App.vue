<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
      <audio autoplay="autoplay" id="music1">
        <source src="../src/assets/和弦的色彩-剪.mp3">
      </audio>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
     console.log(this.$route.query.uid);
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* margin-top: 60px; */
}
</style>
