import Vue from "vue";
import Vuex from "vuex";
import { cors_getDongList, cors_getGuList } from "../ep";
import axios from "axios";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    bizList: [],
    guList: [],
    dongList: [],
    searchedAddr: [],
    selectedBiz: null, 
    mapCenter: { lat: 37.5326, lng: 127.024612 },
    siCategory: '',
    guCategory: '',
  },
  mutations: {
    CHANGE_BIZ_LIST(state, payload) {
      state.bizList = payload;
    },
    CHANGE_GU_LIST(state, payload) {
      state.guList = payload;
    },
    CHANGE_DONG_LIST(state, payload) {
      state.dongList = payload;
    },
    //made a gu catergory in the state so the gu that is geolocated on googlemaps component
    //can be sent to the search bar component
    CHANGE_GU_CATEGORY(state, payload) {
      state.guCategory = payload;
    },
    CHANGE_SI_CATEGORY(state, payload) {
      state.siCategory = payload;
    },
    CREATE_SEARCHED_ADDRESS(state, payload) {
      state.searchedAddr.push(payload);
    },
    SET_SELECTED_BIZ(state, payload) {
      state.selectedBiz = payload;
    },
    SET_MAP_CENTER(state, payload) {
      state.mapCenter = payload;
    },
  },
  getters: {
    gus: (state) => state.guList,
    dongs: (state) => state.dongList,
    bizSocialMedia: (state) => state.selectedBiz.business.socialMediaArr,
    bizType: (state) => state.selectedBiz.business.bizType,
    menu: (state) => state.selectedBiz.business.menu
  },
  actions: {
    /**
     * 
     * @param {obj} { commit } function to call mutation to set new selected biz in state 
     * @param {obj} selectedBizParams is an object that contains the info about the new selected business 
     */
    setSelectedBiz({ commit }, selectedBizParams) {
      commit("SET_SELECTED_BIZ", selectedBizParams);
    },
    /**
     * 
     * @param {obj} { commit } function to call mutation to set new map center coordinates in state 
     * @param {obj} mapCentercoords is an object that contains the lat/lng coordinates of the new map center position
     */
    setMapCenter({ commit }, mapCentercoords) {
      commit("SET_MAP_CENTER", mapCentercoords);
    },

    addSi({ commit, state }, val) {
      state.searchedAddr.splice(0, 3);
      commit("CREATE_SEARCHED_ADDRESS", val.searchedSi);
    },

    /**
     *
     * @param {obj } { commit } function to call mutation to add gu in searchedAddr in state
     * @param {obj } { state } to get access to the state.searchAdd to slice the array from
     *                         Gu before next search requests
     * @param {str } val will containt a str of name of Gu selected
     */
    addGu({ commit, state }, val) {
      state.searchedAddr.splice(1, 3);
      commit("CREATE_SEARCHED_ADDRESS", val.searchedGu);
    },

    /**
     *
     * @param {obj } { commit } function to call mutation to add dong in searchedAddr in state
     * @param {obj } { state } to get access to the state.searchAdd to slice the array from
     *                         Dong before next search requests
     * @param {str } val will containt a str of name of Dong selected
     */
    addDong({ commit, state }, val) {
      state.searchedAddr.splice(2, 3);
      commit("CREATE_SEARCHED_ADDRESS", val.searchedDong);
    },

    getGuList({ commit }, val) {
      axios
      .get(cors_getGuList, {
        params: {
          menuGubun: "E",
          srhType: "",
          gubunCode: "LAND",
          sidoCode: val.searchedSiCode
        },
      })
      .then((list) => {
        commit("CHANGE_GU_LIST", list.data.jsonList);
      })
      .catch((err) => {
        console.log(err);
      });
    },

    /**
     *
     * @param { obj } { commit } function to call mutation to change state dongList
     * @param { str } val will containt a str of integers that will correspond with selected gu
     */
    getDongList({ commit }, val) {
      // make request with axios with given code
      axios
        .get(cors_getDongList, {
          params: {
            menuGubun: "H",
            srhType: "LOC",
            houseType: "1",
            srhYear: "2020",
            srhPeriod: "2",
            gubunCode: "LAND",
            sidoCode: val.searchedGuCode.substring(0, 2),
            gugunCode: val.searchedGuCode,
          },
        })
        .then((list) => {
          commit("CHANGE_DONG_LIST", list.data.jsonList);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     *
     * @param {obj } { commit } function to call mutation to change state bizList
     * @param {obj } { state } to get access to the state.searchAdd to compare with
     *                         the pre-existing array of addresses for match
     */
    getBizList({ commit, state }) {
    // getBizList({ state }) {
      const params = new URLSearchParams();
      params.append('action', 'getSearchResults');
      params.append('si', state.searchedAddr[0]);
      params.append('gu', state.searchedAddr[1]);
      params.append('dong', state.searchedAddr[2]);
      params.append('danji', state.searchedAddr[3]);
      axios.post('http://dogpeeps', params) 
          .then(res => {
              let filteredList = [];
              for (let i=0, bizObj; i<res.data.length; i++) {
                // console.log(res.data[i]);
                bizObj = {
                  bizName: res.data[i]['name'],
                  bizType: res.data[i]['type'],
                  bizHrs: res.data[i]['biz_hrs'],
                  bizAddr: res.data[i]['city']+' '+res.data[i]['gu']+' '+res.data[i]['dong']+' '+res.data[i]['danji'],
                  bizTel: res.data[i]['tel'],
                  bizSite: res.data[i]['website'],
                  socialMediaArr: res.data[i]['socialMediaArr'],
                  menu: res.data[i]['menu'],
                }
                // console.log(bizObj);
                filteredList.push(bizObj);
              }
              console.log(filteredList);
              state.bizList.splice(0, 3);
              commit("CHANGE_BIZ_LIST", filteredList);
              commit("SET_SELECTED_BIZ", { business: filteredList[0] });
          })
          .catch(err => console.log(err))

      // let filteredList = [];
      // let searchedAddrStr = state.searchedAddr.join(" ");

      // filteredList = cleanList.filter((item) => {
      //   return item.bizAddr.includes(searchedAddrStr);
      // });

      // commit("CHANGE_BIZ_LIST", filteredList);
      
      //when there is a new biz list, also set the first item on the new list as the selected biz 
      // commit("SET_SELECTED_BIZ", { business: filteredList[0] });
    },
    /**
     *
     * @param { obj } { commit } function to call mutation to change state guCategory
     * @param { str } currentGu gu that we extrapolate from your geolocated address in the map component
     */
    changeSelectedGu({commit},currentGu){
      commit("CHANGE_GU_CATEGORY", currentGu);
    },
    changeSelectedSi({commit},currentSi){
      commit("CHANGE_SI_CATEGORY", currentSi);
    }
    
  }
};
