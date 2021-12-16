<template>
  <div class="smallCard">
    <div class="img-wrapper" :style="`background-image: url(${img})`"></div>
    <div class="info">
      <h5>{{ carTitle }}</h5>
      <p>{{ car.year }}</p>
    </div>
    <router-link :to="`/vehicle-details/${car.id}`" >
      <button class="hover-bg">Voir</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SmallCard',
  props: ['car'],
  computed: {
    carTitle() {
      return `${this.car.brand} | ${this.car.model}`
    },
    img() {
      return require(`@/assets/images/cars/${this.car.image}`)
    }
  }
}
</script>

<style scoped>
.smallCard {
  border-radius: 5px;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.75);
  width: 250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

}

.smallCard .img-wrapper {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

}

.smallCard .info {
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.smallCard .info h5 {
  margin-top: 0;
}

.smallCard button {
  padding: 5px 15px;
  margin: 0 10px 10px 10px;
}
</style>
