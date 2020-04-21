import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'


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
