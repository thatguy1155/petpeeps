<template>
  <v-row>
    <biz-card-item
      v-for='(i, index) in this.bizList'
      :key='index'
      :title='i.title'
      :placeDescription='i.placeDescription'
      :address='i.address'
    />
    <!-- <v-col 
      v-for='(i, index) in this.bizList'
      :key='index'
      cols="12" xs="12" sm="12" md="12" xl="12" no-gutter style="border: 1px solid black;"
    >
      <v-card>
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{ i.title }}</v-card-title>
        </v-img>
        <v-card-subtitle class="pb-0">{{ i.subtitle }}</v-card-subtitle>
        <v-card-text class="text--primary">
          <div>{{ i.placeName }}</div>
          <div>{{ i.placeDescription }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="orange"
            text
          >
            Share
          </v-btn>

          <v-btn
            color="orange"
            text
          >
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col> -->
  </v-row>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import BizCardItem from './componentsWithProps/BizCardItem'
export default {
  components: {
    BizCardItem
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'bizList'
    ]),
    ...mapGetters({
      username: 'authModule/user'
    })
  },
  created(){
    this.bizList
  },
  mounted() {
    console.log(this.bizList, this.username)
  },
}
</script>

<style>
</style>