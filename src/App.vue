<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>

import Nav from '@/components/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav
  },
  mounted() {
    this.$router.push('/about')
  }
}

</script>

<style>
  #app {
    height: 100vh;
    overflow: scroll;
  }
</style>