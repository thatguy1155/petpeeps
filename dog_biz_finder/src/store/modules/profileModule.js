import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    user: {
      name: "",
      email: "",
      accountType: ""
    }
  },
  mutations: {
    loadUser(state, payload) {
      state.user = payload;
      console.log("loading user in mutations");
      console.log(state.user);
    }
  },
  actions: {
    getUser({ commit }) {
      let currentUser = {
        name: "Joe",
        email: "joe@gmail.com",
        accountType: "personal"
      };
      commit("loadUser", currentUser);
    }
  },
  getters: {}
};
