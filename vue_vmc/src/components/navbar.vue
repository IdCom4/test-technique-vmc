<template>
  <div id="navbar">
    <div id="fixed-navbar">
      <router-link to="/">
        <img src="https://vmc-static-contents.s3.eu-west-3.amazonaws.com/vmclogo.svg" alt="logo valuemycar">
      </router-link>
      <div id="links">
        <router-link to="/">Home</router-link>
        <router-link to="/vehicles">Vehicles</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed:  {
    currentPath() {
      return this.$route.path;
    }
  }
}
</script>

<style scoped>
#navbar {
  height: var(--navbar-height);
}

#fixed-navbar {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--main-clr);

  z-index: 2;
  
}

#fixed-navbar img {
  width: 250px;
}

#fixed-navbar #links {
  display: flex;
  justify-content: center;
  align-items: center;
}

#fixed-navbar #links a {
  color: var(--second-clr);
  margin: 0 20px;
  text-decoration: none;
  font-size: 20px;
  color: grey;
}

#fixed-navbar #links a.router-link-exact-active {
  color: white;
  text-decoration: underline;
}

#fixed-navbar #links a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 600px) {
  #navbar {
    height: var(--navbar-responsive-height);
  }
  #fixed-navbar {
    padding: 10px 0;
  }
  
  #fixed-navbar img {
    width: 150px;
  }

  #fixed-navbar #links a {
    margin: 0 5px;
  }
}

</style>