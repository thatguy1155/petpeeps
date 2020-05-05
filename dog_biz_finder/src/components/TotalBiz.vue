<template>
  <!-- ADD A (BUSINESS) MODAL/PROFILE START-->

  <v-container>
    <h1>business</h1>
    <v-row justify="center">
      <v-col cols="12" lg="9" m="12" sm="12" xs="6" class="d-flex flex-wrap">
        <!-- <v-card class="mx-10 my-6" v-for="biz in bizList" v-bind:key="biz.id" max-width="434"> -->
        <v-card class="mx-10 my-6" max-width="434">
          <profile-biz />
          <!-- <profile-biz v-bind:bizInfo="biz" /> -->
        </v-card>
        <div>
          <v-flex xs2>
            <add-biz id="bizButton" />
          </v-flex>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <!-- ADD A (BUSINESS) MODAL/PROFILE END-->
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import AddBiz from "@/components/AddBiz";
import ProfileBiz from "@/components/ProfileBiz";

export default {
  components: {
    AddBiz,
    ProfileBiz
  },
  // methods: {
  //   ...mapActions({
  //     fetchBiz: "bizModule/getBiz"
  //   })
  // },
  // computed: {
  //   ...mapGetters({
  //     bizList: "bizModule/bizList"
  //   }),
  // },
  // created() {
  //   this.fetchBiz();
  // }
};
</script>
<style>
/* .grid1x1 {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
}
.grid1x1 > div {
  display: flex;
  flex-basis: calc(52% - 124px);
  justify-content: center;
  flex-direction: column;
} */
#bizButton {
  height: 165px;
  width: 371px;
  min-width: 77px;
  font-size: 33px;
  border-radius: 0px;
}
</style>