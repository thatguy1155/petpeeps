import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/authModule'
import resultModule from './modules/resultModule'
import profileModule from './modules/profileModule'
import petModule from './modules/petModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {}, 
  actions: {},
  modules: {
    authModule,
    resultModule,
    profileModule,
    petModule
  }
})
