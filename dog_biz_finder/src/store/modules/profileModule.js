import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase';
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    user: {
      name: "",
      email: "",
      accountType: "",
    }
  },
  mutations: {
    LOAD_USER(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    getCurrentUser({ commit }) {
      let currUser = firebase.auth().currentUser
      console.log(currUser)
      commit('LOAD_USER', {
        name: 'schmoejoe',
        email: currUser.email,
        accountType: 'personal'
      })     
    },
  },
  getters: {
    accountType: state => state.accountType
  }
};
