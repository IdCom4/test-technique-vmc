<template>
  <div id="app">
    <navbar />
    <router-view class="router-view"></router-view>
    <vmc-footer />
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'
import VmcFooter from './components/vmc-footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    VmcFooter
  }
}
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}

#app .router-view {
  min-height: calc(100vh - calc(var(--navbar-height) + var(--footer-height)));
}

@media screen and (max-width: 600px) {
  #app .router-view {
    min-height: calc(100vh - calc(var(--navbar-responsive-height) + var(--footer-responsive-height)));
  }
}
</style>
