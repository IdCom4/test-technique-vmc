<template>
  <section id="home">

    <div id="fixed-background"></div>

    <div id="pannel">
      <h1>ValueMyCar</h1>
      <h2>La plateforme de mise en relation de l'automobile</h2>
    </div>
  
    <div id="presentation">
      <h2>La solution à tous les problèmes auto</h2>
      <p>Votre voiture fait un bruit inconnu, ou vous sentez une vibration anormale ?</p>
      <p>Nous vous proposons une voiture de rechange !</p>
      <router-link to="/vehicles"><button>Voir les véhicules disponibles</button></router-link>
      <small>* Ceci n'est pas le service réel proposé par ValueMycar.</small>
      <small>Uniquement à but démonstratif.</small>
    </div>

  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>

#home #fixed-background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(https://vmc-static-contents.s3.eu-west-3.amazonaws.com/landing-rambouillet-img-compressed/value-center.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  
}

/* pannel section */
#home #pannel {
  background-color: rgba(0, 0, 0, 0.3);
  height: calc(95vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#home #pannel h1, #home #pannel h2 {
  width: 100%;
  text-align: center;
  color: white;
}
#home #pannel h1 {
  margin: 10px 0;
}

/* presentation section */
#home #presentation {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

#home #presentation h2 {
  margin: 0 0 25px 0;
}

#home #presentation p {
  margin: 5px 0;
}

#home #presentation button {
  margin: 30px 0 15px 0;
}

#home #presentation small {
  text-align: center;
}

@media screen and (max-width: 600px) {
  #home #presentation {
    padding: 20px;
  }
}

</style>