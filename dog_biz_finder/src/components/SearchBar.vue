<template>
  <div>
    <v-row class="searchBarItem mx-5">
      <v-col 
        cols="12" xs="12" sm="12 " md="3" lg="3" xl="3" no-gutter
        class="my-sm-0 my-md-2 pt-sm-2 pt-md-0 pb-sm-0 pb-sm-0"
      >
        <v-select
          v-model="siCategory"
          :items="siList"
          label="Search by City"
          @change="guListPopulate"
          item-text='NAME'
        />
      </v-col>

      <v-col 
        cols="12" xs="12" sm="12 " md="3" lg="3" xl="3" no-gutter
        class="my-sm-0 my-md-2 pt-sm-2 pt-md-0 pb-sm-0 pb-sm-0"
      >
        <v-select
          v-model="guCategory"
          :items="guList"
          label="Search by Gu"
          @change="dongListPopulate"
          item-text='NAME'
        />
      </v-col>

      <v-col 
        cols="12" xs="12" sm="12" md="3" lg="3" xl="3" no-gutter
        class="my-sm-0 my-md-2 py-sm-0 py-md-0"
      >
        <v-select
          v-model="dongCategory"
          :items="dongList"
          label="Search by Dong"
          @change="addDongtoSearchAdd"
          item-text='NAME'
        />
      </v-col>

      <v-col 
        cols="12" xs="12" sm="12" md="4" lg="3" xl="4" no-gutter
        class="searchBarTextInput my-sm-0 my-md-2 py-sm-0 py-md-0"
      >
        <v-text-field 
          v-model='searchedAddr' 
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      searchedAddr: '',
      siCategory: '',
      guCategory: '',
      dongCategory: '',
      siList: [{"NAME":"서울특별시","CODE":"11"}],
      // guList: [{"NAME":"강남구","CODE":"11680"},{"NAME":"강동구","CODE":"11740"},{"NAME":"강북구","CODE":"11305"},{"NAME":"강서구","CODE":"11500"},{"NAME":"관악구","CODE":"11620"},{"NAME":"광진구","CODE":"11215"},{"NAME":"구로구","CODE":"11530"},{"NAME":"금천구","CODE":"11545"},{"NAME":"노원구","CODE":"11350"},{"NAME":"도봉구","CODE":"11320"},{"NAME":"동대문구","CODE":"11230"},{"NAME":"동작구","CODE":"11590"},{"NAME":"마포구","CODE":"11440"},{"NAME":"서대문구","CODE":"11410"},{"NAME":"서초구","CODE":"11650"},{"NAME":"성동구","CODE":"11200"},{"NAME":"성북구","CODE":"11290"},{"NAME":"송파구","CODE":"11710"},{"NAME":"양천구","CODE":"11470"},{"NAME":"영등포구","CODE":"11560"},{"NAME":"용산구","CODE":"11170"},{"NAME":"은평구","CODE":"11380"},{"NAME":"종로구","CODE":"11110"},{"NAME":"중구","CODE":"11140"},{"NAME":"중랑구","CODE":"11260"}],
      siCode: '',
      guCode: ''
    }
  },
  watch: {
    stateSiCategory: function() {
      this.siCategory = this.stateSiCategory
      this.guListPopulate()
    },
    /**
     * when the reverse geocoder in the maps component returns its promise, and it changes the guCategory in the state
     * then make the searchbar gu category equivalent and run the donglist populate function that you'd run
     * if an entry was selected on the gu menu
     */
    stateGuCategory: function() {
      this.guCategory = this.stateGuCategory
      this.dongListPopulate()
    },
  },
  computed: {
    ...mapGetters({
      'guList': 'resultModule/gus',
      'dongList': 'resultModule/dongs'
    }),
    ...mapState("resultModule", {
      stateSiCategory: (state) => state.siCategory,
      stateGuCategory: (state) => state.guCategory
    }),
  },
  methods: {
    ...mapActions({
      'getBizList': 'resultModule/getBizList',
      'getGuList': 'resultModule/getGuList',
      'getDongList': 'resultModule/getDongList',
      'addSi': 'resultModule/addSi',
      'addGu': 'resultModule/addGu',
      'addDong': 'resultModule/addDong'
    }),
    guListPopulate() {
      this.siList.forEach(i => {
        if(i.NAME == this.siCategory) this.siCode = i.CODE
        return
      })
      this.getGuList({ searchedSiCode: this.siCode })
      this.addSi({ searchedSi: this.siCategory })
      // this.getBizList()
    },
    dongListPopulate() {
      this.guList.forEach(i => {
        if(i.NAME == this.guCategory) this.guCode = i.CODE
        return
      })
      this.getDongList({ searchedGuCode: this.guCode })
      this.addGu({ searchedGu: this.guCategory })
      this.getBizList()
    },
    addDongtoSearchAdd() {
      this.addDong({ searchedDong: this.dongCategory })
      this.getBizList()
    }
  },
}
</script>

<style scoped>
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .searchBarItem .col-12 {
    padding: 0px;
    margin: 0px;    
    height: 52px;
  }

  .searchBarTextInput {
    margin-top: -7px;
  }
}
</style>