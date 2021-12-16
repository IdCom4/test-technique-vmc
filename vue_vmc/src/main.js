import Vue from 'vue'
import VueRouter from 'vue-router'

// main frame
import App from './App.vue'

// pages
import Home from './pages/home.vue'
import Vehicles from './pages/vehicles.vue'
import VehicleDetails from './pages/vehicle-details.vue'


// set global css
import "./assets/css/global.css"


Vue.config.productionTip = false

Vue.use(VueRouter);

// set routes
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/vehicles', component: Vehicles },
    { path: '/vehicle-details/:id', component: VehicleDetails }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
