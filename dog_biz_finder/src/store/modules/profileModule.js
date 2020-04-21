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
    // Get current user objet from firbase 
    getCurrentUser({ commit }) {
      let currUser = firebase.auth().currentUser
      commit('LOAD_USER', {
        name: currUser.displayName,
        email: currUser.email,
        accountType: 'business'
      })     
    },
  },
  getters: {
    accountType: state => state.user.accountType
  }
};
