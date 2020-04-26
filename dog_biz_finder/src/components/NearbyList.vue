<template>
  <div v-if="bizList.length > 0">
    <div id="bizList">
      <bizlist-arrow-button
        arrowType="left"
        @click.native="showPrevItem"
        :disabled="this.reachedMaxLeft"
      />
      <biz-card-item
        class="current-item"
        :bizName="currentItem.bizName"
        :bizType="currentItem.bizType"
        :hours="currentItem.hours"
        :address="currentItem.address"
      />
      <bizlist-arrow-button
        arrowType="right"
        @click.native="showNextItem"
        :disabled="this.reachedMaxRight"
      />
    </div>
    <bizlist-indicators
      :items="this.bizList"
      :currentItemIndex="this.currentItemIndex"
      :showItem="this.showItem"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import BizCardItem from "./componentsWithProps/BizCardItem";
import BizlistArrowButton from "./componentsWithProps/BizlistArrowButton";
import BizlistIndicators from "./componentsWithProps/BizlistIndicators";

export default {
  components: {
    BizCardItem,
    BizlistArrowButton,
    BizlistIndicators,
  },
  data() {
    return {
      currentItemIndex: 0,
    };
  },
  computed: {
    ...mapState("resultModule", {
      bizList: (state) => state.bizList,
    }),
    currentItem() {
        return this.bizList[this.currentItemIndex];
    },
    reachedMaxLeft() {
      return this.currentItemIndex === 0;
    },
    reachedMaxRight() {
      return this.currentItemIndex === this.bizList.length - 1;
    },
  },
  methods: {
    showNextItem() {
      this.currentItemIndex++;
    },
    showPrevItem() {
      this.currentItemIndex--;
    },
    showItem(itemIndex) {
      this.currentItemIndex = itemIndex;
    },
  },
};
</script>

<style>
#bizList {
  z-index: 1;
  margin-top: -285px;
}
</style>
