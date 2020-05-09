<template>
  <div id="app">
    <navbar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',

  components: {
    navbar: Navbar,
  },
};
</script>

<style lang="scss">
@import './sass/colors';

html,
body {
  padding: 0;
  margin: 0;
  border: 0;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: calc(100vh - 50px);
  background-color: $off-white;
}

.content {
  margin-top: 50px;
}
</style>
