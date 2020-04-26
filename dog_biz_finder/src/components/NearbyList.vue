<template>
  <v-row id="bizList">
    <biz-card-item
      v-for="(biz, index) in bizList"
      :key="index"
      :bizName="biz.bizName"
      :bizType="biz.bizType"
      :hours="biz.hours"
      :address="biz.address"
    />
  </v-row>
</template>
<script>
import { mapState } from "vuex";
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
    })
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
    margin-top: -285px;
  }
</style>
