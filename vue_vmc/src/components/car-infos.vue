<template>
  <div id="car-infos">
      <h4>{{ `${car.brand} | ${car.model}` }}</h4>
      <h5>Prix à la journée: {{ car.dayPrice  }}€</h5>
      <table>
        <tbody>
          <tr>
            <td>Année:</td>
            <td>{{ car.year }}</td>
          </tr>
          <tr>
            <td>Kilométrage:</td>
            <td>{{ car.kilometers }}km</td>
          </tr>
          <tr>
            <td>État:</td>
            <td>{{ car.state }}</td>
          </tr>
        </tbody>
      </table>
      <p>Description:</p>
      <p>{{ car.description }}</p>
    </div>
</template>

<script>
export default {
  name: 'CarInfos',
  props: ['car']
}
</script>

<style scoped>
#car-infos table {
  width: 100%;
  margin: 50px 0 25px 0;
}

#car-infos p + p {
  margin: 10px;
}
</style>