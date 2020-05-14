import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



export default {
  namespaced: true,
  state: {
    username: 'lajdf;lajf;ja;djaj',
    email: 'alkjdfl;aj;fajs',
    loginStatus: true
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    user: state => state.username,
    isLoggedIn: state => state.loginStatus
  }
}