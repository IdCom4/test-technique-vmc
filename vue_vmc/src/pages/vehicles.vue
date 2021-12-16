<template>
  <section id="vehicles">
  
    <div id="search">
      <select v-model="selectedProperty">
        <option v-for="(prop, index) in carProperties" :key="index" :val="prop">{{ prop }}</option>
      </select>
      <input v-if="selectedProperty == 'Marque' || selectedProperty == 'Modèle'" type="text" v-model="searchVal">
      <input v-if="selectedProperty == 'Prix à la journée'" type="number" min="0" v-model="searchVal">
      <select v-if="selectedProperty == 'État'"  v-model="searchVal">
        <option v-for="(state, index) in possibleStates" :key="index" :val="state">{{ state }}</option>
      </select>
    </div>

    <div id="list">
      <small-card v-for="(car, index) in searchedCars" :key="index" :car="car" />
    </div>
    <p v-if="searchedCars.length == 0" class="no-result">Aucun véhicule ne correspond à votre recherche.</p>
  </section>
</template>

<script>
import SmallCard from '../components/smallCard.vue'
import JsonData from '../assets/data/vehicles.json'

export default {
  name: 'Vehicle',
  components: {
    SmallCard
  },
  data: () => {
    return {
      cars: JsonData,
      carProperties: [
        'Marque',
        'Modèle',
        'État',
        'Prix à la journée',
      ],
      possibleStates: [
        'Comme neuf',
        'Propre',
        'Légèrement rayé',
        'Abîmé',
        'Éxiste'
      ],
      searchVal: null,
      selectedProperty: null,
      searchedCars: []
    }
  },
  watch: {
    selectedProperty() {
      this.searchVal = null
    },
    searchVal() {
      if (this.searchVal && this.searchVal != '')
        this.search()
      else
        this.searchedCars = this.cars
    }
  },
  created() {
    this.selectedProperty = this.carProperties[0]
    this.searchedCars = this.cars
  },
  methods: {
    search() {
      this.searchedCars = []

      const normalizedSearchValue = this.searchVal.toUpperCase().trim()

      if (this.selectedProperty == 'Marque')
        this.searchedCars = this.cars.filter((car) => car.brand.toUpperCase().includes(normalizedSearchValue))
      
      if (this.selectedProperty == 'Modèle')
        this.searchedCars = this.cars.filter((car) => car.model.toUpperCase().includes(normalizedSearchValue))
      
      if (this.selectedProperty == 'État')
        this.searchedCars = this.cars.filter((car) => car.state.toUpperCase() == normalizedSearchValue)

      if (this.selectedProperty == 'Prix à la journée') {
        const intPrice = Number(this.searchVal)
        this.searchedCars = this.cars.filter((car) => car.dayPrice <= intPrice)
      }
    }
  }
}
</script>

<style>
#vehicles #search {
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
}

#vehicles #search input, #vehicles #search select {
  width: 200px;
  border-radius: 5px;
  border: solid grey 1px;
  padding: 5px;
  margin: 0 10px;
  outline: 0;
}

#vehicles #search select {
  width: 212px;
}

#vehicles #list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 25px;
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
  padding: 50px 0;
}

#vehicles .no-result {
  text-align: center;
}

@media screen and (max-width: 600px) {
  #vehicles #search {
    flex-direction: column;
    align-items: center;
    padding-top: 25px;
  }

  #vehicles #list {
    padding-top: 25px;
  }
}
</style>
