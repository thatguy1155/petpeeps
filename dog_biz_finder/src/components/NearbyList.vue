<template>
  <v-row id="bizList">
    <biz-card-item
      v-for="(i, index) in this.bizList"
      :key="index"
      :title="i.title"
      :placeDescription="i.placeDescription"
      :address="i.address"
    />
  </v-row>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import BizCardItem from "./componentsWithProps/BizCardItem";
export default {
  components: {
    BizCardItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("resultModule", {
      bizList: (state) => state.bizList,
    }),

    ...mapGetters({
      username: "authModule/user",
    }),
  },
  created() {
    this.bizList;
  },
  mounted() {},
};
</script>

<style>
  #bizList {
    z-index: 1;
    margin-top: -342px;
  }
</style>
