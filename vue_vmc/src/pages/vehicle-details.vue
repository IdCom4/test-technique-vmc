<template>
  <section id="vehicle-details">
    <div id="car-img" :style="`background-image: url(${img})`"></div>
    <div id="content">
      <car-infos :car="car" />
      <button
        id="book-car"
        class="hover-bg"
        :class="{ booked: bookingDone }"
        @click="bookCar()"
      >
        {{ bookingDone ? 'Réservée !' : 'Réserver' }}
      </button>
    </div>
  </section>
</template>

<script>
import JsonData from '../assets/data/vehicles.json'
import CarInfos from '@/components/car-infos.vue'

export default {
  name: 'VehicleDetails',
  components: {
    CarInfos
  },
  data: () => {
    return  {
      car: null,
      img: null,

      bookingDone: false,

      // mockup
      vehiclesDb: JsonData
    }
  },
  created() {

    const carId = this.$route.params.id

    this.getVehicleFromId(carId)

    this.img = require(`@/assets/images/cars/${this.car.image}`)

  },
  methods: {
    getVehicleFromId(id) {
      for (let i = 0; i < this.vehiclesDb.length; i++) {

        if (this.vehiclesDb[i].id == id) {
          this.car = this.vehiclesDb[i]
          return
        }
          
      }
    },

    bookCar() {
      if (this.bookingDone) return

      this.bookingDone = true
      setTimeout(() => {
        this.bookingDone = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
#vehicle-details {
  display: flex;
}

#vehicle-details #car-img {
  width: 75%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  
}

#vehicle-details #content {
  width: calc(25% - 20px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#vehicle-details #content #book-car {
  width: 100%;
}

#vehicle-details #content #book-car.booked {
  background-color: green;
}

@media screen and (max-width: 800px) {
  #vehicle-details {
    flex-direction: column;
  }

  #vehicle-details #car-img {
    width: 100vw;
    max-width: 100%;
    height: 60vw;
  }

  #vehicle-details #content {
    width: calc(100% - 20px);
  }

  #vehicle-details #content #book-car {
    margin: 25px 0 15px 0;
  }

}
</style>