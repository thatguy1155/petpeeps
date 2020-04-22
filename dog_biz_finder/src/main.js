import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBDlux-TzG5b5g25-isLrSQWIA6HX-mjU8",
    libraries: "places", // necessary for places input
  }
});

Vue.config.productionTip = false

// new Vue({
//   store,
//   vuetify,
//   router,
//   render: h => h(App)
// }).$mount('#app')
let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App),
      template: '<App/>',
      components: { App }
    }).$mount('#app')
  }
});