<template>
  <div>
    <v-card class="mx-auto" width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{ bizInfo.bizType }}</div>
          <v-list-item-title class="headline mb-1">{{
            bizInfo.bizName
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ bizInfo.bizAddr }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80">
          <v-img></v-img>
          <!-- Add biz pic here -->
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-dialog v-model="moreBizInfoDialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="brown lighten-3" dark v-on="on" @click="setSelectedBizForMoreInfo">
              more info
            </v-btn>
          </template>
          <main-biz-card @hide-main-card="hideMainCard"/>
        </v-dialog>
        <!-- <EditBiz v-bind:bizInfo="bizInfo" /> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import EditBiz from "@/components/EditBiz.vue";
import MainBizCard from "@/components/MainBizCard.vue";

export default {
  name: "ProfileBiz",
  props: {
    bizKey: {
      type: Number,
    },
    bizInfo: {
      type: Object,
      default() {
        return [
          {
            bizName: "Business name",
            bizType: "Business type",
            bizHrs: "Business hours",
            bizAddr: "Business address",
            bizTel: "Business number",
            bizSite: "Buiness site",
            socialMediaArr: {
              instagram: "www.instagram.com",
              naver: "www.blog.naver.com",
            },
            menu: [
              { item: "pasta", price: "9000", calories: "900" },
              { item: "pizza", price: "22000", calories: "1500" },
            ],
          },
        ];
      },
    },
  },
  data: () => {
    return {
      showMainCard: false,
      moreBizInfoDialog: false
    };
  },
  components: {
    // EditBiz,
    MainBizCard,
  },
  methods: {
    ...mapActions({
      setSelectedBiz: "resultModule/setSelectedBiz",
    }),
    setSelectedBizForMoreInfo() {
      this.setSelectedBiz({
        business: this.bizInfo
      });
      console.log('this.bizInfo', this.bizInfo);
    },
    hideMainCard() {
      this.moreBizInfoDialog = false;
    }
  }
};
</script>

<style>
#bizFont {
  color: black;
  font-size: 41px !important;
  display: inline-block;
}

#addressFont {
  color: black;
  font-size: 15px !important;
  display: inline-block;
}

#profilePic {
  float: left;
}
</style>
