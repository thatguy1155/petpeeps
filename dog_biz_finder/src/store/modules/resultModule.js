import Vue from "vue";
import Vuex from "vuex";
import { cors_getDongList } from "../ep";
import axios from "axios";

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        bizList: [],
        dongList: [],
        searchedAddr: ["서울특별시"],
        selectedBiz: null,
        mapCenter: { lat: 37.5326, lng: 127.024612 },
    },
    mutations: {
        CHANGE_BIZ_LIST(state, payload) {
            state.bizList = payload;
        },
        CHANGE_DONG_LIST(state, payload) {
            state.dongList = payload;
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
        dongs: (state) => state.dongList,
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
            let cleanList = [{
                    bizName: "Woof Cafe",
                    bizType: "Cafe",
                    hours: "11:00 ~ 19:00",
                    address: "서울특별시 중구 을지로7가 2-1",
                },
                {
                    bizName: "Safari",
                    bizType: "Restaurant",
                    hours: "7:00 ~ 00:00",
                    address: "서울특별시 중구 을지로6가 18-17",
                },
                {
                    bizName: "The Jungle",
                    bizType: "Restaurant",
                    hours: "11:00 ~ 19:00",
                    address: "서울특별시 중구 광휘동 58-1",
                },
                {
                    bizName: "Animals",
                    bizType: "Cafe",
                    hours: "11:00 ~ 19:00",
                    address: "서울특별시 중구 저동2가 수표로 46 2층",
                },
                {
                    bizName: "Sanctuary",
                    bizType: "Restaurant",
                    hours: "7:00 ~ 00:00",
                    address: "서울특별시 중구 명동2가 명동10길 16-1",
                },
                {
                    bizName: "Habitat",
                    bizType: "Restaurant",
                    hours: "7:00 ~ 00:00",
                    address: "서울특별시 중구 장충동 동호로 249",
                },
                {
                    bizName: "Archipelago",
                    bizType: "Cafe",
                    hours: "11:00 ~ 19:00",
                    address: "서울특별시 동대문구 청량리동 207-42",
                },
                {
                    bizName: "Dogs & Friends",
                    bizType: "Cafe",
                    hours: "11:00 ~ 19:00",
                    address: "서울특별시 성북구 안암동5가 산2-1",
                },
                {
                    bizName: "People Reserve",
                    bizType: "Cafe",
                    hours: "11:00 ~ 19:00",
                    address: "서울특별시 동대문구 회기동 1-5",
                },
                {
                    bizName: "Tropicana",
                    bizType: "Cafe",
                    hours: "11:00 ~ 19:00",
                    address: "서울특별시 강남구 신사동 563-21",
                },
            ];
            let filteredList = [];
            let searchedAddrStr = state.searchedAddr.join(" ");

            filteredList = cleanList.filter((item) => {
                return item.address.includes(searchedAddrStr);
            });

            commit("CHANGE_BIZ_LIST", filteredList);

            //when there is a new biz list, also set the first item on the new list as the selected biz 
            commit("SET_SELECTED_BIZ", { business: filteredList[0] });
        }
    }
};