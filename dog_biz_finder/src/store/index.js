import Vue from 'vue'
import Vuex from 'vuex'
import { cors_getDongList } from './ep'
import authModule from './modules/authModule'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bizList: [],
    dongList: [],
    searchedAddr: [
      '서울',
    ]
  },
  mutations: {
    CHANGE_BIZ_LIST(state, payload) {
      console.log('this is coming from mutations', payload)
      state.bizList = payload
    },
    CHANGE_DONG_LIST(state, payload) {
      state.dongList = payload
    },
    CREATE_SEARCHED_ADDRESS(state, payload) {
      state.searchedAddr.push(payload)
      console.log('this is coming from mutations, new adrs ',state.searchedAddr)
      // let searchedAddrStr = state.searchedAddr.join(' ')
    }
  },
  getters: {
    dongs: state => state.dongList
  }, 
  actions: {
    /**
     * 
     * @param {obj } { commit } function to call mutation to add gu in searchedAddr in state
     * @param {str } val will containt a str of name of Gu selected 
     */
    addGu({ commit, state }, val) {
      state.searchedAddr.splice(1,3)
      commit('CREATE_SEARCHED_ADDRESS', val.searchedGu)
    },

    /**
     * 
     * @param {obj } { commit } function to call mutation to add dong in searchedAddr in state 
     * @param {str } val will containt a str of name of Dong selected 
     */
    addDong({ commit, state }, val) {
      state.searchedAddr.splice(2,3)
      commit('CREATE_SEARCHED_ADDRESS', val.searchedDong)
    },

    /**
     * 
     * @param { obj } { commit } function to call mutation to change state dongList
     * @param { str } val will containt a str of integers that will correspond with selected gu
     */
    getDongList({ commit }, val) {
      // make request with axios with given code
      axios.get(cors_getDongList, {
        params: {
          menuGubun: 'H',
          srhType: 'LOC',
          houseType: '1',
          srhYear: '2020',
          srhPeriod: '2',
          gubunCode: 'LAND',
          sidoCode: val.searchedGuCode.substring(0,2),
          gugunCode: val.searchedGuCode,
        }
        
      }).then(list => {
        console.log(list)
        commit('CHANGE_DONG_LIST', list.data.jsonList)
      }).catch(err => {
        console.log(err)
      })
    },
    getBizList({ commit, state }) {
      // console.log('this is coming from actions', val)
      console.log('make request with axios')
      console.log('get data and call mutations with cleaned up data')
      let cleanList = [
        {
          title: 'test',
          placeDescription: 'where all the nirvana fans hang',
          address: '서울 중구 을지로7가 2-1'
        }, 
        {
          title: 'another place',
          placeDescription: 'place where all the losers are',
          address: '서울 중구 을지로6가 18-17'
        },  
        {
          title: 'this is another place',
          placeDescription: 'place where all the cool kids hang',
          address: '서울 동대문구 청량리동 207-42'
        },
        {
          title: 'this is another place2',
          placeDescription: 'place where all drinking kids hang',
          address: '서울 성북구 안암동5가 산2-1'
        },
        {
          title: 'this is another place3',
          placeDescription: 'place where all less cool kids hang',
          address: '서울 동대문구 회기동 1-5'
        },
        {
          title: 'this is another place5',
          placeDescription: 'place where all cool kids eat',
          address: '서울 강남구 신사동 563-21'
        }
      ]
      let filteredList = [];
      let searchedAddrStr = state.searchedAddr.join(' ');

      // for (let i=0, c=cleanList.length; i<c; i++) {
      //   console.log(cleanList[i])
      //   if (cleanList[i].address.includes(searchedAddrStr)) {
      //     filteredList.push(cleanList[i]);
      //   }
      // }

      filteredList = cleanList.filter(item => {
        return item.address.includes(searchedAddrStr)
      })

      commit('CHANGE_BIZ_LIST', filteredList)
      // Axios.get('blah', {
      //   params: {
      //     key: val
      //   }
      // }).then(data => {
      //   console.log(data)
      // commit('changeBizList', data)

      // }).catch(err => console.log(err))
    }
  },
  modules: {
    authModule
  }
})
