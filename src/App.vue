<template>

  <NavBar></NavBar>
  <router-view />

  <FooterView></FooterView>

</template>
<script lang="ts">
import NavBar from './components/NavBar.vue';
import { defineComponent } from 'vue';
import FooterView from './components/FooterView.vue';
export default defineComponent({
  name: "AppComponent",
  components: {
    NavBar, FooterView
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
