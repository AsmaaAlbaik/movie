import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/shared.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    // initialize firebase
    firebase.initializeApp({
      apiKey: "AIzaSyD9BCTm5h_9YHjYuf_W53JkqDZUWk-EaWY",
      authDomain: "movies-app-b71ef.firebaseapp.com",
      databaseURL: "https://movies-app-b71ef.firebaseio.com",
      projectId: "movies-app-b71ef",
      storageBucket: "movies-app-b71ef.appspot.com",
      messagingSenderId: "711332877858",
      appId: "1:711332877858:web:6f0ce0042d70708b9e9c7b",
      measurementId: "G-JV28HTZR3P"
    });
    // fetch the data by sending http request using firebase SDK
    this.$store.dispatch('fetchMovieList');
  },
  render: h => h(App)
}).$mount('#app')
