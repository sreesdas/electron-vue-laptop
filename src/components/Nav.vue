<template>
  <nav class="navbar navbar-expand navbar-dark nav-gradient">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Laptop Register</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" to="/home">Home</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/about">Documentation</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/feedback">Register Issues</router-link>
        </li> -->
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    
  }
}
</script>

<style scoped>

  .nav-gradient {
    background: #cb2d3e;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom left , #ef473a, #cb2d3e);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom left, #ef473a, #cb2d3e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

</style>
