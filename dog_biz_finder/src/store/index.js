import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './authModule'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bizList: [
      {
        title: 'test',
        subtitle: 'subtitle test',
        placeName: 'cool place',
        placeDescription: 'place where all the cool kids hang'
      }, {
        title: 'another place',
        subtitle: 'another test',
        placeName: 'cooler place',
        placeDescription: 'place where all the losers are'
      }, 
      {
        title: 'this is another place',
        subtitle: 'another subtitle',
        placeName: 'name of place',
        placeDescription: 'where all the nirvana fans hang'
      }
    ]
  },
  mutations: {
    changeBizList(state, payload) {
      console.log('this is coming from mutations', payload)
      state.bizList = payload
    }
  },
  actions: {
    getBizList({ commit}, val) {
      console.log('this is coming from actions', val)
      console.log('make request with axios')
      console.log('get data and call mutations with cleaned up data')
      let cleanList = [
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        }, 
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        },
        {
          title: 'test',
          subtitle: 'subtitle test',
          placeName: 'cool place',
          placeDescription: 'place where all the cool kids hang'
        }
      ]
      commit('changeBizList', cleanList)
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
